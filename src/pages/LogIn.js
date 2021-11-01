import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './LogIn.css'
import axios from "axios";

function LogIn({userToken, setUserToken}){
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

    let line1="Be Friend";
    let line2="in Chungang";

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
                    token = res.data.value;
                    console.log("auth: ",token);
                    setUserToken(token);
                    window.localStorage.setItem("userToken", token);
                    window.localStorage.setItem("userEmail", email);
                    window.location.href = "/home";
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