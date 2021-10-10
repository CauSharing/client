import React, {useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import {set, useForm} from 'react-hook-form';
import axios from 'axios';
import './SignUp.css';
import '../components/checkEmail'
import checkCauEmail from "../components/checkEmail";

function EmailUpdate({email, setEmail, setVerificationCode, isVerified, verificationCode, userVerificationCode, setIsVerified, setUserVerificationCode}){
    const handleEmailChange = ({target: {value}}) => {
        setEmail(value);
        setVerificationCode("2345"); // email 바뀔 때마다 verification code도 바뀜

    };

    const handleEmailOnClick = (event) => {
        event.preventDefault();
        let message = "";
        if(!checkCauEmail(email))
        {
            message = "Please write your Chungang university email!";
        }
        else
        {
            message = "Verification code is sent to "+email+"\nPlease check your email.";
            setIsVerified(false);
        }
        alert(message);
    };

    const handleUserVerificationCodeChange = ({target: {value}}) => setUserVerificationCode(value);

    const handleVerificationCodeOnClick = (event) => {
        event.preventDefault();
        if(isVerified === false)
        {
            if(verificationCode === userVerificationCode)
            {
                setIsVerified(true);
                alert("Your email is verified!");
            }
            else
            {
                setIsVerified(false);
                alert("Wrong verification code!");
            }
        }
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

function PasswordUpdate({password, setPassword, passwordCheck, setPasswordCheck}){
    const [isValid, setIsValid] = useState(false);

    const handlePasswordChange = ({target: {value}}) => {
        setPassword(value);
        checkPassword(password);
    }
    const handlePasswordCheckChange = ({target: {value}}) => {
        setPasswordCheck(value);
    };

    const checkPassword = (password) => {
        if(password.indexOf(' ') >= 0)
        {
            setIsValid(false);
        }
        else
        {
            setIsValid(true);
        }
    }

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
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);

    const handleDepartmentOnChange = (event) => {
        console.log(event.currentTarget.value);
        setSelectedDepartmentId(event.currentTarget.value);

        if(selectedDepartmentId > 0)
        {
            console.log(department);
            setDepartment(departmentList[selectedDepartmentId-1].name);
        }
    };
    const handleMajorOnChange = (event) => {
        setMajor(event.currentTarget.value);
    };

    return(
        <div className='Field'>
            <div>
                <label htmlFor="department-select">Major</label>
            </div>
            <div>
                <select name="department" id="department-select" onChange={handleDepartmentOnChange}>
                    {
                        [<option hidden key={0} value="Choose your college...">Choose your college...</option> ,
                            departmentList.map((department, index) => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))]
                    }
                </select>
            </div>
            <div>
                <select name="major" id="major-select"  onChange={handleMajorOnChange}>
                    {
                        selectedDepartmentId > 0 ?
                            [<option hidden value="Choose your major..." key={0}>Choose your major...</option> ,
                                departmentList[selectedDepartmentId-1].major.map((name, index) => (
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
        setLanguage(event.currentTarget.value);
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

function SignUp(){
    const {handleSubmit, register} = useForm();
    const [error, setError] = useState(null);

    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("12345");
    const [userVerificationCode, setUserVerificationCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [department, setDepartment] = useState("");
    const [major, setMajor] = useState("");
    const [language, setLanguage] = useState("");
    const [isFill, setIsFill] = useState(false);

    let departmentList = [
        {id: 1, name: 'College of Liberal Arts', major: ['Korean Language and Literature','English Language and Literature', 'German Literature', 'French Literature', 'Russian Language and Literature', 'Japanese Language and Literature', 'Chinese Language and Literature', 'Philosophy', 'History']},
        {id: 2, name: 'College of Social Sciences', major:['Political Science and International Relations','Public Service','Psychology','Library and Information Science','Social Welfare','Media and Communication','Urban Planning and Real Estate', 'Sociology']},
        {id: 3, name: 'College of Education', major: ['Education', 'Early Childhood Education', 'English Education', 'Physical Education']},
        {id: 4, name: 'College of Natural Sciences', major:['Physics', 'Chemistry', 'Life Science', 'Mathematics']},
        {id: 5, name: 'College of Biotechnology and Natural Resources', major:['Biological Resources Engineering', 'Food Engineering', 'Systems Biotechnology']},
        {id: 6, name: 'College of Engineering', major:['Civil & Environmental Engineering, Urban Design and Study', 'Architecture & Building Science', 'Chemical Engineering and Materials Science', 'Mechanical Engineering', 'Energy Systems Engineering', 'Advanced Materials Engineering']},
        {id: 7, name: 'College of ICT Engineering', major:['Electrical and Electronics Engineering', 'Integrative Engineering']},
        {id: 8, name: 'College of Software', major:['Software', 'AI']},
        {id: 9, name: 'College of Business & Economics', major:['Business Management', 'Economics', 'Applied Statistics', 'Advertising and Public Relations', 'International Logistics', 'Knowledge & Business Administration', 'Industrial Security']},
        {id: 10, name: 'College of Medicine', major:['Medicine']},
        {id: 11, name: 'College of Pharmacy', major: ['Pharmacy']},
        {id: 12, name: 'Red Cross College of Nursing', major:['Nursing']},
        {id: 13, name: 'College of Art', major:['Performance Video Creation(Seoul)', 'Performance Video Creation(Anseong)', 'Art', 'Design', 'Music', 'Traditional Art', 'Global Arts']},
        {id: 14, name: 'College of Art and Technology', major:['Computer Art']},
        {id: 15, name: 'College of Sport Sciences', major:['Sports Science']},
    ];

    const okBtnClick = (event) => {
        console.log(email, isVerified, password, passwordCheck, nickname, department, major, language);
        if(email === "" || isVerified === false || password !== passwordCheck || nickname==="" || department==="" || major==="" || language==="")
        {
            event.preventDefault();
            alert("Please fill out all the boxes");
            setIsFill(false);
        }
        else
        {
            alert("email: "+ email + "\n" + "nickname: "+nickname+"\n"+"major: "+department+" "+major+"\n"+"language: "+language+"\n");
            setIsFill(true);
        }

    }

    return(
        <form className='SignUp' >
            <div className='Title'>Sign Up</div>
                <div className='Fields'>
                    <EmailUpdate
                        email={email}
                        setEmail={setEmail}
                        setVerificationCode={setVerificationCode}
                        isVerified={isVerified}
                        verificationCode={verificationCode}
                        userVerificationCode={userVerificationCode}
                        setIsVerified={setIsVerified}
                        setUserVerificationCode = {setUserVerificationCode}/>

                    <NicknameUpdate
                        nickname={nickname}
                        setNickname={setNickname}/>

                    <PasswordUpdate
                        password={password}
                        setPassword={setPassword}
                        passwordCheck={passwordCheck}
                        setPasswordCheck={setPasswordCheck}
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
            {
                isFill?
                    <Link exact to="/" ><button type="submit" className='ok' onClick={okBtnClick}>OK</button></Link>
                    :
                    <Link to="/signUp"><button type="submit" className='ok' onClick={okBtnClick}>OK</button></Link>
            }

        </form>
    )
}

export default SignUp;