import React, {Component } from 'react';
import { Link} from 'react-router-dom';
import './SignUp.css';

class EmailField extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isCodeSent: false
        };
    }

    handleSendCode = (e) => {
        e.preventDefault();
        alert("Verification code is sent to your email!\nPlease check your email.");
    }
    render(){
        return(
            <div className='Field'>
                <div>
                    <label htmlFor="email">Email</label>
                </div>
                <div>
                    <input type="email" id="email" required/>
                </div>
                <div>
                    <button type="submit" className="sendBtn" onClick={this.handleSendCode}>Send verification code</button>
                </div>
            </div>
        );
    }
}

class VerificationField extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            isVerified: false,
            verificationCode: "",
            userVerificationCode: ""
        };
    };

    handleOnClick = (e) => {
        e.preventDefault();
        this.setState({isClicked: true});

        if(this.state.verificationCode === this.state.userVerificationCode)
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
        if(this.state.isClicked === true && this.state.isVerified === true)
        {
            check = <img src={require("../icons/checked.png").default} alt="checked"/>
        }
        else
        {
            check =<button type="submit" className="checkBtn" value={this.state.userVerificationCode} onClick={(e) =>
                this.handleOnClick(e)
                }>check</button>
        }

        return(
            <div className='Field'>
                <div>
                    <label for="verification">Verification code</label>
                </div>
                <div>
                    <input type="text" id="verification" required onChange={this.handleChange}/>
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
        this.state = {
            nickname: "",
        }
    }
    render(){
        return(
            <div className='Field'>
                <div>
                    <label htmlFor="nickname">Nickname</label>
                </div>
                <div>
                    <input type="text" id="nickname" required value={this.state.nickname}/>
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
            <form>
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
            </form>
        );
    }
}
class MajorField extends Component{
    constructor(props) {
        super(props);
        this.state = {
            department: [
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
            ],
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
        return(
            <div className='Field'>
                <div>
                    <label htmlFor="department-select">Major</label>
                </div>
                <div>
                    <select name="department" id="department-select" value={this.state.selectedDepartment} onChange={this.handleOnChange}>
                        {
                            [<option hidden value="">Choose your college...</option> ,
                            this.state.department.map((department, index) => (
                                <option value={department.id}>{department.name}</option>
                            ))]
                        }
                    </select>
                </div>
                <div>
                    <select name="major" id="major-select">
                        {
                            [<option hidden value="">Choose your major...</option> ,
                            this.state.department[this.state.selectedDepartment].major.map((name, index) => (
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
    render(){
        return(
            <div className='Field'>
                <div>
                    <label htmlFor="language-select">Most comfortable language</label>
                </div>
                <div>
                    <select id="language-select">
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
    render(){
        return(
            <form className='SignUp'>
                <div className='Title'>Sign Up</div>
                <form className='Fields'>
                    <EmailField />
                    <VerificationField />
                    <NickNameField />
                    <PasswordField />
                    <MajorField />
                    <LanguageField />
                </form>
                <Link exact to="/"><button type="submit" className='ok'>OK</button></Link>
            </form>

        );
    }
}

export default SignUp;