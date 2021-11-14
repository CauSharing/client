import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';

import axios from "axios";

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import './LogIn.css'

const LoginBtn = styled(Button)({
    width: "100px",
    height: "108px",
    fontSize: "24px",
    border: "none",
    borderRadius: "5px",
    /*box-shadow: 0px 4px 10px rgba(0,0,0,0.25);*/
    background: "#0148A0",
    color: "#FFFFFF",
    marginLeft: "8px",
    marginRight: "8px",
    fontFamily:"Roboto Condensed"
});

function LogIn({userToken, setUserInfo}){
    const history = useHistory();

    // 처음 login화면에 들어올 때는 user token은 null값으로 초기화
//     useEffect(() => {
//         setUserToken(null);
//         return(
//             localStorage.removeItem('userToken')
//         );
//     }, [] );
    useEffect(() => {
        localStorage.removeItem('userToken');
    }, [] );

    let line1="CxC";
//     let line2="in Chungang";
    let line2 = "";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

//     window.addEventListener('beforeunload', (event) => {
//      // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
//      localStorage.removeItem("userToken");
//      event.preventDefault();
//
//      });
    const handleClick = (e) => {
        e.preventDefault();
        console.log(email, password);
        const data = {
            email: email,
            password: password
        };

         let token = null;

        axios.post('/api/login',data)
            .then(res => {
                // 토큰 받기
                if(res.data.result === false)
                {
                    console.log("잘못됨");
                    alert(res.data.description);
                    throw new Error();
                }
                else
                    console.log("로그인됨");
                    token = res.data.value.jwtToken;
                    // console.log("auth: ",token);
                    // console.log(res.data.value);
                    // setUserInfo({
                    //     token: token,
                    //     email: res.data.value.email,
                    //     nickname: res.data.value.nickname,
                    //     department: res.data.value.department,
                    //     major: res.data.value.major,
                    //     image: res.data.value.image,
                    //     language: res.data.value.language
                    // });
                    // setUserToken(token);
                    // setUserEmail(res.data.value.email);
                    // setUserNickname(res.data.value.nickname);
                    // setUserDepartment(res.data.value.department);
                    // setUserMajor(res.data.value.major);
                    // setUserImage(res.data.value.image);
                    // setUserLanguage(res.data.value.language);

                    window.localStorage.setItem("userToken", token);
                    window.location.replace("/home");
                    // window.location.href = "/home";
//                     history.push("/home");
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
                    <TextField id="standard-basic" label="Email" variant="standard" onChange={handleEmailChange} style={{    width: "280px",
                            height: "50px"}}/>
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={handlePasswordChange}
                        style={{    width: "280px",
                                    height: "50px"}}
                        />
                    {/* <input type='email' placeholder='Email' onChange={handleEmailChange} />
                    <input type='password' placeholder='Password' onChange={handlePasswordChange}/> */}
                </div>
                <LoginBtn onClick={handleClick}>{"Sign in"}</LoginBtn>
                {/* <button type="submit" onClick={handleClick}>Sign in</button> */}
            </div>
            <div className='Menu'>
                <Link to="/signUp">Sign up</Link>
                <Link to="/">Lost password?</Link>
            </div>
        </form>
    );
}


export default LogIn;