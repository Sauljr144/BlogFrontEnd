import {React, useState} from 'react'
import { Button, Container, Modal, Form, Row, Col, Accordion, ListGroup } from "react-bootstrap/";
import { useNavigate } from 'react-router-dom';
import { GetLoggedInUser, Loginfn } from '../Services/DataService';


const Login = () => {

    let navigate = useNavigate()

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const handleUser = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleSubmit = async () => {
        let userData ={
            username: Username,
            password: Password
        }

        let token = await Loginfn(userData);
        if(token.token != null)
        {
          localStorage.setItem("Token", token.token);
          GetLoggedInUser(Username)
          navigate('/Dashboard');
        }
        console.log(userData)

    };


  return (
    <div>
        

    <Form style={{width: '40', marginLeft:'33%', marginRight: '33%', marginTop:'10%', backgroundColor:'lightseagreen', padding:'80px', borderRadius: 5}}>
    <h1 className='text-center'>Login</h1>
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
      <p className='mt-2'>If you don't have an account</p>
      <Button variant="outline-primary" onClick={() => navigate("/CreateAccount")}>
        Create Account
      </Button>
    </Form>
    </div>
  )
}

export default Login