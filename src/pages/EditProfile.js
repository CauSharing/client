import React, {useState, useRef} from "react";
import SideBar from "../components/SideBar";
import BackBtn from "../components/BackBtn";

import ImageIcon from '@mui/icons-material/Image';
import { Button ,Box, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from "axios";

// import { Editor } from '@toast-ui/react-editor';
import "./EditProfile.css";

const PictureBtn = styled(Button)({
    width: '100%',
    height: '400px',
    '&:hover': {
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#B5DEFF',
    }
  });


function EditProfile({departmentList}){
    const inputFile = useRef(null);
    const user = JSON.parse(window.localStorage.getItem('user'));

    const [nickname, setNickname] = useState(user.nickname);
    const [college, setCollege] = useState(user.department);
    const [major, setMajor] = useState(user.major);
    const [language, setLanguage] = useState(user.language);
    const [image, setImage] = useState(user.image);
    // const [year, setYear] = useState(null);
    const token = localStorage.getItem("userToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const imageRegex = /.*\.(gif|jpe?g|bmp|png)$/igm;

    const handleNicknameChange = (event) => {
        event.preventDefault();
        setNickname(event.target.value);
    }

    const handleCollegeChange = (event) => {
        event.preventDefault();
        setCollege(event.target.value);
    };

    const handleMajorChange = (event) => {
        event.preventDefault();
        setMajor(event.target.value);
    }

    const handleLanguageChange = (event) => {
        event.preventDefault();
        setLanguage(event.target.value);
    }

    const onButtonClick = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
      };

    const onChangeFile = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        console.log(file);

        let formData = new FormData();
        formData.append("file", file);

        await axios.post(
            `/api/upload`,
            formData,
            config,
            {
              header: { "content-type": "multipart/formdata" },
            }
        ).then(res => {
            console.log(res);
            setImage(res.data);
        }).catch(err => {
            console.log(err);
            alert("error");
        })



        
    }

    // const handleYearChange = (event) => {
    //     setYear(event.target.value);
    // }

    const handleSaveButton = (e) => {
        e.preventDefault();

        const data = {
            department: college,
            image: image,
            language: language,
            major: major,
            nickname: nickname
        };

        const headers = { 
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json"
            };

        axios.put(
            `/api/profile/update`,data, {headers}
            
        ).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            alert("error");
        });
        
        axios.get( `/api/profile/${user.email}`, config)
        .then(res => {
            console.log(res);
            if(res.data.result){
                window.localStorage.setItem("user", JSON.stringify(res.data.value));
            }
            else{
                alert("error!");
            }
        })
        .catch(err =>{
            console.log(err);
        });
    }
    return(
        <Box sx={{display:"flex"}}>
            <SideBar departmentList={departmentList} clickedMenuId={"3"} />
            <Box sx={{width:"100%", padding: "20px"}}>
                <BackBtn nextLoc={"/setting"}/>
                <Typography variant="h4" sx={{marginTop:"20px", borderBottom: "1px solid #7c7c7c", paddingBottom:"10px"}}>Edit Profile</Typography>
                <Box sx={{width:"100%", display:"flex"}}>
                    <Box sx={{width:"50%", borderRight:"1px solid #7c7c7c", padding: "10px"}}>
                        <input 
                            type='file' 
                            id='file' 
                            accept="image/png, image/jpeg, image/jpg"
                            ref={inputFile} 
                            style={{display: 'none'}}
                            onChange={onChangeFile}
                            />
                        {
                            imageRegex.test(image) && image !== user.image?
                            <Box>
                                <img src={`${image}`} alt="profile image" style={{maxWidth:"300px", maxHeight:"300px"}}/>
                            </Box>
                            :
                            <PictureBtn onClick={onButtonClick}>
                                <ImageIcon />
                                <Box>Choose profile image...</Box>
                            </PictureBtn>
                        }

                    </Box>
                    <Box sx={{width:"50%", padding:"10px"}}>
                        <Box sx={{marginBottom:"20px"}}>
                            <TextField
                                required
                                id="standard"
                                label="Nickname"
                                value={nickname}
                                onChange={handleNicknameChange}
                                variant="standard"
                                style={{marginBottom: "10px", fontFamily:"Roboto Condensed"}}
                                />
                        </Box>
                        <Box sx={{marginBottom:"20px"}}>
                            <FormControl variant="standard"sx={{minWidth: 300, marginBottom: 1,fontSize: 18, fontFamily:"Roboto Condensed"}} >
                                <InputLabel id="select-language">Language</InputLabel>
                                <Select
                                    labelId="select-language"
                                    value={language}
                                    label="Language"
                                    onChange={handleLanguageChange}
                                    >
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
                        <Box sx={{marginBottom:"20px"}}>
                            <FormControl fullWidth variant="standard" style={{marginBottom: "10px", fontFamily:"Roboto Condensed"}}>
                                <InputLabel id="demo-simple-select-label">College</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={college}
                                    label="College"
                                    onChange={handleCollegeChange}
                                    >
                                {
                                    departmentList.map(elem => 
                                        <MenuItem value={elem.name}>{elem.name}</MenuItem>)
                                }
                                
                                </Select>
                            </FormControl>
                            <FormControl fullWidth variant="standard" style={{marginBottom: "10px", fontFamily:"Roboto Condensed"}}>
                                <InputLabel id="demo-simple-select-label">Major</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={major}
                                    label="Major"
                                    onChange={handleMajorChange}
                                    >
                                {
                                    college === ""?
                                    null
                                    :
                                    departmentList.find(d => d.name === college).major.map((name, index) => (
                                        <MenuItem value={name}>{name}</MenuItem>
                                    ))
                                }
                                
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    
                </Box>
                <Box className="editProfile__saveBtn">
                    <Button variant="contained" style={{width: "200px"}} onClick={handleSaveButton}>Save</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default EditProfile;