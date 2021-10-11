import React, {useState} from 'react';
import { Link} from 'react-router-dom';
import './LogIn.css'
import axios from "axios";


function LogIn({authenticated, login}){
    let line1="Be Friend";
    let line2="in Chungang";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isValidUser, setIsValidUser] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({email, password, setEmail, setPassword});
    }

    return(
        <form className='LogIn' onSubmit={handleSubmit}>
            <div className='Title'>
                <div>{line1}</div>
                <div>{line2}</div>
            </div>
            <div className='SignIn'>
                <div className='SignIn__input'>
                    <input type='email' placeholder='Email' onChange={handleEmailChange} />
                    <input type='password' placeholder='Password' onChange={handlePasswordChange}/>
                </div>
{/*                 <Link to="/home"> */}
{/*                     <button type="submit">Sign in</button> */}
{/*                 </Link> */}
                <button type="submit">Sign in</button>
            </div>
            <div className='Menu'>
                <Link to="/signUp">Sign up</Link>
                <Link to="/">Lost password?</Link>
            </div>
        </form>
    );
}


export default LogIn;