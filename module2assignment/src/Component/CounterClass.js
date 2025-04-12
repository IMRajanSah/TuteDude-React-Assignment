import React from 'react'

class CounterClass extends React.Component {
    state={
        count:0
    }
  render() {
    return(
    <div>
        <h2>Class Component</h2>
        <div>{this.state.count}</div>
        <button onClick={()=>this.setState({count:this.state.count-1})}>-</button>&nbsp;
        <button onClick={()=>this.setState({count:this.state.count+1})}>+</button>
    </div>
  )}
}

export default CounterClass