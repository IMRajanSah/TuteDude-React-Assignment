import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
const CreateStudent = () => {
    const [fullName,setFullName]=useState('')
    const [email,setEmail]=useState('')
    const [course,setCourse]=useState('')
    const navigate = useNavigate()
      const handleSubmit = (e)=>{
        e.preventDefault()
        Axios.post('https://68067059e81df7060eb726fd.mockapi.io/student',{fullname:fullName,email:email,course:course}).then((response)=>navigate('/')).catch((error)=>console.log(error))        
      }
  return (
    <Container fluid='md' style={{ padding: '0 7%',marginTop:'5rem' }}>
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
      </Form>
    </Container>
  )
}

export default CreateStudent