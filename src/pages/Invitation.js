import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import SideBar from "../components/SideBar";
import BackBtn from "../components/BackBtn";

import {Box, Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CircularProgress from '@mui/material/CircularProgress';

import "./invitation.css";

import { makeStyles } from '@material-ui/core/styles';


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



function Alert({open, handleYes, handleNo, isAccept, nickname, isFromMatchingRoom}){
    return(
        <Dialog
            open={open}
            onClose={handleNo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {
                isAccept?
                    isFromMatchingRoom?
                    `Join ${nickname}'s group?`
                    :
                    `Accept ${nickname}?`
                :
                    isFromMatchingRoom?
                    `Not join ${nickname}'s group`
                    :
                    `Refuse ${nickname}?`
                
            }
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {
                isAccept?
                
                    isFromMatchingRoom?
                    `If you click yes, you will join ${nickname}'s group`
                    :
                    `If you click yes, ${nickname} will be added to your friend list.`
                
                :
                
                    isFromMatchingRoom?
                    `If you click yes, you don't join ${nickname}'s group`
                    :
                    `If you click yes, ${nickname} will be deleted from your invitation list.`
                
            }
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleNo}>
                No
            </Button>
            <Button onClick={handleYes} autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
    );
}
function InvitationElem({email, img, major, nickname, isFromMatchingRoom, matchingRoomId}){
    const [hideElem, setHideElem] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [openAcceptAlert, setOpenAcceptAlert] = useState(false);
    const [openRefuseAlert, setOpenRefuseAlert] = useState(false);

    const sendData = {
        "matchingroomId": isFromMatchingRoom? matchingRoomId: 0,
        "sender": email
    };

    const token = localStorage.getItem("userToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const handleAcceptClose = () => {
        setOpenAcceptAlert(false);
        setIsLoading(true);
        console.log(sendData);

        axios.post('/api/accept',sendData, config)
            .then(res => {
                console.log(res);
                if(res.data.result){
                    
                    setHideElem(true);
                }
                else{
                    alert(res.data.description);
                }

                
            })
            .catch(err =>{
                console.log(err);
            });

        setIsLoading(false);
    };
    const handleRefuseClose = () => {
        setOpenRefuseAlert(false);
        setIsLoading(true);
        axios.delete('/api/reject', {
             data: { "matchingroomId": isFromMatchingRoom? matchingRoomId: 0,
                    "sender": email}, 
            headers: { "Authorization":  `Bearer ${token}`} })
            .then(res => {
                console.log(res);
                if(res.data.result){
                    
                    setHideElem(true);
                }
                else{
                    alert(res.data.description);
                }
            })
            .catch(err =>{
                console.log(err);
            });

        setIsLoading(false);
    };

    const handleAcceptBtn = (e) => {
        e.preventDefault();
        setOpenAcceptAlert(true);
    }

    const handleRefuseBtn = (e) => {
        e.preventDefault();
        setOpenRefuseAlert(true);
    }
    return(
        hideElem?
        null
        :
        <>
        <Alert open={openAcceptAlert} handleYes={handleAcceptClose} handleNo={(e) => {e.preventDefault(); setOpenAcceptAlert(false);}} isAccept={true} nickname={nickname} isFromMatchingRoom={isFromMatchingRoom}/>
        <Alert open={openRefuseAlert} handleYes={handleRefuseClose} handleNo={(e) => {e.preventDefault(); setOpenRefuseAlert(false);}} isAccept={false} nickname={nickname} isFromMatchingRoom={isFromMatchingRoom}/>
        <ListItem>
        {
            isLoading?
            <CircularProgress size='1.5rem'/>
            :
            <>
                <ListItemAvatar>
                {
                    img?
                    <Avatar alt={nickname} src={img} />
                    :
                    <Avatar alt={nickname} src="#"/>
                }
                
                </ListItemAvatar>
                <ListItemText primary={nickname} secondary={major} />
                <ButtonGroup size="small" aria-label="small button group">
                    <Button onClick={handleAcceptBtn}>Accept</Button>
                    <Button onClick={handleRefuseBtn}>Refuse</Button>
                </ButtonGroup>
                {
                    isFromMatchingRoom?
                    <Typography variant="body2" color="primary" sx={{display:"flex", alignItems:"center", marginLeft:"10px"}}>From group</Typography>
                    :
                    null
                }
                
            </>
        }
        </ListItem>
        <Divider variant="inset" component="li" />
        </>
    );
}

function Invitation({departmentList}){
    const token = localStorage.getItem("userToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [invitationList, setInvitationList] = useState([]);

    const classes = useStyles();
    const buttonClasses = useButtonStyles();

    useEffect(() => {
        axios.get('/api/invitedList', config)
            .then(res => {
                var list = res.data.value.invitationList;
                setInvitationList(list);
            })

            .catch(err =>{
                console.log(err);
            });
    },[]);


    return(
        <Box sx={{ width: "100vw", height:"100vh", display: "flex"}} className={classes.notebook}>
            <SideBar/>
            <Box sx={{ padding: "20px"}}>
                <Box className={buttonClasses.notebook}>
                    <BackBtn nextLoc={`/home`}/>
                </Box>
                <Box sx={{marginTop: "20px", paddingBottom: "10px", borderBottom: "1px solid #7c7c7c", width: "90%"}}>
                <Typography variant="h4">Invitation List</Typography>
                </Box>
                {
                    invitationList.length === 0?
                    <div className="invitation__list__alert">There's no invitation from other users.</div>
                    :
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                        }}>
                    {
                        invitationList.map((elem, index) => (
                            // console.log(elem)
                            <InvitationElem 
                                email={elem.invitePerson} 
                                img={elem.invitePersonImage} 
                                major={elem.invitePersonMajor} 
                                nickname={elem.invitePersonNickname}
                                matchingRoomId={elem.matchingRoomId}
                                isFromMatchingRoom={elem.matchingRoomId !== null}
                                />
                        ))
                    }
                    </List>
                }


            </Box>
        </Box>
    );
}

export default Invitation;