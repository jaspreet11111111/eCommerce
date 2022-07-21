import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button, Alert } from 'react-bootstrap'
// import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from 'react-redux'


const RegisterScreen = () => {
    const [ name, setName] = useState('')
    const [ email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    let location = useLocation();
    let navigate =  useNavigate();

    const dispatch = useDispatch()

    const userRegister = useSelector(state=> state.userRegister)
    const { loading, error, userInfo} =userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // DISPATCH LOGIN
        if(password !== confirmPassword){
            setMessage('Passwords Does not Matched')
        } else{

            dispatch(register(name, email, password))
        }
    }

  return (
    <FormContainer>
        <h1>Register</h1>
        {error && <Alert variant='danger'>{error}</Alert>}
        {message && <Alert variant='danger'>{message}</Alert>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter Name' value={name} onChange={e=> setName(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e=> setEmail(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={e=> setPassword(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)} ></Form.Control>
            </Form.Group>
            <Button className="my-3" type='submit' variant="primary">Register</Button>
        </Form>

        <Row className="py-3">
            <Col>
                Already Have An Account? <Link to={redirect ? `/login?redirect=${redirect}`: '/login'} >Login</Link>
            </Col>
        </Row>

    </FormContainer>
  )
}


export default RegisterScreen