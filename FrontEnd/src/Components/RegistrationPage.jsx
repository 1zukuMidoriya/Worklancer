import React, {useState} from 'react';
import { Button, Card, Container, Form} from 'react-bootstrap';
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';
import './RegistrationPage.css';

function RegisterPage() {
    const [thisname, setName] = useState('');
    const [thisemail, setEmail] = useState('');
    const [thispassword, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Name:', thisname, 'Email:', thisemail, 'Password:', thispassword);

        axios.post('http://localhost:8080/Users',{
            name: thisname,
            email: thisemail,
            password: thispassword
        }).then(function (response){
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        })
        alert("Registration successful")

    navigate("/");

        
    };

    return (
        <div className="register-container">
            <motion.div 
                className="register-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.h3 
                    className="register-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeOut" }}
                >
                    Create Account
                </motion.h3>
                
                <form onSubmit={handleRegister}>
                    <motion.div 
                        className="form-group-custom"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter your name"
                            value={thisname}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </motion.div>

                    <motion.div 
                        className="form-group-custom"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="name@example.com"
                            value={thisemail}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </motion.div>

                    <motion.div 
                        className="form-group-custom"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Create a strong password"
                            value={thispassword}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </motion.div>

                    <motion.button 
                        type="submit" 
                        className="register-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeInOut" }}
                    >
                        Create Account
                    </motion.button>
                </form>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeInOut" }}
                >
                    <Link className="login-link" to="/">
                        Already have an account? Sign in
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default RegisterPage;
