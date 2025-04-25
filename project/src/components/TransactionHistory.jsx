import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Pagination, Row, Table } from 'react-bootstrap'
import { FinanceContext } from '../store/FinanceContext'

const TransactionHistory = () => {
  const {transactions,editTransaction,pullFromFinanceAPI,deleteTransaction,pushToFinanceAPI,budget,profile} = useContext(FinanceContext)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const [myTransactionData,setMyTransactionData] =useState([])
  const [sortType,setSortType] =useState('')
  const [searchCategory,setSearchCategory]=useState('')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [transactionType,setTransactionType] = useState('')
      const [amount,setAmount] = useState()
      const [category,setCategory] = useState('')
      const [tDate,setTDate] = useState('')
      const [tDescription,setTDescription] = useState('')
  const [modalDataOld,setModalDataOld]=useState({})
  const handleEdit = (item)=>{
    setModalDataOld(item)
    setTransactionType(item.tranaction_type)
    setAmount(item.amount)
    setCategory(item.category)
    const [day, month, year] = item.date.split("-");
    const result = `${year}-${month}-${day}`;
    console.log(result);
    setTDate(result)
    setTDescription(item.descriptiom)
    handleShow()
  }
  const handleSubmit=async()=>{
    // console.log(tDate);
    const [year, month, day] = tDate.split("-");
            const result = `${day}-${month}-${year}`;
            const transaction = {
              "tranaction_type": transactionType,
              "amount": Number(amount),
              "category": category,
              "date": result,
              "descriptiom": tDescription
          }
          if(window.confirm('Confirm? You want to edit transaction!')){
            let edit1=editTransaction(modalDataOld,transaction)
            pushToFinanceAPI(edit1,budget,profile)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            pullFromFinanceAPI() 
            handleClose()
          }else{
            console.log('No');
          }
    
  }
  const handleDelete=async(item)=>{
    if(window.confirm('Confirm? You want to delete transaction!')){
      let d1=deleteTransaction(item)
      pushToFinanceAPI(d1,budget,profile)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      pullFromFinanceAPI() 
    }else{
      console.log('No');
    }
  }
  
  useEffect(()=>{
    setMyTransactionData(transactions)
  },[transactions])
  useEffect(()=>{
    if (searchCategory.trim() === '') {
      setMyTransactionData(transactions);
    } else {
      const lowerKeyword = searchCategory.toLowerCase();
      const filtered = myTransactionData.filter(item =>
        item.category.toLowerCase().includes(lowerKeyword)
      );
      setMyTransactionData(filtered);
    }
  },[searchCategory])
  useEffect(()=>{
    if(sortType!==''){
    const sorted = [...myTransactionData].sort((a, b) => {
      const valA = a[sortType];
      const valB = b[sortType];
  
      if (typeof valA === 'string' && typeof valB === 'string') {
        return 'asc' === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
    
      return 'asc' === 'asc'
        ? valA - valB
        : valB - valA;
    });
    setMyTransactionData(sorted);
  }else{
    setMyTransactionData(transactions);
  }
    
  },[sortType])

  const totalPages = Math.ceil(myTransactionData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = myTransactionData.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <>
    <Container style={{marginTop:"4rem"}}>
        <div className='title'>
            <h4>Transaction History</h4>
        </div>
        <div className="my_table">
            <div className="my_filters">
              <Row>
                <Col>
              <div className="filter-by-category">
            <Form.Group className='mb-3'>
          <Form.Control type='text' placeholder='Search for category...' value={searchCategory} onChange={(e)=>setSearchCategory(e.target.value)}/>
        </Form.Group>
        </div>
        </Col>
        <Col>
        <div className="sorting">
        <Form.Group className='mb-3'>
              <Form.Select value={sortType} onChange={(e)=>setSortType(e.target.value)} required>
                <option value="" disabled>Sorting...</option>
                <option value="amount">Amount</option>
                <option value="date">Date</option>
                <option value="tranaction_type">Type</option>
              </Form.Select>
            </Form.Group>
        </div>
        </Col>
        </Row>
            </div>
        

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length>0?currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>{item.amount}</td>
                <td>{item.tranaction_type}</td>
                <td>{item.descriptiom}</td>
                <td>
                  <svg
                    onClick={()=>handleEdit(item)}
                    style={{ cursor: 'pointer',marginRight:'1rem' }}
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='blue'
                    className='bi bi-pencil-square'
                    viewBox='0 0 16 16'
                  >
                    <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                    <path
                      fillRule='evenodd'
                      d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'
                    />
                  </svg>
                
                
                  <svg
                    onClick={() => {handleDelete(item)}}
                    style={{ cursor: 'pointer' }}
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='red'
                    className='bi bi-trash-fill'
                    viewBox='0 0 16 16'
                  >
                    <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0' />
                  </svg>
                </td>
              </tr>
            )):<tr><td>No Search Result Found !!</td></tr>}
          </tbody>
        </Table>
        
      <Pagination style={{display:'flex',justifyContent:'center',gap:'0.5rem',alignItems:'center'}}>
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1}/>
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}/>

        <span>Page <strong>{currentPage}</strong> of {totalPages}</span>

        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}/>

        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}/>
      </Pagination>
        </div>
        
    </Container>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
                <Form >
                  <Row>
                    <Col>
                      <Form.Group className='mb-3'>
                        <Form.Label>Transaction Type</Form.Label>
                        <Form.Select value={transactionType} onChange={(e)=>setTransactionType(e.target.value)} required>
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
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
          
                  
                </Form>
              </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TransactionHistory