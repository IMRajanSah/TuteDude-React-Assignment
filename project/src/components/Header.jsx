import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme='dark' fixed='top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>Finance Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to='/'>Dashboard</Nav.Link>
            <Nav.Link as={Link} to='/add-transaction'>Add Transaction</Nav.Link>
            <Nav.Link as={Link} to='/transaction-history'>Transaction History</Nav.Link>
            <Nav.Link as={Link} to='/budget'>Bugdet</Nav.Link>
            <Nav.Link as={Link} to='/report'>Report</Nav.Link>
            <Nav.Link as={Link} to='/profile-settings'>Profile Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
