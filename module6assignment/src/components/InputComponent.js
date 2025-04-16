import React, { useContext, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { TodoContext } from './ToDoContext';

const InputComponent = () => {
  const { addTodo} = useContext(TodoContext);
  const [inputValue, setInputValue] = useState('');
  const addToDoList = () => {
    if (inputValue.trim() === '') {
      alert('Invalid ToDo title (spaces not allowed)');
      setInputValue('');
    } else {
      addTodo(inputValue);
      setInputValue('');
    }
  };
  return (
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
  );
};

export default InputComponent;
