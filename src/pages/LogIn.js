import React, {useState, useEffect, createContext} from 'react';
import { Link } from 'react-router-dom';

import axios from "axios";

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// import UserContext from '../util/UserContext';

import './LogIn.css'


const LoginBtn = styled(Button)({
    width: "90px",
    fontSize: "20px",
    border: "none",
    borderRadius: "5px",
    background: "#0148A0",
    color: "#FFFFFF",
    fontFamily:"Roboto Condensed",
    '&:hover': {
        backgroundColor: '#4892d2',
        boxShadow: 'none',
      },
});

function LogIn({setUser}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let line1="CxC";
    let line2 = "";

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

                    setUser({
                        email: res.data.value.email,
                        nickname: res.data.value.nickname,
                        department: res.data.value.department,
                        major: res.data.value.major,
                        image: res.data.value.image,
                        language: res.data.value.language
                    });

                    window.localStorage.setItem("userToken", token);
                    window.location.replace("/home");
                })
            .catch(err =>{
                    console.log(err);
                });
    };

    return(
        
        <form className='LogIn' >
            <div className='Title'>
                <div>{line1}</div>
                <div>{line2}</div>
            </div>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{display:"flex"}}
                >
                <Box sx={{display:"flex", flexDirection:"column", marginRight: "10px"}}>
                    <TextField 
                        id="standard-basic" 
                        label="Email" 
                        variant="standard" 
                        onChange={handleEmailChange} 
                        style={{    width: "280px"}}
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
                        style={{    width: "280px"}}
                        required
                        helperText={password===""? "Password is required": null}
                        />
                </Box>
                <LoginBtn onClick={handleClick}>{"Sign in"}</LoginBtn>
            </Box>
            <div className='Menu'>
                <Link to="/signUp">Sign up</Link>
                <Link to="/">Lost password?</Link>
            </div>
        </form>

    );
}



export default LogIn;