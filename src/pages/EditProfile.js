import React, {useState} from "react";
import SideBar from "../components/SideBar";
import BackBtn from "../components/BackBtn";

import ImageIcon from '@mui/icons-material/Image';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    const [college, setCollege] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState(null);

    const handleCollegeChange = (event) => {
        setCollege(event.target.value);
    };

    const handleMajorChange = (event) => {
        setMajor(event.target.value);
    }

    const handleYearChange = (event) => {
        setYear(event.target.value);
    }

    return(
        <>
            <SideBar departmentList={departmentList} clickedMenuId={"3"} />
            <div className="entireEditProfile">
                <div className="editProfile__btn">
                    <BackBtn nextLoc={"/setting"}/>
                </div>
                <div className="editProfile__title">Edit Profile</div>
                <div className="editProfile__main">
                    <div className="editProfile__main__section">
                        <PictureBtn>
                            <ImageIcon />
                            <div>Choose profile image...</div>
                        </PictureBtn>
                    </div>
                    <div className="editProfile__main__section">
                        <div className="editProfile__main__section__part">
                            <TextField
                                required
                                id="standard"
                                label="ID"
                                // defaultValue="Hello World"
                                variant="standard"
                                style={{marginBottom: "10px"}}
                                />
                            <TextField
                                id="standard-password-input"
                                required={true}
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                style={{marginBottom: "10px"}}
                                />
                        </div>
                        <div className="editProfile__main__section__part">
                            <FormControl fullWidth variant="standard" style={{marginBottom: "10px"}}>
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
                            <FormControl fullWidth variant="standard" style={{marginBottom: "10px"}}>
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
                            <FormControl fullWidth variant="standard" style={{marginBottom: "10px"}}>
                                <InputLabel id="demo-simple-select-label">Admission year</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={year}
                                    label="Admission year"
                                    onChange={handleYearChange}
                                    >
                                    <MenuItem value={2011}>{2011}</MenuItem>
                                    <MenuItem value={2012}>{2012}</MenuItem>
                                    <MenuItem value={2013}>{2013}</MenuItem>
                                    <MenuItem value={2014}>{2014}</MenuItem>
                                    <MenuItem value={2015}>{2015}</MenuItem>
                                    <MenuItem value={2016}>{2016}</MenuItem>
                                    <MenuItem value={2017}>{2017}</MenuItem>
                                    <MenuItem value={2018}>{2018}</MenuItem>
                                    <MenuItem value={2019}>{2019}</MenuItem>
                                    <MenuItem value={2020}>{2020}</MenuItem>
                                    <MenuItem value={2021}>{2021}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="editProfile__main__section__part">
                            <TextField
                                id="standard"
                                label="email"
                                // defaultValue="Hello World"
                                variant="standard"
                                />
                            <Button variant="contained" style={{marginLeft: "5px"}}>Verify email</Button>
                        </div>
                    </div>
                    
                </div>
                <div className="editProfile__saveBtn">
                    <Button variant="contained" style={{width: "200px"}}>Save</Button>
                </div>
            </div>
        </>
    );
}

export default EditProfile;