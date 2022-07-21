import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button, Alert } from 'react-bootstrap'
// import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useDispatch, useSelector } from 'react-redux'
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";


const ProfileScreen = () => {
    const [ name, setName] = useState('')
    const [ email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    // let location = useLocation();
    let navigate =  useNavigate();

    const dispatch = useDispatch()

    const userDetails = useSelector(state=> state.userDetails)
    const { loading, error, user} =userDetails
    
    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } =userLogin

    const userUpdateProfile = useSelector(state=> state.userUpdateProfile)
    const { success } =userUpdateProfile
    

    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        } else {
            if(!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            } else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords Does not Matched')
        } else{
        dispatch(updateUserProfile({id: user._id, name, email, password}))   

        }
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='danger'>{message}</Alert>}
            {success && <Alert variant='success'>Profile Updated</Alert>}
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
                <Button className="my-3" type='submit' variant="primary">Update</Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}


export default ProfileScreen