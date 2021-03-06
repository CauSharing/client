import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import GroupSidebar from "../../components/GroupSidebar";
import { ListSubheader, List, ListItemButton, ListItemIcon, ListItemText, Box, 
    Typography ,DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, 
     Button, FormControl, TextField, CircularProgress} from "@mui/material";

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EditIcon from '@mui/icons-material/Edit';

import BackBtn from '../../components/BackBtn';

import { makeStyles } from '@material-ui/core/styles';

import axios from "axios";

const useStyles = makeStyles((theme) => ({
    notebook : {
        flexDirection: "row",
        [theme.breakpoints.down('sm')]:{
            flexDirection: "column",
        }
    },
    phone : {
        flexDirection: "column",
        [theme.breakpoints.down('sm')]:{
            flexDirection: "row",
        }
    }
}));

const useButtonStyles = makeStyles((theme) => ({
    notebook : {
        display: "block",
        [theme.breakpoints.down('sm')]:{
            display: "none",
        }
    },
    phone : {
        display: "none",
        [theme.breakpoints.down('sm')]:{
            display: "block",
        }
    }
}));


const AddGroupMemberDialog = ({open, setOpen}) => {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [seeResult, setSeeResult] = useState(false);
    const {groupIdx} = useParams();

    

    const handleClose = () => {
        setOpen(false);
        setSeeResult(false);
        setEmail('');
      };

    const handleChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handleOKClose = async (e) => {
        // e.preventDefault();
        
        await setLoading(true);

        const instance = axios.create({
            timeout: 30000,
          });
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        const data = {
            inviteRoomId: groupIdx,
            reciever: email
        };
        

        await instance.post(`/api/invite`,data, config)
        .then(res => {
        // console.log(res.data.value);
            setResult(res.data.description);
        })
        .catch(err =>{
            setResult(err);
        });     

        await setLoading(false);
        await setSeeResult(true);
    }

    return(
        <Dialog 
            open={open}
            onClose={handleClose}>
            <DialogTitle>Add Group Member by Email</DialogTitle>
            <DialogContent>
            {
                loading?
                <Box sx={{display:"flex", alignItems:"center"}}>
                    <CircularProgress size="2rem"/>
                    <Typography variant="body1" color="primary">Sending invitation...</Typography>
                </Box>
                :
                seeResult?
                <DialogContentText>
                    {result}
                </DialogContentText>
                :
                <>
                <DialogContentText>
                    Write your friend's email if you want to add him/her/them in this group.
                </DialogContentText>
                <FormControl sx={{margin:"5px 0px"}} fullWidth>
                <TextField
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={handleChange}
                    />
                </FormControl>
                </>
            }
            </DialogContent>
            <DialogActions>
                {
                    seeResult?
                    <Button onClick={handleClose}>Close</Button>
                    :
                    <>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleOKClose}>OK</Button>
                    </>
                }

            </DialogActions>
        </Dialog>
    )
}
function GroupSetting(){
    const {groupIdx} = useParams();
    const groupInfo = JSON.parse(localStorage.getItem('curGroup'));
    const [groupName, setGroupName] = useState(groupInfo.groupName);
    const [groupImg, setGroupImg] = useState(groupInfo.groupImg);
    const [groupUserList, setGroupUserList] = useState(groupInfo.groupUserList);

    const [openDialog, setOpenDialog] = useState(false);

    const buttonClasses = useButtonStyles();
    const classes = useStyles();

    const handleAddGroupMemberBtn = (e) => {
        e.preventDefault();
        setOpenDialog(true);
    };
    const handleEditProfileBtn = (e) => {
        e.preventDefault();
        window.location.replace(window.location.href+"/edit-group-profile");
    }

    return(
        <Box sx={{display:"flex", width: "100vw", height:"100vh"}} className={classes.notebook}>
            <AddGroupMemberDialog open={openDialog} setOpen={setOpenDialog}/>
            <GroupSidebar diaryIdx={groupIdx}/>
            <Box sx={{width: "100%", padding: "20px"}}>
                <Box className={buttonClasses.notebook}>
                    <BackBtn nextLoc={`/home/group/${groupIdx}`}/>
                </Box>
                <Box sx={{marginTop: "20px", paddingBottom: "10px", borderBottom: "1px solid #7c7c7c", width: "90%"}}>
                    <Typography variant="h4">Group Setting</Typography>
                </Box>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', fontFamily: 'Roboto Condensed'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    >
                    <ListItemButton onClick={handleAddGroupMemberBtn}>
                        <ListItemIcon>
                            <GroupAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Group Member" />
                    </ListItemButton>
                    <ListItemButton onClick={handleEditProfileBtn}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit group profile" />
                    </ListItemButton>
                </List>
                
            </Box>
        </Box>
    );
}

export default GroupSetting;