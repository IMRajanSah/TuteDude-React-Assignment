import React, { useState } from 'react'

const CounterFunction = () => {
    const [count,setCount]=useState(0)
  return (
    <div>
        <h2>Functional Component</h2>
        <div>{count}</div>
        <button onClick={()=>setCount(count-1)}>-</button>&nbsp;
        <button onClick={()=>setCount(count+1)}>+</button>
    </div>
  )
}

export default CounterFunction