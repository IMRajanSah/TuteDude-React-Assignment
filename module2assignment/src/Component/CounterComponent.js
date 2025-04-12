import React from 'react'
import CounterClass from './CounterClass'
import CounterFunction from './CounterFunction'

const CounterComponent = () => {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
        <CounterClass/>
        <CounterFunction/>
    </div>
  )
}

export default CounterComponent