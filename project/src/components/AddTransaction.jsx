import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FinanceContext } from '../store/FinanceContext';
import { useNavigate } from 'react-router-dom';
const AddTransaction = () => {
  const {createTransaction,pullFromFinanceAPI,transactions,pushToFinanceAPI,budget,profile} = useContext(FinanceContext)
    const [transactionType,setTransactionType] = useState('Income')
    const [amount,setAmount] = useState(0)
    const [category,setCategory] = useState('')
    const [tDate,setTDate] = useState('')
    const [tDescription,setTDescription] = useState('')
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        // console.log(e);
        const [year, month, day] = tDate.split("-");
        const result = `${day}-${month}-${year}`;
        const transaction = {
          "tranaction_type": transactionType,
          "amount": amount,
          "category": category,
          "date": result,
          "descriptiom": tDescription
      }
      if(window.confirm('Confirm? You want to add transaction!')){
        let a1=createTransaction(transaction)
        // console.log(a1);
        pushToFinanceAPI(a1,budget,profile)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        pullFromFinanceAPI()     
        navigate('/transaction-history')
      }else{
        console.log('No');
      }
      
    }
  
  return (
    <Container style={{ marginTop: '4rem' }}>
      <Form onSubmit={handleSubmit}>
        <h4>Add Transaction</h4>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select value={transactionType} onChange={(e)=>setTransactionType(e.target.value)} required>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Transaction Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Course'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Transaction Date</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter Date'
                value={tDate}
                onChange={(e) => setTDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className='mb-3'>
          <Form.Label>Transaction Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={4}
            placeholder='Enter Transaction Description'
            value={tDescription}
            onChange={(e) => setTDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddTransaction