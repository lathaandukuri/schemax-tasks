import { useState, useEffect } from 'react';
import axios from 'axios'

export const List = () => {
    const [list, setList] = useState([]);

    //     React events are written in camelCase syntax
    // onClick instead of onclick
    // React event handlers are written inside curly braces:
    // onClick={shoot}  instead of onClick="shoot()".

    // <button onClick={shoot}>Take the Shot!</button>
    // <button onclick="shoot()">Take the Shot!</button>

    // Keys Must Only Be Unique Among Siblings

    // Keys used within arrays should be unique among their siblings. However they don’t need to be globally unique. We can use the same keys when we produce two different arrays

    useEffect(() => {
        axios.get('list.json').then(res => {
            setList(res.data)
        })
    }, [])
    const RendereListItem=(props)=>{
        return <li>{props.listItems.key}</li>
    }

    return (
        <div>
            <ul>
                {list.map(listItems => {
                    return <RendereListItem key={Math.random()} listItems={listItems}/>
                })}
            </ul>

        </div>
    )
}