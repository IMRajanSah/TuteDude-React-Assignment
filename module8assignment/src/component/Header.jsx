import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { MealContext } from '../Data/MealContext';
import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { Badge } from 'react-bootstrap';
const Header = () => {
  const { myMeals, addMeal, deleteMeal } = useContext(MealContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalAmount = () => {
    let amt = 0;
    myMeals.map((m) => {
      amt = amt + m.price * m.amount;
    });
    return amt;
  };
  const handlePlaceOrder = () => {
    // for now we are clearing the context and local storage data
    localStorage.removeItem('meals');
    myMeals.map((item) => {
      deleteMeal(item.id);
    });
    handleClose();
  };
  const RemoveItem = (id) => {
    console.log(id);
    if (myMeals.some((meal) => meal.id === id)) {
      deleteMeal(id);
    }
  };
  return (
    <Navbar bg='dark' data-bs-theme='dark' fixed='top'>
      <Container fluid='md'>
        <Navbar.Brand style={{ cursor: 'pointer' }}>Zomato Lite</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse className='justify-content-end'>
          <Button
            variant='outline-secondary'
            size='sm'
            style={{
              color: 'white',
              width: '8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={handleShow}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-cart-check'
              viewBox='0 0 16 16'
            >
              <path d='M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z' />
              <path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0' />
            </svg>
            &nbsp; Cart &nbsp;
            <div style={{ color: 'yellow', fontWeight: 'bold' }}>
              {myMeals.length}
            </div>
          </Button>
        </Navbar.Collapse>
      </Container>
      <Modal show={show} onHide={handleClose} animation={false} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>My Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {myMeals.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Meal</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {myMeals.map((m, index) => (
                  <tr key={m.id}>
                    <td>{index + 1}</td>
                    <td>
                      {m.name}{' '}
                      <Badge
                        bg='danger'
                        style={{ cursor: 'pointer' }}
                        onClick={() => RemoveItem(m.id)}
                      >
                        Remove
                      </Badge>
                    </td>
                    <td>{m.amount}</td>
                    <td>{m.price}</td>
                    <td>{m.price * m.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No Items Added</p>
          )}
        </Modal.Body>
        {myMeals.length > 0 ? (
          <Modal.Footer>
            <p>
              <b>Total Amount: {totalAmount().toFixed(2)}</b>
            </p>
            <Button variant='danger' onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </Modal.Footer>
        ) : null}
      </Modal>
    </Navbar>
  );
};

export default Header;
