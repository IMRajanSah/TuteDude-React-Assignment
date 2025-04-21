import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <Navbar bg='dark' data-bs-theme='dark' fixed='top'>
      <Container fluid='md'>
        <Navbar.Brand as={Link} to='/'>Student Management</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse className='justify-content-end'>
        <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Student List</Nav.Link>
            <Nav.Link as={Link} to='/create'>Add Student</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
