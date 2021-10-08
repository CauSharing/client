import React, {Component, useState } from 'react';
import { Link} from 'react-router-dom';
import './SignUp.css';
import '../components/checkEmail'
import checkCauEmail from "../components/checkEmail";

function EmailUpdate() {
    const [email, setEmail] = useState("");

    const handleChange = ({target: {value}}) => setEmail(value);

    const handleOnClick = (event) => {
      event.preventDefault();
      let message = "";
      if(!checkCauEmail(email))
          message = "Please write your Chungang university email!";
      else
      {
          message = "Verification code is sent to "+email+"\nPlease check your email.";
      }
      alert(message);
    };

    return (
        <div className='Field'>
            <div>
                <label htmlFor="email">Email</label>
            </div>
            <div>
                <input type="email" id="email" required value={email} onChange={handleChange}/>
            </div>
            <div>
                <button className="sendBtn" onClick={handleOnClick}>Send verification code</button>
            </div>
        </div>
    );
}

class VerificationField extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isVerified: false,
            userVerificationCode: ""
        };
    };

    handleOnClick = (e) => {
        e.preventDefault();
        const {verificationCode} = this.props;
        if(verificationCode === this.state.userVerificationCode || this.state.isVerified)
        {
            this.setState({isVerified: true});
            alert("Your email is verified!");
        }
        else
        {
            alert("Wrong verification code!");
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({userVerificationCode: e.target.value});
    }

    render(){
        let check = null;
        if(this.state.isVerified === true)
        {
            check = <img src={require("../icons/checked.png").default} alt="checked" />
        }
        else
        {
            check =<button type="submit"
                           className="checkBtn"
                           onClick={this.handleOnClick}>check</button>
        }

        return(
            <div className='Field'>
                <div>
                    <label htmlFor="verification">Verification code</label>
                </div>
                <div>
                    <input type="text" id="verification" required onChange={this.handleChange} value={this.state.userVerificationCode}/>
                </div>
                <div>
                    {check}
                </div>

            </div>
        );
    }
}

class NickNameField extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className='Field'>
                <div>
                    <label htmlFor="nickname">Nickname</label>
                </div>
                <div>
                    <input type="text" id="nickname" required value={this.props.nickname}/>
                </div>
                <div></div>
            </div>
        );
    }
}

class PasswordField extends Component{
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            passwordCheck: ""
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <div>
              <div className='Field'>
                  <div>
                      <label htmlFor='password'>Password</label>
                  </div>
                  <div>
                      <input type="password" id="password" name="password" required onChange={this.handleChange} value={this.state.password}/>
                  </div>
                  <div></div>
              </div>
                <div className='Field'>
                    <div>
                        <label htmlFor='password_check'>Check Password</label>
                    </div>
                    <div>
                        <input type="password" id="password_check" name="passwordCheck" required onChange={this.handleChange} value={this.state.passwordCheck}/>
                    </div>
                    <div>
                        {
                            (this.state.password !== "") ?
                                (this.state.passwordCheck !== this.state.password) ?
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
}
class MajorField extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedDepartment: 0
        }
    }
    handleOnChange = (e)  => {
        e.preventDefault();
        this.setState({
            selectedDepartment: e.target.value
        });
    }

    render(){
        const {department} = this.props;
        return(
            <div className='Field'>
                <div>
                    <label htmlFor="department-select">Major</label>
                </div>
                <div>
                    <select name="department" id="department-select" value={this.state.selectedDepartment} onChange={this.handleOnChange}>
                        {
                            [<option hidden value="">Choose your college...</option> ,
                                department.map((department, index) => (
                                <option value={department.id}>{department.name}</option>
                            ))]
                        }
                    </select>
                </div>
                <div>
                    <select name="major" id="major-select">
                        {
                            [<option hidden value="">Choose your major...</option> ,
                                department[this.state.selectedDepartment].major.map((name, index) => (
                                <option value={name}>{name}</option>
                            ))]
                        }
                    </select>
                </div>

            </div>
        )
    }
}

class LanguageField extends Component{
    constructor(props) {
        super(props);
        this.state = {
            language: ""
        };
    }
    handleSelect = (e) => {
        e.preventDefault();
        this.setState({
            language: e.target.value
        });
    }
    render(){
        return(
            <div className='Field'>
                <div>
                    <label htmlFor="language-select">Most comfortable language</label>
                </div>
                <div>
                    <select id="language-select" value={this.state.language} onSelect={this.handleSelect}>
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
        )
    }
}

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state={
            email: "",
            verificationCode: "",
            nickname: "",
            password: "",
            major: "",
            language: ""
        }
    }

    handleOnClick = () => {
        alert(
            "email: "+this.state.email+"\n"+
            "nickname: "+this.state.nickname +"\n" +
            "major: "+this.state.major + "\n" +
            "language: "+this.state.language+"\n" +
            "Signed up!!"
        );
    }

    handleSubmit = (e) => {

    }

    render(){
        const {verificationCode,department} = this.props;
        return(
            <form className='SignUp' onSubmit={this.handleSubmit}>
                <div className='Title'>Sign Up</div>
                <div className='Fields'>
                    {/*<EmailField />*/}
                    <EmailUpdate />
                    <VerificationField verificationCode={verificationCode}/>
                    <NickNameField />
                    <PasswordField />
                    <MajorField department={department}/>
                    <LanguageField />
                </div>
                <Link exact to="/"><button type="submit" className='ok' onClick={this.handleOnClick}>OK</button></Link>
            </form>

        );
    }
}

export default SignUp;