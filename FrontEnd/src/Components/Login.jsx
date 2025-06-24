import React, {useContext, useState} from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LodingSpinner.jsx";
import UserContext from "../UserContext.jsx";



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = async (e) => {

        navigate("/Loader")
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);

        let res = await axios.get("http://localhost:8080/Users")
        let users = res.data;

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
            alert("Incorrect Credentials")
        }
    };



    return (
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
    );
}

export default Login;
