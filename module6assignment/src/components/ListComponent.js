import { TodoContext } from './ToDoContext';
import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import InputComponent from './InputComponent';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const ListComponent = () => {
  const { toDo, addTodo, deleteTodo } = useContext(TodoContext);
  const [searchValue, setSearchValue] = useState('');
  const cardStyle = {
    padding: '0.5rem 0',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: '1rem',
  };
  const handleDelete = (title) => {
    deleteTodo(title);
  };
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      parsedTodos.forEach((todo) => {
        addTodo(todo);
      });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(toDo));
  }, [toDo]);
  const clearAllList = () => {
    // console.log(searchValue+'clear all');
    toDo.forEach((todo) => {
      deleteTodo(todo);
    });
  };
  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand>ToDo App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ paddingTop: '1rem' }}>
        <InputComponent />
        {/* bonus task search and clear all */}
        <Row style={{ marginTop: '1rem' }}>
          <Col xs={9}>
            <Form.Group>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Search ToDo'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Button size='sm' variant='danger' onClick={clearAllList}>
              Clear All
            </Button>
          </Col>
        </Row>

        <div style={cardStyle}>
          {toDo.length > 0
            ? toDo
                .filter((todo) =>
                  todo.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((title, index) => (
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

export default ListComponent;
