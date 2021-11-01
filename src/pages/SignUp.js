import React, {useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import './SignUp.css';
import checkCauEmail from "../util/checkEmail";
import axios from "axios";

function EmailUpdate({email, setEmail, isVerified, setIsVerified}){
    const [userVerificationCode, setUserVerificationCode] = useState("");
    const handleEmailChange = ({target: {value}}) => {
        setEmail(value);
    };

    const handleEmailOnClick = (event) => {
        event.preventDefault();
        let message = "";
        if(!checkCauEmail(email))
        {
            alert("Please write your Chungang university email!");
        }
        else
        {
            setIsVerified(false);
            axios.get(`/api/email`, {params: {email: email}})
                .then(res => {
                    if(res.data.result === true)
                    {
                        alert("Verification code is sent to "+email+"\nPlease check your email. If you can't find email, please check your junk email");
                        console.log(res.data.description);
                    }
                    else
                    {
                        alert(res.data.description);
                        console.log(res.data.description)
                        throw new Error();
                    }
                })
                .catch(err =>{
                    console.log(err);
                });
        }

    };

    const handleUserVerificationCodeChange = ({target: {value}}) => setUserVerificationCode(value);

    const handleVerificationCodeOnClick = (event) => {
        event.preventDefault();
        console.log(userVerificationCode, email);
        axios.get(`/api/verify`, {params: {email: email, code: userVerificationCode}})
            .then(res => {
                if(res.data.result === true)
                {
                    setIsVerified(true);
                    console.log(res.data.description)
                }
                else
                {
                    setIsVerified(false);
                    console.log(res.data.description)
                    throw new Error();
                }
            })
            .catch(err =>{
                setIsVerified(false);
                console.log(err);
                console.log(err.request);
            });
    }

    return(
        <div>
            <div className='Field'>
                <div>
                    <label htmlFor="email">Email</label>
                </div>
                <div>
                    <input type="email"
                           id="email"
                           required
                           value={email}
                           onChange={handleEmailChange}/>
                </div>
                <div>
                    <button className="sendBtn" onClick={handleEmailOnClick}>Send verification code</button>
                </div>
            </div>
            <div className='Field'>
                <div>
                    <label htmlFor="verification">Verification code</label>
                </div>
                <div>
                    <input type="text"
                           id="verification"
                           required
                           value={userVerificationCode}
                           onChange={handleUserVerificationCodeChange} />
                </div>
                <div>
                    {
                        isVerified ?
                            <img src={require("../icons/checked.png").default} alt="checked" />
                            :
                            <button type="submit"
                                    className="checkBtn"
                                    onClick={handleVerificationCodeOnClick}>check</button>
                    }
                </div>
            </div>
        </div>

    );
}



function NicknameUpdate({nickname, setNickname}){
    const handleNicknameChange = ({target: {value}}) => setNickname(value);

    return(
        <div className='Field'>
            <div>
                <label htmlFor="nickname">Nickname</label>
            </div>
            <div>
                <input type="text"
                       id="nickname"
                       required
                       value={nickname}
                       onChange={handleNicknameChange}/>
            </div>
            <div></div>
        </div>
    );
}

function PasswordUpdate({password, setPassword, passwordCheck, setPasswordCheck, checkPassword}){
    const [isValid, setIsValid] = useState(false);

    const handlePasswordChange = ({target: {value}}) => {
        setPassword(value);
        setIsValid(checkPassword(password));
    }
    const handlePasswordCheckChange = ({target: {value}}) => {
        setPasswordCheck(value);
    };

    return(
        <div>
            <div className='Field'>
                <div>
                    <label htmlFor='password'>Password</label>
                </div>
                <div>
                    <input type="password"
                           id="password"
                           name="password"
                           required
                           onChange={handlePasswordChange}
                           value={password}/>
                </div>

                {
                    password.length>0?
                        isValid?
                            <div>
                                <img src={require("../icons/checked.png").default} alt="checked" />
                            </div>
                            :
                            <div>
                                <img src={require("../icons/not-checked.png").default} alt="not checked" />
                                <span>  Password shouldn't have white spaces in it</span>
                            </div>
                        :
                        <div></div>
                }


            </div>
            <div className='Field'>
                <div>
                    <label htmlFor='password_check'>Check Password</label>
                </div>
                <div>
                    <input type="password"
                           id="password_check"
                           name="passwordCheck"
                           required
                           onChange={handlePasswordCheckChange}
                           value={passwordCheck}/>
                </div>
                <div>
                    {
                        (passwordCheck !== "") ?
                            (passwordCheck !== password) ?
                                <img src={require("../icons/not-checked.png").default} alt="not checked"/>
                                :
                                <img src={require("../icons/checked.png").default} alt="checked"/>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    );
}

function MajorUpdate({departmentList, department, setDepartment, major, setMajor}){
    const handleDepartmentOnChange = (event) => {
        setDepartment(event.target.value);
        console.log(event.target.value);
    };
    const handleMajorOnChange = (event) => {
        setMajor(event.target.value);
        console.log(event.target.value);
    };

    return(
        <div className='Field'>
            <div>
                <label htmlFor="department-select">Major</label>
            </div>
            <div>
                <select name="department"
                        id="department-select"
                        onChange={handleDepartmentOnChange}
                        >
                    <option key={0} value="">Choose your college...</option>
                    {
                        departmentList.map((department, index) => (
                            <option key={department.id} value={department.name}>{department.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <select name="major" id="major-select"  onChange={handleMajorOnChange}>
                    {
                        department !== "" ?
                            [<option hidden value="Choose your major..." key={0}>Choose your major...</option> ,
                                departmentList.find(d => d.name === department).major.map((name, index) => (
                                    <option key={index+1} value={name}>{name}</option>
                                ))]
                            :
                            <option hidden value="Choose your major..." key={0}>Choose your major...</option>

                    }
                </select>
            </div>

        </div>
    );
}

function LanguageUpdate({language, setLanguage}){
    const handleOnChange = (event) => {
        setLanguage(event.target.value);
        console.log(event.target.value);
    }
    return(
        <div className='Field'>
            <div>
                <label htmlFor="language-select">Most comfortable language</label>
            </div>
            <div>
                <select id="language-select" value={language} onChange={handleOnChange}>
                    <option value="Choose your language..." hidden>Choose your language...</option>
                    <option value="AF">Afrikaans</option>
                    <option value="SQ">Albanian</option>
                    <option value="AR">Arabic</option>
                    <option value="HY">Armenian</option>
                    <option value="EU">Basque</option>
                    <option value="BN">Bengali</option>
                    <option value="BG">Bulgarian</option>
                    <option value="CA">Catalan</option>
                    <option value="KM">Cambodian</option>
                    <option value="ZH">Chinese (Mandarin)</option>
                    <option value="HR">Croatian</option>
                    <option value="CS">Czech</option>
                    <option value="DA">Danish</option>
                    <option value="NL">Dutch</option>
                    <option value="EN">English</option>
                    <option value="ET">Estonian</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finnish</option>
                    <option value="FR">French</option>
                    <option value="KA">Georgian</option>
                    <option value="DE">German</option>
                    <option value="EL">Greek</option>
                    <option value="GU">Gujarati</option>
                    <option value="HE">Hebrew</option>
                    <option value="HI">Hindi</option>
                    <option value="HU">Hungarian</option>
                    <option value="IS">Icelandic</option>
                    <option value="ID">Indonesian</option>
                    <option value="GA">Irish</option>
                    <option value="IT">Italian</option>
                    <option value="JA">Japanese</option>
                    <option value="JW">Javanese</option>
                    <option value="KO">Korean</option>
                    <option value="LA">Latin</option>
                    <option value="LV">Latvian</option>
                    <option value="LT">Lithuanian</option>
                    <option value="MK">Macedonian</option>
                    <option value="MS">Malay</option>
                    <option value="ML">Malayalam</option>
                    <option value="MT">Maltese</option>
                    <option value="MI">Maori</option>
                    <option value="MR">Marathi</option>
                    <option value="MN">Mongolian</option>
                    <option value="NE">Nepali</option>
                    <option value="NO">Norwegian</option>
                    <option value="FA">Persian</option>
                    <option value="PL">Polish</option>
                    <option value="PT">Portuguese</option>
                    <option value="PA">Punjabi</option>
                    <option value="QU">Quechua</option>
                    <option value="RO">Romanian</option>
                    <option value="RU">Russian</option>
                    <option value="SM">Samoan</option>
                    <option value="SR">Serbian</option>
                    <option value="SK">Slovak</option>
                    <option value="SL">Slovenian</option>
                    <option value="ES">Spanish</option>
                    <option value="SW">Swahili</option>
                    <option value="SV">Swedish </option>
                    <option value="TA">Tamil</option>
                    <option value="TT">Tatar</option>
                    <option value="TE">Telugu</option>
                    <option value="TH">Thai</option>
                    <option value="BO">Tibetan</option>
                    <option value="TO">Tonga</option>
                    <option value="TR">Turkish</option>
                    <option value="UK">Ukrainian</option>
                    <option value="UR">Urdu</option>
                    <option value="UZ">Uzbek</option>
                    <option value="VI">Vietnamese</option>
                    <option value="CY">Welsh</option>
                    <option value="XH">Xhosa</option>
                </select>
            </div>
            <div>

            </div>
        </div>
    );
}

function SignUp({departmentList}){
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [department, setDepartment] = useState("");
    const [major, setMajor] = useState("");
    const [language, setLanguage] = useState("");

    const checkVar = () => {
        if(email === "" || !checkCauEmail(email))
            return false;
        if(!isVerified)
            return false;
        if(!checkPassword(password) || password !== passwordCheck || password==="")
            return false;
        if(nickname === "")
            return false;
        if(department==="" || major==="")
            return false;
        if(language==="")
            return false;
        return true;
    }

    const checkPassword = (password) => {
        if(password.indexOf(' ') >= 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    const okBtnClick = (event) => {
                if(!checkVar())
                {
                    event.preventDefault();
                    alert("Please check your inputs again");
                }
                else
                {
                    alert("email: "+ email + "\n" + "nickname: "+nickname+"\n"+"major: "+department+" "+major+"\n"+"language: "+language+"\n");
                    axios.post("/api/register", {confirmPw: passwordCheck,
                                                 department: department,
                                                 email: email,
                                                 language: language,
                                                 major: major,
                                                 nickname: nickname,
                                                 password: password})
                            .then(res => {
                                if(res.data.result === true)
                                {
                                    console.log(res.data.description);
//                                     history.push("/");
                                    window.location.href = "/";
                                }
                                else
                                {
                                    console.log(res.data.description)
                                    throw new Error();
                                }
                            })
                            .catch(err =>{
                                console.log(err);
                            });
                }
    }

    return(
        <form className='SignUp' >
            <div className='Title'>Sign Up</div>
                <div className='Fields'>
                    <EmailUpdate
                        email={email}
                        setEmail={setEmail}
                        isVerified={isVerified}
                        setIsVerified={setIsVerified}/>

                    <NicknameUpdate
                        nickname={nickname}
                        setNickname={setNickname}/>

                    <PasswordUpdate
                        password={password}
                        setPassword={setPassword}
                        passwordCheck={passwordCheck}
                        setPasswordCheck={setPasswordCheck}
                        checkPassword={checkPassword}
                        />

                    <MajorUpdate
                        departmentList={departmentList}
                        department={department}
                        setDepartment={setDepartment}
                        major={major}
                        setMajor={setMajor} />

                    <LanguageUpdate
                        language={language}
                        setLanguage={setLanguage} />
                </div>
                <button type="submit" className='ok' onClick={okBtnClick}>OK</button>

        </form>
    )
}

export default SignUp;