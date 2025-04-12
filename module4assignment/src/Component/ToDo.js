import React, { useState } from 'react'

const ToDo = () => {
    const [inputValue,setInputValue] = useState('')
    const [toDoTitles, setToDoTitles] = useState([]);
    const addToDoList=()=>{
        if(inputValue.trim()===""){
            alert("Invalid ToDo title (spaces not allowed)")
            setInputValue('')
        }else{
            setToDoTitles([...toDoTitles,inputValue])
            setInputValue('')
        }
    }
  return (
    <div>
        <h2>ToDo App</h2>
        <input type='text' value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>&nbsp;
        <button onClick={addToDoList}>Add</button>
        {toDoTitles.length>0?
        <ul>
            {toDoTitles.map((title,index)=>(
                <li key={index}>{title}</li>
            ))}
        </ul>
        :null}
    </div>
  )
}

export default ToDo