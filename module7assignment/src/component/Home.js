import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{padding:'0 7%',marginTop:'1rem'}}>
        <h4>Welcome to the Module 7 Assignment</h4>
        <p>Navigation Link</p>
        <div style={{display:'flex',justifyContent:'space-around',width:'20%'}}>
            <NavLink to='/'>Home</NavLink><br></br>
            <NavLink to='/form'>Form</NavLink><br></br>
            <NavLink to='/about'>About</NavLink>
        </div>
    </div>
  )
}

export default Home