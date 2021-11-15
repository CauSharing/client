import React, {useState, useMemo, useEffect} from "react";
import axios from "axios";
import BackBtn from "./BackBtn";
import './Matching.css';

import { Box, Button, LinearProgress  ,InputLabel,MenuItem,FormControl ,Select, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)({
    width: '201px',
    height: '48px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '18px',
    padding: '10px',
    lineHeight: 1.5,
    color: 'white',
    backgroundColor: '#3181C6',
    borderColor: '#0063cc',
    fontFamily: 'Roboto Condensed',
    marginTop: '40px',
    '&:hover': {
      backgroundColor: '#4892d2',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#4892d2',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });


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

function MatchingLoading(){
    return(
        <div className="matching__loading">
        {/* <Box sx={{width: 300}}>
            <LinearProgress />
        </Box> */}
            <div className="matching__loading__desc">
                <span>We are looking for a friend you would like</span>
                <span className="dot1">.</span>
                <span className="dot2">.</span>
                <span className="dot3">.</span>
            </div>      
    </div>
    );
}
function Matching({departmentList, setShowAddFriend, showAddFriend}){
    const [department, setDepartment] = useState("");
    const [departmentId, setDepartmentId] = useState(null);
    const [major, setMajor] = useState("");
    const [language, setLanguage] = useState("");
    const [matchingResult, setMatchingResult] = useState("");
    const [showMatchingResult, setShowMatchingResult] = useState(false);

    const [showMatchingLoading, setShowMatchingLoading] = useState(false);

    const handleDepartmentOnChange = async (event) => {
        // event.preventDefault();
        setDepartment(event.target.value);
        setDepartmentId(parseInt(departmentList.find(elem => elem.name === event.target.value).id));
    };

    const handleMajorOnChange = (event) => {
        // event.preventDefault();
        setMajor(event.target.value);
    };

    const handleLanguageChange = (event) => {
        // event.preventDefault();
        setLanguage(event.target.value);
    };

    const handleCloseBtn = (e) => {
        // e.preventDefault();
        setShowAddFriend(false);
    }

    const handleMatchingBtnClick = async (e) => {
        // e.preventDefault();
        const data = {
            "college": department,
            "language": language,
            "major": major
        };

        setShowMatchingLoading(true);

        const token = localStorage.getItem("userToken");
        const config = {
            timeout: 3000,
            headers: { Authorization: `Bearer ${token}` }
        };

         axios.post('/api/matching',data, config)
            .then(res => {
                console.log(res);
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

        setShowMatchingLoading(false);
        setShowMatchingResult(true);
    };

    return(
        <Dialog 
            open={showAddFriend} 
            onClose={(e, reason) => {
                if(!(showMatchingLoading)){
                    e.preventDefault(); 
                    setShowAddFriend(false);
                }}}>
        {/* <div className="matchingBox"> */}
            {/* <BackBtn setShowContents={setShowAddFriend}/> */}
            <DialogTitle sx={{display:"flex", justifyContent:"center", fontSize: 25, fontFamily:"Roboto Condensed"}}>Add Friend</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                {
                showMatchingResult ?
                <MatchingResult showMatchingResult={showMatchingResult} description={matchingResult} setShowMatchingResult={setShowMatchingResult}/>
                :
                showMatchingLoading?
                <MatchingLoading />
                :
                <>
                    <FormControl variant="standard" sx={{minWidth: 300,  marginBottom: 1, fontSize: 18, fontFamily:"Roboto Condensed"}}>
                        <InputLabel id="select-college">College</InputLabel>
                        <Select
                            labelId="select-college"
                            value={department}
                            label="College"
                            onChange={handleDepartmentOnChange}
                        >
                        {
                            departmentList.map(department => 
                                <MenuItem value={department.name}>{department.name}</MenuItem>
                            )
                        }
                        </Select>
                    </FormControl>
                <FormControl variant="standard" sx={{minWidth: 300, marginBottom: 1, fontSize: 18, fontFamily:"Roboto Condensed"}}>
                        <InputLabel id="select-major">Major</InputLabel>
                        <Select
                            labelId="select-major"
                            value={major}
                            label="Major"
                            onChange={handleMajorOnChange}
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
                <FormControl variant="standard"sx={{minWidth: 300, marginBottom: 1,fontSize: 18, fontFamily:"Roboto Condensed"}} >
                        <InputLabel id="select-language">Language</InputLabel>
                        <Select
                            labelId="select-language"
                            value={language}
                            label="Language"
                            onChange={handleLanguageChange}>
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
                </>
            }
                </DialogContentText>
                <DialogActions sx={{display:"flex", justifyContent: "center"}}>
                {
                    showMatchingResult ?
                    <ColorButton className="matching__btn" onClick={handleCloseBtn}>Close</ColorButton>
                    :
                    showMatchingLoading?
                    null
                    :
                    <ColorButton className="matching__btn" onClick={handleMatchingBtnClick}>Start Matching</ColorButton>
                }
                
                </DialogActions>
            </DialogContent>
            {/* <div className="matching__title">Find your friend</div> */}
            


         {/* </div> */}
        </Dialog>
    );
}

export default Matching;