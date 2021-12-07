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
import { makeStyles } from '@material-ui/core/styles';

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

  const useStyles = makeStyles((theme) => ({
    notebook : {
        flexDirection: "row",
        [theme.breakpoints.down('xs')]:{
            flexDirection: "column",
        }
    },
    phone : {
        flexDirection: "column",
        [theme.breakpoints.down('xs')]:{
            flexDirection: "row",
        }
    }
  }));
  const useButtonStyles = makeStyles((theme) => ({
    notebook : {
        display: "block",
        [theme.breakpoints.down('xs')]:{
            display: "none",
        }
    },
    phone : {
        display: "none",
        [theme.breakpoints.down('xs')]:{
            display: "block",
        }
    }
}));

function EditGroupProfile(){
    const inputFile = useRef(null);

    const {groupIdx} = useParams();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const groupInfo = JSON.parse(localStorage.getItem('curGroup'));

    const [groupName, setGroupName] = useState(groupInfo.groupName);
    const [groupImg, setGroupImg] = useState(groupInfo.groupImg);
    const [groupUserList, setGroupUserList] = useState(groupInfo.groupUserList);
    
    // const [year, setYear] = useState(null);
    const token = localStorage.getItem("userToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const imageRegex = /.*\.(gif|jpe?g|bmp|png)$/igm;
    const classes = useStyles();
    const buttonClasses = useButtonStyles();

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
            if(res.data.result){
                console.log(res);
                alert("saved");

                localStorage.setItem('curGroup',JSON.stringify({
                    groupName:groupName, 
                    groupImg: groupImg, 
                    groupUserList: groupUserList, 
                    groupIdx:groupIdx
                }));

            }else{
                console.log(res);
                alert("error");
            }
            
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
        <Box sx={{display:"flex"}} className={classes.notebook}>
            <GroupSidebar diaryIdx={groupIdx}/>
            <Box sx={{width:"100%", padding: "20px"}}>
                <Box className={buttonClasses.notebook}>
                    <BackBtn nextLoc={`/home/diary/${groupIdx}/group-setting`}/>
                </Box>
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