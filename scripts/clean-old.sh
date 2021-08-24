#!/usr/bin/env bash

# look for old 0.x cruft, and get rid of it.
# Should already be sitting in the npm folder.

# This doesn't have to be quite as cross-platform as install.sh.
# There are some bash-isms, because maintaining *two*
# fully-portable posix/bourne sh scripts is too much for
# one project with a sane maintainer.

# If readlink isn't available, then this is just too tricky.
# However, greadlink is fine, so Solaris can join the party, too.
readlink="readlink"
which $readlink >/dev/null 2>/dev/null
if [ $? -ne 0 ]; then
  readlink="greadlink"
  which $readlink >/dev/null 2>/dev/null
  if [ $? -ne 0 ]; then
    echo "Can't find the readlink or greadlink command. Aborting."
    exit 1
  fi
fi

if [ "x$npm_config_prefix" != "x" ]; then
  PREFIXES=$npm_config_prefix
else
  node="$NODE"
  if [ "x$node" = "x" ]; then
    node=`which node`
  fi
  if [ "x$node" = "x" ]; then
    echo "Can't find node to determine prefix. Aborting."
    exit 1
  fi


  PREFIX=`dirname $node`
  PREFIX=`dirname $PREFIX`
  echo "cleanup prefix=$PREFIX"
  PREFIXES=$PREFIX

  altprefix=`"$node" -e process.installPrefix`
  if [ "x$altprefix" != "x" ] && [ "x$altprefix" != "x$PREFIX" ]; then
    echo "altprefix=$altprefix"
    PREFIXES="$PREFIX $altprefix"
  fi
fi

# now prefix is where npm would be rooted by default
# go hunting.

packages=
for prefix in $PREFIXES; do
  packages="$packages
    "`ls "$prefix"/lib/node/.npm 2>/dev/null | grep -v .cache`
done

packages=`echo $packages`

filelist=()
fid=0

for prefix in $PREFIXES; do
  # remove any links into the .npm dir, or links to
  # version-named shims/symlinks.
  for folder in share/man bin lib/node; do
    find $prefix/$folder -type l | while read file; do
      target=`$readlink $file | grep '/\.npm/'`
      if [ "x$target" != "x" ]; then
        # found one!
        filelist[$fid]="$file"
        let 'fid++'
        # also remove any symlinks to this file.
        base=`basename "$file"`
        base=`echo "$base" | awk -F@ '{print $1}'`
        if [ "x$base" != "x" ]; then
          find "`dirname $file`" -type l -name "$base"'*' \
          | while read l; do
              target=`$readlink "$l" | grep "$base"`
              if [ "x$target" != "x" ]; then
                filelist[$fid]="$1"
                let 'fid++'
              fi
            done
        fi
      fi
    done

    # Scour for shim files.  These are relics of 0.2 npm installs.
    # note: grep -r is not portable.
    find $prefix/$folder -type f \
      | xargs grep -sl '// generated by npm' \
      | while read file; do
          filelist[$fid]="$file"
          let 'fid++'
        done
  done

  # now remove the package modules, and the .npm folder itself.
  if [ "x$packages" != "x" ]; then
    for pkg in $packages; do
      filelist[$fid]="$prefix/lib/node/$pkg"
      let 'fid++'
      for i in $prefix/lib/node/$pkg\@*; do
        filelist[$fid]="$i"
        let 'fid++'
      done
    done
  fi

  for folder in lib/node/.npm lib/npm share/npm; do
    if [ -d $prefix/$folder ]; then
      filelist[$fid]="$prefix/$folder"
      let 'fid++'
    fi
  done
done

# now actually clean, but only if there's anything TO clean
if [ "${#filelist[@]}" -gt 0 ]; then
  echo ""
  echo "This script will find and eliminate any shims, symbolic"
  echo "links, and other cruft that was installed by npm 0.x."
  echo ""

  if [ "x$packages" != "x" ]; then
    echo "The following packages appear to have been installed with"
    echo "an old version of npm, and will be removed forcibly:"
    for pkg in $packages; do
      echo "    $pkg"
    done
    echo "Make a note of these. You may want to install them"
    echo "with npm 1.0 when this process is completed."
    echo ""
  fi

  OK=
  if [ "x$1" = "x-y" ]; then
    OK="yes"
  fi

  while [ "$OK" != "y" ] && [ "$OK" != "yes" ] && [ "$OK" != "no" ]; do
    echo "Is this OK?"
    echo "  enter 'yes' or 'no'"
    echo "  or 'show' to see a list of files "
    read OK
    if [ "x$OK" = "xshow" ] || [ "x$OK" = "xs" ]; then
      for i in "${filelist[@]}"; do
        echo "$i"
      done
    fi
  done
  if [ "$OK" = "no" ]; then
    echo "Aborting"
    exit 1
  fi
  for i in "${filelist[@]}"; do
    rm -rf "$i"
  done
fi

echo ""
echo 'All clean!'

exit 0
