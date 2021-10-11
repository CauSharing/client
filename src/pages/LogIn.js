import React, {useState, useCallback} from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './LogIn.css'
import {signIn} from "../util/auth";
import axios from "axios";

function LogIn({userToken, setUserToken}){
    let history = useHistory();
    setUserToken(null);

    let line1="Be Friend";
    let line2="in Chungang";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(email, password);
        const data = {
            email: email,
            password: password
        };

         let token = null;

         axios.post('http://3.37.167.224:8080/api/login',data)
            .then(res => {
                // 토큰 받기
                if(res.data === "잘못된 아이디 혹은 비밀번호 입니다.")
                {
                    console.log("잘못됨");
                    alert("Wrong id or password");
                    throw new Error();
                }
                else
                    console.log("로그인됨");
                    token = res.data;
                    console.log("auth: ",token);
                    setUserToken(token);
                    history.push('/home');
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
            <div className='SignIn'>
                <div className='SignIn__input'>
                    <input type='email' placeholder='Email' onChange={handleEmailChange} />
                    <input type='password' placeholder='Password' onChange={handlePasswordChange}/>
                </div>
                <button type="submit" onClick={handleClick}>Sign in</button>
            </div>
            <div className='Menu'>
                <Link to="/signUp">Sign up</Link>
                <Link to="/">Lost password?</Link>
            </div>
        </form>
    );
}


export default LogIn;