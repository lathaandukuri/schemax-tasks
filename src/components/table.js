import React from 'react';

const RenderTdSymbols=(element)=>{
    return (
        <React.Fragment>
            {element}
        </React.Fragment>
    );

}



export const RenderTableRow = (props) => {
    return (
        <tr>
            {Object.values(props.productData??{}).map((data)=>
                <td>{data}</td>
            )}
        </tr>
    )
}

export const Table = (props) => {


    const setDs=new Set([1,2,3,4]);
    
    const newArra=[];


    Array.from(setDs).forEach(ele=>{
        newArra.push(<li>{ele}</li>)
    })

    return (
        <>
        <table key={Date.now()} border="1px solid black">
            {
                Object.keys(props.productList[props.productList.length-1]??{})
                .map((val)=>
                    <th>{val}</th>
                )
            }
            
            {props.productList.map(productData => {
                return RenderTdSymbols(<RenderTableRow productData={productData} key={Date.now()}/>)
            })}

        </table>
        </>
    )
}
export default Table;