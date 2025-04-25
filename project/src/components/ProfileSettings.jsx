import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { FinanceContext } from '../store/FinanceContext'

const ProfileSettings = () => {
  const {profile,editProfile,pushToFinanceAPI,pullFromFinanceAPI,transactions,budget}=useContext(FinanceContext)
  const [currency,setCurrency]=useState('')
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [notification,setNotification]=useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(window.confirm('Confirm? You want to add transaction!')){
      editProfile({currency_type:currency,email:email,name:name,notification_preference:notification})
      console.log({currency_type:currency,email:email,name:name,notification_preference:notification});
      pushToFinanceAPI(transactions,budget,{currency_type:currency,email:email,name:name,notification_preference:notification})
      await new Promise((resolve) => setTimeout(resolve, 1000));
      pullFromFinanceAPI()     
      // navigate('/transaction-history')
    }else{
      console.log('No');
    }
    
  }
  useEffect(()=>{
    setCurrency(profile.currency_type)
    setName(profile.name)
    setEmail(profile.email)
    setNotification(profile.notification_preference)
  },[profile])
  console.log(currency,name,email,notification);
  
  return (
    <Container style={{marginTop:"4rem"}}>
        <Card style={{ minHeight: '2rem'}}>
      <Card.Body>
        <Card.Title style={{marginBottom:'0'}}>My Profile Settings</Card.Title>
        <div style={{}} className='profile-mobile'>
          <div style={{marginRight:'3rem',marginBottom:'1rem'}} >
        <Card.Text style={{marginBottom:'0'}}><strong>Name: </strong>{profile.name}</Card.Text>
        <Card.Text style={{marginBottom:'0'}}><strong>Email: </strong>{profile.email}</Card.Text>
        <Card.Text style={{marginBottom:'0'}}><strong>Default Currency: </strong>{profile.currency_type}</Card.Text>
        <Card.Text style={{marginBottom:'0'}}><strong>Notification Preferences: </strong>{profile.notification_preference}</Card.Text>
        </div>
        <div>
          {profile.notification_preference==='Alerts for Overspending'?
          <Alert variant='warning'>You're Over Spending: Reduce your expenses :)</Alert>
          :<Alert variant='success'>You're on track :)</Alert>}
        </div>
        </div>
      </Card.Body>
    </Card>
        <Form onSubmit={handleSubmit} style={{marginTop:'1rem',border:'1px solid black',padding:'0.5rem 1rem 0 1rem', borderRadius:'5px'}}>
            <Row>
                <Col>
                  <Form.Group className='mb-3'>
                                <Form.Label>Default Currency</Form.Label>
                                <Form.Select value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                                  <option value="Rupee">Rupee</option>
                                  <option value="Dollar">Dollar</option>
                                </Form.Select>
                              </Form.Group>
                </Col>
            </Row>
            <Row>
                <span>Profile Information</span>
                <Col>
                      <Form.Group className='mb-3'>
                                    <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                                  </Form.Group>
                </Col>
                <Col>
                      <Form.Group className='mb-3'>
                                    <Form.Control type='email' placeholder='Enter E-mail' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                                  </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                  <Form.Group className='mb-3'>
                                <Form.Label>Notification Preferences</Form.Label>
                                <Form.Select value={notification} onChange={(e)=>setNotification(e.target.value)}>
                                  <option value="Alerts for Overspending">Alerts for Overspending</option>
                                  <option value="Alert for Good Financial Status">Alert for Good Financial Status</option>
                                </Form.Select>
                              </Form.Group>
                </Col>
            </Row>
            <Row>
              
                              <Col style={{marginBottom:'1rem',alignContent:'end'}}>
                              <Button variant='primary' type='submit' >
                        Submit
                      </Button>
                              </Col>
            </Row>
        </Form>
        
    </Container>
  )
}

export default ProfileSettings