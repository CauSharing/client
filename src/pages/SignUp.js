import React, {useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';
import './SignUp.css';
import {checkCauEmail, checkEmail} from "../util/checkEmail";
import axios from "axios";

import { InputLabel,MenuItem,FormControl ,Select, TextField, Box, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

import BackBtn from "../components/BackBtn";

import Puang from "../icons/νΈμ_μν¬.png"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { makeStyles } from '@material-ui/core/styles';

const useImgStyles = makeStyles((theme) => ({
    notebook : {
        width: "50%", display:"flex", alignItems:"end", justifyContent:"end", padding: "40px",
        [theme.breakpoints.down('sm')]:{
            display:"none"
        }
    }
}));

const useFormStyles = makeStyles((theme) => ({
    notebook : {
        marginTop:'10px', display:"flex", alignItems:"center",flexDirection:"row",width:"100%",
        [theme.breakpoints.down('sm')]:{
            marginTop:'10px', display:"flex",flexDirection:"column",width:"100%",alignItems:"start"
        }
    }
}));

const useButtonStyles = makeStyles((theme) => ({
    notebook: {
        display:"block",
        [theme.breakpoints.down('sm')]:{
            display:"none"
        }
    },
    phone: {
        display: "none",
        [theme.breakpoints.down('sm')]:{
            display:"block"
        }
    }
}))
function EmailUpdate({email, setEmail, isVerified, setIsVerified, topEmailError, topVerifiedError}){
    const [userVerificationCode, setUserVerificationCode] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [isVerificationCodeError, setIsVerficationCodeError] = useState(false);
    const [isVerificationCodeLoading, setIsVerificationCodeLoading] = useState(false);

    const buttonClasses = useButtonStyles();

    const CustomEmailLoadingBtn = styled(LoadingButton)({
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginLeft: "10px",
        height: '40px',
        fontSize: "14px",
        background: isEmailLoading? "#E9E9E9": "#0148A0",
        color: "#FFFFFF",
        fontFamily:"Roboto Condensed",
        '&:hover': {
            backgroundColor: '#4892d2',
            boxShadow: 'none',
        },
        
    });

    const PhoneCustomEmailLoadingBtn = styled(LoadingButton)({
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginLeft: "10px",
        height: '40px',
        fontSize: "10px",
        background: isEmailLoading? "#E9E9E9": "#0148A0",
        color: "#FFFFFF",
        fontFamily:"Roboto Condensed",
        '&:hover': {
            backgroundColor: '#4892d2',
            boxShadow: 'none',
        },
        
    });
    
    const CustomVerificationCodeLoadingBtn = styled(LoadingButton)({
        marginLeft: "10px",
        height: '40px',
        fontSize: "14px",
        backgroundColor: isVerificationCodeLoading? "#E9E9E9": (isVerified? "transparent": "#0148A0"),
        color: "#FFFFFF",
        fontFamily:"Roboto Condensed",
        '&:hover': {
            backgroundColor: '#4892d2',
            boxShadow: 'none',
        },
        
    });
    const [verificationCodeHelperText, setVerificationCodeHelperText] = useState("");

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handleEmailOnClick = async (event) => {
        // event.preventDefault();
        await setIsEmailLoading(true);
        if(!checkCauEmail(email))
        {
            setIsEmailError(true);
            setIsVerified(false);
        }
        else
        {
            await axios.get(`/api/email`, {params: {email: email}})
                .then(res => {
                    if(res.data.result === true)
                    {
                        setIsEmailError(false);
                        setIsVerified(false);
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
                    setIsEmailError(true);
                    setIsVerified(false);
                    console.log(err);
                });
        }
        await setIsEmailLoading(false);
    };

    const handleUserVerificationCodeChange = ({target: {value}}) => setUserVerificationCode(value);

    const handleVerificationCodeOnClick = async (event) => {
        await setIsVerificationCodeLoading(true);

        await axios.get(`/api/verify`, {params: {email: email, code: userVerificationCode}})
        .then(res => {
            if(res.data.result === true)
            {
                setVerificationCodeHelperText("");
                setIsVerficationCodeError(false);
                setIsVerified(true);
            }
            else
            {
                throw res.data.description;
            }
        })
        .catch(err =>{
            // if(err.substr(0, 12) === "μ΄λ©μΌ μΈμ¦μ ν΄μ£ΌμΈμ"){         
            //     setVerificationCodeHelperText("Please write your email and press 'send verification code' button first");
            // }
            // else{
            //     setVerificationCodeHelperText("Wrong verification code");
            // }
            setVerificationCodeHelperText("Wrong verification code");
            setIsVerficationCodeError(true);
            setIsVerified(false);
        });

        await setIsVerificationCodeLoading(false);
    }

    return(
        <Box sx={{marginTop:"10px"}}>
            <Box
                sx={{display:"flex", alignItems:"center", height: "60px"}}>
                <TextField
                    label="Email"
                    type="email"
                    variant="standard"
                    onChange={handleEmailChange}
                    required
                    value={email}
                    helperText={isEmailError || (checkEmail(email) && !checkCauEmail(email))? "Write Chungang univ. email": null}
                    error={topEmailError || isEmailError || (checkEmail(email) && !checkCauEmail(email))}
                    disabled={isEmailLoading}
                    sx={{minWidth: "300px"}}
                    />
                <CustomEmailLoadingBtn 
                    className={buttonClasses.notebook}
                    loading={isEmailLoading}
                    disabled={isEmailLoading}
                    onClick={handleEmailOnClick}>
                        Send verification code
                </CustomEmailLoadingBtn>
                <PhoneCustomEmailLoadingBtn 
                    className={buttonClasses.phone}
                    loading={isEmailLoading}
                    disabled={isEmailLoading}
                    onClick={handleEmailOnClick}>
                        Send code
                </PhoneCustomEmailLoadingBtn>
            </Box>
            <Box
                sx={{display:"flex", alignItems:"center", height: "60px"}}>
                <TextField
                    label="Verification code"
                    variant="standard"
                    type="password"
                    onChange={handleUserVerificationCodeChange}
                    required
                    helperText={verificationCodeHelperText}
                    error={topVerifiedError || isVerificationCodeError}
                    disabled={isVerificationCodeLoading || isVerified}
                    sx={{minWidth: "300px"}}
                    />
                
                <CustomVerificationCodeLoadingBtn
                    loading={isVerificationCodeLoading}
                    disabled={isVerificationCodeLoading || isVerified}
                    onClick={handleVerificationCodeOnClick}>
                         
                    {isVerified? <CheckCircleIcon sx={{color: "#4E9F3D"}}/>: "Check"}
                </CustomVerificationCodeLoadingBtn>
            </Box>
        </Box>
    );
}



function NicknameUpdate({nickname, setNickname, topNicknameError}){
    const handleNicknameChange = ({target: {value}}) => setNickname(value);

    return(
        <Box sx={{marginTop:"10px",  height: "60px", display:"flex", alignItems:"center"}}>
            <TextField
            label="Nickname"
            variant="standard"
            onChange={handleNicknameChange}
            required
            helperText={nickname.indexOf(' ')>= 0 ? "should not contain blank" : nickname.length < 2? "more than 2 letters": null}
            error={nickname.indexOf(' ')>=0 || topNicknameError}
            sx={{minWidth: "300px"}}
            />
        </Box>
    );
}

function PasswordUpdate({password, setPassword, passwordCheck, setPasswordCheck, checkPassword, topPasswordError, topPasswordCheckError}){
    const [isValid, setIsValid] = useState(false);

    const handlePasswordChange = ({target: {value}}) => {
        setPassword(value);
        setIsValid(checkPassword(value));
    }
    const handlePasswordCheckChange = ({target: {value}}) => {
        setPasswordCheck(value);
    };

    return(
        <Box sx={{marginTop:'10px'}}>
            <Box sx={{ marginBottom: "10px", height: "60px", display:"flex", alignItems:"center"}}>
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    onChange={handlePasswordChange}
                    required
                    helperText={"contain at least one special character, number and 6 to 16 letters"}
                    error={(!isValid && password!=="") || topPasswordError}
                    sx={{minWidth: "300px"}}
                    />
            </Box>
            <Box sx={{ height: "60px", display:"flex", alignItems:"center"}}>
                <TextField
                    label="Password Check"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    onChange={handlePasswordCheckChange}
                    required
                    error={topPasswordCheckError || topPasswordError}
                    sx={{minWidth: "300px"}}
                    />
                {
                    password === passwordCheck && password !== ""? <CheckCircleIcon sx={{color:"#4E9F3D"}} /> : null
                }
            </Box>
        </Box>
    );
}

function MajorUpdate({departmentList, department, setDepartment, major, setMajor, topDepartmentError, topMajorError}){
    const [departmentId, setDepartmentId] = useState(null);

    const formClasses = useFormStyles();

    const handleDepartmentOnChange = async (event) => {
        event.preventDefault();
        setDepartment(event.target.value);
        setDepartmentId(parseInt(departmentList.find(elem => elem.name === event.target.value).id));
    };

    const handleMajorOnChange = (event) => {
        event.preventDefault();
        setMajor(event.target.value);
    };

    return(
        <Box className={formClasses.notebook}>
            <FormControl variant="standard" sx={{minWidth: 300, marginRight:1,  fontSize: 18, fontFamily:"Roboto Condensed"}}>
                <InputLabel id="select-college">College</InputLabel>
                <Select
                    labelId="select-college"
                    value={department}
                    label="College"
                    onChange={handleDepartmentOnChange}
                    required
                    error={topDepartmentError}
                >
                {
                    departmentList.map(department => 
                        <MenuItem value={department.name}>{department.name}</MenuItem>
                    )
                }
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{minWidth: 300, fontSize: 18, fontFamily:"Roboto Condensed"}}>
                <InputLabel id="select-major">Major</InputLabel>
                <Select
                    labelId="select-major"
                    value={major}
                    label="Major"
                    onChange={handleMajorOnChange}
                    required
                    error={topMajorError}
                >
                {
                    department === ""?
                    null
                    :
                    departmentList[departmentId-1].major.map((name, index) => (
                        <MenuItem value={name}>{name}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        </Box>
    );
}

function LanguageUpdate({language, setLanguage, topLanguageError}){
    const handleLanguageChange = (event) => {
        event.preventDefault();
        setLanguage(event.target.value);
    };
    return(
        <Box sx={{ display:"flex", alignItems:"center",marginTop:'10px'}}>
        <FormControl variant="standard"sx={{minWidth: "200px", marginBottom: 1,fontSize: 18, fontFamily:"Roboto Condensed"}} >
        <InputLabel id="select-language">Most comfortable language</InputLabel>
        <Select
            labelId="select-language"
            value={language}
            label="Language"
            onChange={handleLanguageChange}
            required
            error={topLanguageError}>
            <MenuItem value="AF">Afrikaans</MenuItem>
            <MenuItem value="SQ">Albanian</MenuItem>
            <MenuItem value="AR">Arabic</MenuItem>
            <MenuItem value="HY">Armenian</MenuItem>
            <MenuItem value="EU">Basque</MenuItem>
            <MenuItem value="BN">Bengali</MenuItem>
            <MenuItem value="BG">Bulgarian</MenuItem>
            <MenuItem value="CA">Catalan</MenuItem>
            <MenuItem value="KM">Cambodian</MenuItem>
            <MenuItem value="ZH">Chinese (Mandarin)</MenuItem>
            <MenuItem value="HR">Croatian</MenuItem>
            <MenuItem value="CS">Czech</MenuItem>
            <MenuItem value="DA">Danish</MenuItem>
            <MenuItem value="NL">Dutch</MenuItem>
            <MenuItem value="EN">English</MenuItem>
            <MenuItem value="ET">Estonian</MenuItem>
            <MenuItem value="FJ">Fiji</MenuItem>
            <MenuItem value="FI">Finnish</MenuItem>
            <MenuItem value="FR">French</MenuItem>
            <MenuItem value="KA">Georgian</MenuItem>
            <MenuItem value="DE">German</MenuItem>
            <MenuItem value="EL">Greek</MenuItem>
            <MenuItem value="GU">Gujarati</MenuItem>
            <MenuItem value="HE">Hebrew</MenuItem>
            <MenuItem value="HI">Hindi</MenuItem>
            <MenuItem value="HU">Hungarian</MenuItem>
            <MenuItem value="IS">Icelandic</MenuItem>
            <MenuItem value="ID">Indonesian</MenuItem>
            <MenuItem value="GA">Irish</MenuItem>
            <MenuItem value="IT">Italian</MenuItem>
            <MenuItem value="JA">Japanese</MenuItem>
            <MenuItem value="JW">Javanese</MenuItem>
            <MenuItem value="KO">Korean</MenuItem>
            <MenuItem value="LA">Latin</MenuItem>
            <MenuItem value="LV">Latvian</MenuItem>
            <MenuItem value="LT">Lithuanian</MenuItem>
            <MenuItem value="MK">Macedonian</MenuItem>
            <MenuItem value="MS">Malay</MenuItem>
            <MenuItem value="ML">Malayalam</MenuItem>
            <MenuItem value="MT">Maltese</MenuItem>
            <MenuItem value="MI">Maori</MenuItem>
            <MenuItem value="MR">Marathi</MenuItem>
            <MenuItem value="MN">Mongolian</MenuItem>
            <MenuItem value="NE">Nepali</MenuItem>
            <MenuItem value="NO">Norwegian</MenuItem>
            <MenuItem value="FA">Persian</MenuItem>
            <MenuItem value="PL">Polish</MenuItem>
            <MenuItem value="PT">Portuguese</MenuItem>
            <MenuItem value="PA">Punjabi</MenuItem>
            <MenuItem value="QU">Quechua</MenuItem>
            <MenuItem value="RO">Romanian</MenuItem>
            <MenuItem value="RU">Russian</MenuItem>
            <MenuItem value="SM">Samoan</MenuItem>
            <MenuItem value="SR">Serbian</MenuItem>
            <MenuItem value="SK">Slovak</MenuItem>
            <MenuItem value="SL">Slovenian</MenuItem>
            <MenuItem value="ES">Spanish</MenuItem>
            <MenuItem value="SW">Swahili</MenuItem>
            <MenuItem value="SV">Swedish </MenuItem>
            <MenuItem value="TA">Tamil</MenuItem>
            <MenuItem value="TT">Tatar</MenuItem>
            <MenuItem value="TE">Telugu</MenuItem>
            <MenuItem value="TH">Thai</MenuItem>
            <MenuItem value="BO">Tibetan</MenuItem>
            <MenuItem value="TO">Tonga</MenuItem>
            <MenuItem value="TR">Turkish</MenuItem>
            <MenuItem value="UK">Ukrainian</MenuItem>
            <MenuItem value="UR">Urdu</MenuItem>
            <MenuItem value="UZ">Uzbek</MenuItem>
            <MenuItem value="VI">Vietnamese</MenuItem>
            <MenuItem value="CY">Welsh</MenuItem>
            <MenuItem value="XH">Xhosa</MenuItem>
        </Select>
    </FormControl>
    </Box>
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

    const [isLoading, setIsLoading] = useState(false);

    const [isEmailError, setIsEmailError] = useState(false);
    const [isVerifiedError, setIsVerifiedError] = useState(false);
    const [isNicknameError, setIsNicknameError] = useState(false);
    const [isPassowrdError, setIsPasswordError] = useState(false);
    const [isPasswordCheckError, setIsPasswordCheckError] = useState(false);
    const [isDepartmentError, setIsDepartmentError] = useState(false);
    const [isMajorError, setIsMajorError] = useState(false);
    const [isLanguageError, setIsLanguageError] = useState(false);

    const imgClasses = useImgStyles();

    const CustomOKLoadingBtn = styled(LoadingButton)({
        marginTop: '10px',
        maxWidth: "300px",
        height: "40px",
        fontSize: "14px",
        backgroundColor: isLoading? "#E9E9E9": "#0148A0",
        color: "#FFFFFF",
        fontFamily:"Roboto Condensed",
        '&:hover': {
            backgroundColor: '#4892d2',
            boxShadow: 'none',
        },
        
    });

    const checkVar = async () => {
        await setIsEmailError(email === "" || !checkCauEmail(email));
        await setIsVerifiedError(!isVerified);
        await setIsPasswordError(!checkPassword(password) || password==="");
        await setIsPasswordCheckError(password !== passwordCheck);
        await setIsNicknameError(nickname === "" || nickname.indexOf(' ')>=0 || nickname.length < 2);
        await setIsDepartmentError(department==="");
        await setIsMajorError(major === "");
        await setIsLanguageError(language==="");

        if(isEmailError || isVerifiedError || isPassowrdError || isPasswordCheckError || isNicknameError || isDepartmentError || isMajorError || isLanguageError){
            return false;
        }else{
            return true;
        }
    }

    const checkPassword = (password) => {
        if(password.indexOf(' ') >= 0)
        {
            return false;
        }
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if(!regularExpression.test(password)){
            return false;
        }
        return true;
    }

    const okBtnClick = async (event) => {
        await setIsLoading(true);
        
        if(!checkVar())
        {
            event.preventDefault();
            alert("Please check your input again");
        }
        else
        {
            const instance = axios.create({
                timeout: 30000,
              });
            // alert("email: "+ email + "\n" + "nickname: "+nickname+"\n"+"major: "+department+" "+major+"\n"+"language: "+language+"\n");
            await instance.post("/api/register", {confirmPw: passwordCheck,
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
        await setIsLoading(false);
    }

    return(
        <Box sx={{width: "100%",  height: "100vh",display:"flex" , background: "linear-gradient(rgba(107, 190, 226, 0.2) 90%, #FFFFFF 10%)"}}>

        <Box sx={{width: "50%", padding: "40px 40px 40px 80px", display:"flex", flexDirection:"column"}}>
                
            <Box sx={{width:"90%", borderBottom:"1px solid black", display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
                <BackBtn nextLoc={"/"} >
                    <ArrowBackIcon sx={{margin:"0px", padding:"0px"}}/>
                </BackBtn>
                <div className="signup__title">Sign Up</div>
            </Box>
            <EmailUpdate
                email={email}
                setEmail={setEmail}
                isVerified={isVerified}
                setIsVerified={setIsVerified}
                topEmailError={isEmailError}
                topVerifiedError={isVerifiedError}/>

            <NicknameUpdate
                nickname={nickname}
                setNickname={setNickname}
                topNicknameError={isNicknameError}/>

            <PasswordUpdate
                password={password}
                setPassword={setPassword}
                passwordCheck={passwordCheck}
                setPasswordCheck={setPasswordCheck}
                checkPassword={checkPassword}
                topPasswordError={isPassowrdError}
                topPasswordCheckError={isPasswordCheckError}
                />

            <MajorUpdate
                departmentList={departmentList}
                department={department}
                setDepartment={setDepartment}
                major={major}
                setMajor={setMajor} 
                topDepartmentError={isDepartmentError}
                topMajorError={isMajorError}/>

            <LanguageUpdate
                language={language}
                setLanguage={setLanguage} 
                topLanguageError={isLanguageError}/>
            <CustomOKLoadingBtn 
                loading={isLoading}
                disabled={isLoading}
                onClick={okBtnClick}
                >OK</CustomOKLoadingBtn>
        </Box>
        <Box className={imgClasses.notebook}>
            <img src={Puang} alt="puang wink" style={{width:"50%"}}/>
        </Box>
        </Box>
    )
}

export default SignUp;