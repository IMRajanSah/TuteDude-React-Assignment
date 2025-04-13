import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
const ToDo = () => {
  const [inputValue, setInputValue] = useState('');
  const [toDoTitles, setToDoTitles] = useState([]);
  const addToDoList = () => {
    if (inputValue.trim() === '') {
      alert('Invalid ToDo title (spaces not allowed)');
      setInputValue('');
    } else {
      setToDoTitles([...toDoTitles, inputValue]);
      setInputValue('');
    }
  };
  const cardStyle = {
    padding: '0.5rem 0',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: '1rem',
  };
  const handleDelete = (title) => {
    setToDoTitles((prev) => prev.filter((item) => item !== title));
  };
  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand>ToDo App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ paddingTop: '1rem' }}>
        <Row>
          <Col xs={9}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Enter ToDo Title'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Button variant='primary' onClick={addToDoList}>
              Add
            </Button>
          </Col>
        </Row>
        <div style={cardStyle}>
          {toDoTitles.length > 0
            ? toDoTitles.map((title, index) => (
                <>
                  <Card key={index} style={{ width: '9rem' }}>
                    <Card.Body style={{ padding: '0.5rem' }}>
                      <Card.Title style={{ fontSize: '1rem' }}>
                        {title}
                      </Card.Title>
                      <Button
                        style={{ padding: '0.1rem', fontSize: '0.75rem' }}
                        variant='danger'
                        size='sm'
                        onClick={() => handleDelete(title)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </>
              ))
            : null}
        </div>
      </Container>
    </>
  );
};

export default ToDo;
