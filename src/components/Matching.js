import React, {useState} from "react";
import './Matching.css';

function Matching({ matchingSeen, departmentList, setMatchingSeen}){
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [language, setLanguage] = useState("");

    const handleDepartmentOnChange = (event) => {
        console.log(event.currentTarget.value);
        setSelectedDepartmentId(event.currentTarget.value);
    };
    const handleMajorOnChange = (event) => {
        event.preventDefault();
    };

    const handleMatchingBtnClick = (e) => {
        e.preventDefault();
    };
    const handleCloseBtnClick = (e) => {
        e.preventDefault();
        setMatchingSeen(false);
    };
        const handleOnChange = (event) => {
            event.preventDefault();
            setLanguage(event.target.value);
        };
    return(
        <form className={matchingSeen? "showMatching" : "hideMatching"}>
            <div>
                <button onClick={handleCloseBtnClick} className="matching__closeBtn">x</button>
            </div>
            <div className="matching__title">Find your friend</div>

            <label>Select the major you are interested in</label>
            <div className="matching__field">
                    <select name="department" id="department-select" onChange={handleDepartmentOnChange}>
                    {
                        [<option hidden key={0} value="Choose college...">Choose college...</option> ,
                            departmentList.map((department, index) => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))]
                    }
                    </select>
                    <select name="major" id="major-select"  onChange={handleMajorOnChange}>
                    {
                        selectedDepartmentId > 0 ?
                            [<option hidden value="Choose major..." key={0}>Choose major...</option> ,
                                departmentList[selectedDepartmentId-1].major.map((name, index) => (
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
    );
}

export default Matching;