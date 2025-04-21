import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

const EditStudent = () => {
    const userID=useParams()    
    const [fullName,setFullName]=useState('')
    const [email,setEmail]=useState('')
    const [course,setCourse]=useState('')
    const navigate = useNavigate()
    const [error,setError]=useState(false)
      const handleSubmit = (e)=>{
        e.preventDefault()
        Axios.put(`https://68067059e81df7060eb726fd.mockapi.io/student/${userID.id}`,{fullname:fullName,email:email,course:course}).then((response)=>navigate('/')).catch((error)=>console.log(error))        
      }
    useEffect(()=>{
        Axios.get(`https://68067059e81df7060eb726fd.mockapi.io/student/${userID.id}`)
      .then((response) => {
        setFullName(response.data.fullname)
        setEmail(response.data.email)
        setCourse(response.data.course)
      })
      .catch((error) => {console.log(error);setError(true)});
    },[])
  return (
    <Container fluid='md' style={{ padding: '0 7%',marginTop:'5rem' }}>
        {error?<p style={{marginTop:'5rem',textAlign:'center',color:'red'}}>Something Went Wrong !!</p>:
      <Form onSubmit={handleSubmit}>
        <h2>Add Student</h2>
        <Form.Group className='mb-3'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control type='text' placeholder='Enter Full Name' value={fullName} onChange={(e)=>setFullName(e.target.value)} required/>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Course</Form.Label>
          <Form.Control type='text' placeholder='Enter Course' value={course} onChange={(e)=>setCourse(e.target.value)} required/>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>}
    </Container>
  )
}

export default EditStudent