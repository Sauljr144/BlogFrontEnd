import React from 'react'
import { Col, Container, Row, Nav } from 'react-bootstrap'
import {Link}from 'react-router-dom'

const Footer = () => {
  return (
    <>



    <Container className='myFooter'>
    <h5>.techNews</h5>
    <Nav
      className=' mb-5 p-0'
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
        
      <Nav.Item >
        <Nav.Link  className='ms-0 ps-0' as={Link} to='/'>Blog Page</Nav.Link>
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
    
        <Row className='mt-5' style={{color:'black'}}>
            <Col className='d-flex justify-content-center'>
            <h7 className="myCopy">Copyright © 2023 .techNews. All rights reserved.</h7>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Footer