import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const FormPage = () => {
  const [email,setemail]=useState('')
  const [password,setPassword]=useState('')

  const [errorEmail,setErrorEmail]=useState('')
  const [errorPassword,setErrorPassword]=useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let flagEmail=emailFormat.test(email)
    setErrorEmail('')
    setErrorPassword('')
    if(!flagEmail){
      setErrorEmail('Email Format is wrong')
    }
    let flagPassword = password.length <8?false:true;
    if(!flagPassword){
      setErrorPassword('Password length should be atleast 8')
    }
    if(flagEmail && flagPassword){
      setErrorEmail('')
    setErrorPassword('')
      alert(`Form Submitted: \n+Email: +${email}+\nPassword: +${password}`)
      setemail('')
      setPassword('')
    }else{
    console.log(`Failed: Form Not Submitted: \n+Email: +${email}+\nPassword: +${password}`);
    }
    
  }
  return (
    <div style={{ padding: '0 7%',marginTop:'1rem' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='text' placeholder='(Input type text for validation)' value={email} onChange={(e)=>setemail(e.target.value)} required/>
            {errorEmail.length>0?
          <Form.Text className='text-muted'>
            <span style={{color:'red'}}>{errorEmail}</span>
          </Form.Text>:null}
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='text' placeholder='(Input type text for validation)' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          {errorPassword.length>0?
          <Form.Text className='text-muted'>
            <span style={{color:'red'}}>{errorPassword}</span>
          </Form.Text>:null}
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormPage;
