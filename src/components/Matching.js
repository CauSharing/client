import React, {useState, useEffect} from "react";
import axios from "axios";
import BackBtn from "./BackBtn";
import './Matching.css';

function MatchingResult({showMatchingResult, description, setShowMatchingResult}){
    const handleCloseBtnClick = (e) => {
        e.preventDefault();
        setShowMatchingResult(false);
    };
    return(
        <div className={showMatchingResult? "showMatching" : "hideMatching"}>
            <div className="matchingResult__desc">{description}</div>
        </div>
    );
}
function Matching({departmentList, setShowAddFriend}){
    const [department, setDepartment] = useState("");
    const [departmentId, setDepartmentId] = useState(null);
    const [major, setMajor] = useState("");
    const [language, setLanguage] = useState("");
    const [matchingResult, setMatchingResult] = useState("");
    const [showMatchingResult, setShowMatchingResult] = useState(false);

    const handleDepartmentOnChange = (event) => {
        event.preventDefault();
        setDepartment(event.target.value);
        setDepartmentId(parseInt(departmentList.find(elem => elem.name === event.target.value).id));
    };

    const handleMajorOnChange = (event) => {
        event.preventDefault();
        setMajor(event.target.value);
    };

    const httpInstance = axios.create({
        baseURL: []
    })

    const handleMatchingBtnClick = (e) => {
        e.preventDefault();
        const data = {
            "college": department,
            "language": language,
            "major": major
        };

        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

         axios.post('/api/matching',data, config)
            .then(res => {
                if(res.data.result === false)
                {
                    console.log(res.data.description);
                }
                else
                    setMatchingResult(res.data.description);
                })
            .catch(err =>{
                    console.log(err);
                });

        setShowMatchingResult(true);
    };

    const handleOnChange = (event) => {
        event.preventDefault();
        setLanguage(event.target.value);
    };

    return(
    <div className="matchingBox">
        <BackBtn setShowContents={setShowAddFriend}/>
        <div className="matching__title">Find your friend</div>
        {
            showMatchingResult ?
            <MatchingResult showMatchingResult={showMatchingResult} description={matchingResult} setShowMatchingResult={setShowMatchingResult}/>
            :
            <form className="matching">
                        <label>Select the major you are interested in</label>
                        <div className="matching__field">
                                <select name="department" id="department-select" onChange={handleDepartmentOnChange}>
                                {
                                    [<option hidden key={0} value="Choose college...">Choose college...</option> ,
                                        departmentList.map((department, index) => (
                                            <option key={department.id} value={department.name}>{department.name}</option>
                                        ))]
                                }
                                </select>
                                <select name="major" id="major-select"  onChange={handleMajorOnChange}>
                                {
                                    department !== "" ?
                                        [<option hidden value="Choose major..." key={0}>Choose major...</option> ,
                                            departmentList[departmentId-1].major.map((name, index) => (
                                                <option key={index+1} value={name}>{name}</option>
                                            ))]
                                        :
                                        <option hidden value="Choose your major..." key={0}>Choose major...</option>
                                }
                                </select>
                        </div>
                        <label>Select the language you want to learn</label>
                        <div className="matching__field">
                        <select id="language-select" value={language} onChange={handleOnChange}>
                                            <option value="Choose language..." hidden>Choose language...</option>
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
                        <button className="matching__btn" onClick={handleMatchingBtnClick}>Start Matching</button>
                    </form>
        }


        </div>
    );
}

export default Matching;