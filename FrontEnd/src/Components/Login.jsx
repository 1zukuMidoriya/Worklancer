import React, {useContext, useState} from 'react';
import { Container, Form, Button, Card, Modal, Spinner } from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LodingSpinner.jsx";
import UserContext from "../UserContext.jsx";
import { SyncLoader } from 'react-spinners';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        setShowLoadingModal(true);
        
        console.log('Email:', email, 'Password:', password);

        try {
            let res = await axios.get("http://localhost:8080/Users")
            let users = res.data;

            console.log(users)
            const match = users.find(
                
                (user) => user.email === email && user.password === password
            );

            if (match) {
                if(match.role === "Admin"){
                    setUser(match);
                    navigate("/AdminDashboard")
                }else {
                    console.log("User Logged")
                    setUser(match);
                    navigate("/dashboard")
                }
            } else {
                setShowLoadingModal(false);
                alert("Incorrect Credentials")
            }
        } catch (error) {
            setShowLoadingModal(false);
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    };



    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card  className="p-4 shadow">
                    <h3 className="text-center mb-3">Login</h3>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                    <Link className="text-center mt-3"  to="/register">New guy around?</Link>
                </Card>
            </Container>

            <Modal 
                show={showLoadingModal} 
                centered
                backdrop="static"
            >
                <Modal.Body className="text-center py-5">
                    <SyncLoader/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Login;
