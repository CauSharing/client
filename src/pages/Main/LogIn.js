import React, {useState, useEffect, createContext} from 'react';
import { Link } from 'react-router-dom';

import axios from "axios";

import {Button, TextField, Box, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
// import UserContext from '../util/UserContext';

import './LogIn.css'


const LoginBtn = styled(Button)({
    width: "49%",
    fontSize: "20px",
    border: "none",
    borderRadius: "5px",
    background: '#0148A0',
    textTransform:'none',
    color: "#FFFFFF",
    fontFamily:"Roboto Condensed",
    '&:hover': {
        backgroundColor: '#4892d2',
        boxShadow: 'none',
      },
});

const ForgetPWBtn = styled(Button)({
    textTransform:'none',
    width: "49%",
    fontSize: "20px",
    border: "none",
    borderRadius: "5px",
    background: "#E9E9E9",
    color: "#000000",
    fontFamily:"Roboto Condensed",
    '&:hover': {
        backgroundColor: '#C0C0C0',
        boxShadow: 'none',
      },
});

function LogIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // localStorage.removeItem('userToken');
        localStorage.clear();
    }, [] );


    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);


    const handleClick = (e) => {
        e.preventDefault();
        console.log(email, password);

        const data = {
            email: email,
            password: password
        };

        axios.post('/api/login',data, {withCredentials: true})
            .then(res => {
                console.log(res);
                if(res.data.result === false)
                {
                    console.log("잘못됨");
                    alert(res.data.description);
                    throw new Error();
                }
                else
                    console.log("로그인됨");
                    const token = res.data.value.jwtToken;

                    // setUser({
                    //     email: res.data.value.email,
                    //     nickname: res.data.value.nickname,
                    //     department: res.data.value.department,
                    //     major: res.data.value.major,
                    //     image: res.data.value.image,
                    //     language: res.data.value.language
                    // });

                    window.localStorage.setItem("userToken", token);
                    window.location.replace("/home");
                })
            .catch(err =>{
                    console.log(err);
                });
    };

    return(
        <Box sx={{width: "50%",height:"100%", display: "flex", flexDirection:"column", justifyContent:"center", marginLeft:"10px"}}>
            <div className='login__title'>
                Sign in
            </div>
            <Box   
                component="form"
                noValidate
                autoComplete="off"
                sx={{display:"flex", flexDirection:"column", width:"100%", marginTop:"20px"}}>
                <TextField 
                    id="standard-basic" 
                    label="Email" 
                    variant="standard" 
                    onChange={handleEmailChange} 
                    style={{    maxWidth: "450px", fontSize:"24px"}}
                    required
                    helperText={email===""? "Email is required": null}
                    />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    onChange={handlePasswordChange}
                    style={{    maxWidth: "450px", fontSize:"24px"}}
                    required
                    helperText={password===""? "Password is required": null}
                    />
                <Box sx={{maxWidth:"450px", display:"flex", justifyContent:"space-between", marginTop:"20px"}}>
                    <LoginBtn onClick={handleClick}>Sign in</LoginBtn>
                    <ForgetPWBtn>Forgot password?</ForgetPWBtn>
                </Box>
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", maxWidth: "450px",marginTop:"20px"}}>
                <span className="login__signUpDesc">Don’t have an account?</span>
                <Link to="/signUp" className="login__signUpLink">Create an account</Link>
            </Box>
        </Box>
    );
}



export default LogIn;