import {React, useState} from 'react'
import { Button, Container, Modal, Form, Row, Col, Accordion, ListGroup } from "react-bootstrap/";

const CreateAccount = () => {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const handleUser = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleSubmit = () => {
        let userData ={
            username: Username,
            password: Password
        }

        console.log(userData)

    };


  return (
    <div>
        

    <Form style={{width: '40', marginLeft:'33%', marginRight: '33%', marginTop:'10%', backgroundColor:'lightseagreen', padding:'80px', borderRadius: 5}}>
    <h1 className='text-center'>Create Account</h1>
      <Form.Group className="mb-3" controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={handleUser}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
      </Form.Group>
     
      <Button variant="outline-primary"  onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default CreateAccount