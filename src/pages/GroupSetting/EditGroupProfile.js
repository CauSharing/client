import React,{useRef, useState} from "react";
import { useParams } from "react-router-dom";

import { ListSubheader, List, ListItemButton, ListItemIcon, ListItemText, Box, 
    Typography ,DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, 
     Button, FormControl, TextField, CircularProgress} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';

import GroupSidebar from "../../components/GroupSidebar";
import BackBtn from "../../components/BackBtn";

import axios from 'axios';


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



function EditGroupProfile(){
    const inputFile = useRef(null);

    const {groupIdx} = useParams();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const groupInfo = JSON.parse(localStorage.getItem('curGroup'));

    const [groupName, setGroupName] = useState(groupInfo.groupName);
    const [groupImg, setGroupImg] = useState(groupInfo.groupImg);
    // const [year, setYear] = useState(null);
    const token = localStorage.getItem("userToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const imageRegex = /.*\.(gif|jpe?g|bmp|png)$/igm;


    const handleGroupNameChange = (event) => {
        event.preventDefault();
        setGroupName(event.target.value);
    }

    const handleSaveButton = (e) => {
        e.preventDefault();

        const data = {
            "matchingRoomId": groupIdx,
            "matchingRoomImage": groupImg,
            "matchingRoomName": groupName
          };
        

        const headers = { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
            };

        axios.post(
            `/api/updateRoom`,data, {headers}
            
        ).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            alert("error");
        })       
    }
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
            setGroupImg(res.data);
        }).catch(err => {
            console.log(err);
            alert("error");
        })
    }

    const onButtonClick = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
      };


    return(
        <Box sx={{display:"flex"}}>
            <GroupSidebar diaryIdx={groupIdx}/>
            <Box sx={{width:"100%", padding: "20px"}}>
                <BackBtn nextLoc={"/setting"}/>
                <Typography variant="h4" sx={{marginTop:"20px", borderBottom: "1px solid #7c7c7c", paddingBottom:"10px"}}>Edit Group Profile</Typography>
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
                            imageRegex.test(groupImg) && groupImg !== groupInfo.groupImg?
                            <Box>
                                <img src={`${groupImg}`} alt="profile image" style={{maxWidth:"300px", maxHeight:"300px"}}/>
                            </Box>
                            :
                            <PictureBtn onClick={onButtonClick}>
                                <ImageIcon />
                                <Box>Choose Group Image...</Box>
                            </PictureBtn>
                        }

                    </Box>
                    <Box sx={{width:"50%", padding:"10px"}}>
                        <Box sx={{marginBottom:"20px"}}>
                            <TextField
                                required
                                id="standard"
                                label="Group name"
                                value={groupName}
                                onChange={handleGroupNameChange}
                                variant="standard"
                                style={{marginBottom: "10px", fontFamily:"Roboto Condensed"}}
                                />
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

export default EditGroupProfile;