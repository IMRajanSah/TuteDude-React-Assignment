import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, ProgressBar, Row } from 'react-bootstrap'
import { FinanceContext } from '../store/FinanceContext'

const Budget = () => {
  const {transactions,createBudget,pushToFinanceAPI,pullFromFinanceAPI,profile,budget} = useContext(FinanceContext)
    const [category,setCategory] = useState('')
    const [allCategory,setAllCategory] = useState([])
    const [amount,setAmount] = useState(0)
    const [budgetIndicator,setBudgetIndicator] = useState('')
    const [totalE,setTotalE]=useState(0)
    const [totalB,setTotalB]=useState(0)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(category,amount);
        let x1=createBudget({title:category,price:Number(amount)})
        pushToFinanceAPI(transactions,x1,profile)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        pullFromFinanceAPI()
        setBudgetIndicator('')  
    }
    useEffect(()=>{
      let a1=[]      
      transactions.map((item)=>{
        a1.push(item.category)
      })
      setAllCategory(a1)
      
    },[transactions])

    useEffect(()=>{
      let totalExpense=0
      transactions.map(item=>{
        if(item.category===budgetIndicator){
          console.log(item.category,budgetIndicator);
          totalExpense+=item.amount
        }
      })
      let totalBudget=0
      budget.map(item=>{
        if(item.title===budgetIndicator){
          totalBudget+=item.price
        }
      })
      console.log(totalExpense,totalBudget);
      setTotalE(totalExpense)
      setTotalB(totalBudget)
      // setProgressData(totalBudget-totalExpense)
      
      
    },[budgetIndicator])
    
  return (
    <Container style={{marginTop:"4rem"}}>
        <div className='title'>
            <h4>Budget</h4>
        </div>
        <div className="budget-form" style={{marginTop:'2rem',border:'2px solid black',padding:'1rem',borderRadius:'5px'}}>
        <Form onSubmit={handleSubmit}>
        <h6>Set Budget Amount</h6>
            <Row>
                <Col>
                <Form.Group className='mb-3'>
              <Form.Label>Budget Category</Form.Label>
              <Form.Select value={category} onChange={(e)=>setCategory(e.target.value)} required>
              <option value="" disabled>Choose Budget</option>
                {allCategory.map((item,ind)=><option key={ind} value={item}>{item}</option>)}
              </Form.Select>
            </Form.Group>
                </Col>
                <Col>
                <Form.Group className='mb-3'>
              <Form.Label>Budget Amount</Form.Label>
              <Form.Control type='number' value={amount} onChange={(e)=>setAmount(e.target.value)} required/>
            </Form.Group>
                </Col>
                <Col style={{marginBottom:'1rem',alignContent:'end'}}>
                <Button variant='primary' type='submit' >
          Submit
        </Button>
                </Col>
            </Row>
            <Row>
                
            </Row>
            </Form>
        </div>
        <div className="indicator" style={{marginTop:'2rem',border:'2px solid black',padding:'1rem',borderRadius:'5px'}}>
        <h6>Budget Indicator</h6>
        <Form.Group className='mb-3'>
              <Form.Select value={budgetIndicator} onChange={(e)=>setBudgetIndicator(e.target.value)} required>
              <option value=''>Choose Budget type </option>
                {budget.map((item,ind)=><option key={ind} value={item.title}>{item.title}</option>)}
              </Form.Select>
            </Form.Group>
            <div style={{marginTop:'2rem'}}>
            {budgetIndicator.length>0?
            <>
            {totalE/totalB>0.75?
        <ProgressBar variant="danger" now={((totalE/totalB)*100).toFixed(2)} label={((totalE/totalB)*100).toFixed(2)+'%'} />
        :
        <ProgressBar variant="success" now={((totalE/totalB)*100).toFixed(2)} label={((totalE/totalB)*100).toFixed(2)+'%'} />
        }
        <Alert variant='warning' style={{marginTop:'2rem'}}>Out of Budget for this category !!</Alert>
        </>
        :
        <Alert variant='info'>Choose the budget indicator to show progress bar !!</Alert>}
        </div>
        </div>
    </Container>
  )
}

export default Budget