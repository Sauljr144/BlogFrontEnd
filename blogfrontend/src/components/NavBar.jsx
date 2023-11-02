import React from 'react'
import Nav from 'react-bootstrap/Nav';
import {Link}from 'react-router-dom'

const NavBar = () => {
  return (
    <>
    <Nav
      className='d-flex justify-content-center  mb-5 p-0'
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link  as={Link} to='/'>Blog Page</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/Dashboard'>Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/Login'>Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/CreateAccount'>Create Account</Nav.Link>
      </Nav.Item>
    </Nav>

    <hr className='line mb-5'/>

    </>
  )
}

export default NavBar