export const RenderWatchDisplay=(props)=>{
    return(
      <div id="display">
      <span>{("0" + ~~((props.time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + ~~((props.time / 1000) % 60)).slice(-2)}:</span>
      <span>{("0" + ((props.time / 10) % 100)).slice(-2)}</span>
    </div>
    )
  }