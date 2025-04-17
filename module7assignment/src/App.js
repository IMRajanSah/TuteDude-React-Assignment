import './App.css';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Home from './component/Home';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { lazy, Suspense } from 'react';
const FormPage = lazy(() => import('./component/FormPage'));
const About = lazy(() => import('./component/About'));
function App() {
  return (
    <BrowserRouter>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to='/'>module7assignment</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/form'>Form</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/form' element={<Suspense fallback={<div>Loading...</div>}><FormPage/></Suspense>}/>
        <Route path='/about' element={<Suspense fallback={<div>Loading...</div>}><About/></Suspense>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
