// import the necessary components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import Cart from './Cart';

// create a functional component NavBa
const NavBa = () => {
  // set the initial state of show to false
  const [show, setShow] = useState(false)
  // close the Cart component when run
  const handleClose = () => setShow(false)
  // show the Cart component when run
  const handleShow = () => setShow(true)
  // get the user from localStorage
  const user = localStorage.getItem('user')
  // get the navigate method from the router
  const navigate = useNavigate()
  
  // create a function to remove the user from localStorage and navigate to the home page
  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  // return the NavBar component
  return (
      <Navbar bg="primary" variant="dark" >
          <Navbar.Brand as={ Link } to="/">Show Products </Navbar.Brand>
          <Nav>
            { user 
              ? <Nav.Link onClick={ logout }>Logout</Nav.Link>  
              : <Nav.Link as={Link} to="/login" >Login</Nav.Link>
            }
            <Nav.Link as={Link}  to="/purchase"  >Purchases</Nav.Link>
            <Nav.Link onClick={handleShow} >
                <i className='bx bxs-cart car-navbar'></i>
            </Nav.Link>
          </Nav>
          <Cart show={show} handleClose={handleClose} ></Cart>
      </Navbar>
  )
}

export default NavBa;