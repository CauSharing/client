import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import SideBar from "../components/SideBar";
import BackBtn from "../components/BackBtn";


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

function Alert({open, handleClose, isAccept, nickname}){
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {
                isAccept?
                `Accept ${nickname}?`
                :
                `Refuse ${nickname}?`
            }
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {
                isAccept?
                `If you click yes, ${nickname} will be added to your friend list.`
                :
                `If you click yes, ${nickname} will be deleted from your invitation list.`
            }
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleClose} autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
    );
}
function InvitationElem({matchingroomId, email, img, major, nickname}){
    const [hideElem, setHideElem] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [openAcceptAlert, setOpenAcceptAlert] = useState(false);
    const [openRefuseAlert, setOpenRefuseAlert] = useState(false);

    const sendData = {
        "matchingroomId": matchingroomId,
        "sender": email
    };

    const token = localStorage.getItem("userToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const handleAcceptClose = () => {
        setOpenAcceptAlert(false);
        setIsLoading(true);
        const data = {
            "matchingroomId": matchingroomId,
            "sender": email
        };

        axios.post('/api/accept',sendData, config)
            .then(res => {
                console.log(res);
                setHideElem(true);
            })
            .catch(err =>{
                console.log(err);
            });

        setIsLoading(false);
    };
    const handleRefuseClose = () => {
        setOpenRefuseAlert(false);
        setIsLoading(true);


        axios.delete('/api/reject', sendData, config)
            .then(res => {
                console.log(res);
                setHideElem(true);
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
        <Alert open={openAcceptAlert} handleClose={handleAcceptClose} isAccept={true} nickname={nickname} />
        <Alert open={openRefuseAlert} handleClose={handleRefuseClose} isAccept={false} nickname={nickname} />
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

    useEffect(() => {
        axios.get('/api/invitedList', config)
            .then(res => {
                var list = res.data.value.invitationList;
                let set = new Set();
                list.forEach((elem) => {
                    set.add(elem.invitePerson);
                });

                setInvitationList(Array.from(set));
            })

            .catch(err =>{
                console.log(err);
            });
    },[]);

    // 샘플 데이터
    // const invitationData = [
    //     {
    //         invitePerson: "emma2007@cau.ac.kr",
    //         invitePersonImage: "",
    //         invitePersonMajor: "Software",
    //         invitePersonNickname: "mj",
    //         matchingRoodId: 0
    //     },
    //     {
    //         invitePerson: "nk@cau.ac.kr",
    //         invitePersonImage: "http://ph.spotvnews.co.kr/news/photo/202105/420427_531978_4632.jpg",
    //         invitePersonMajor: "Engineering",
    //         invitePersonNickname: "nakyoung",
    //         matchingRoodId: 1
    //     },
    //     {
    //         invitePerson: "jk@cau.ac.kr",
    //         invitePersonImage: "https://newsimg.hankookilbo.com/cms/articlerelease/2021/05/17/9ee33d77-38c1-4699-ae43-893aa70db4ff.jpg",
    //         invitePersonMajor: "Mathematics",
    //         invitePersonNickname: "jikwang",
    //         matchingRoodId: 2
    //     }
    // ];

    return(
        <div className="invitation">
            <SideBar departmentList={departmentList} clickedMenuId={"2"} />
            <div className="invitation__list">
                <div className="invitation__list__btn">
                    <BackBtn nextLoc={`/home`}/>
                </div>
                
                <div className="invitation__list__title">Invitation List</div>
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
                            <InvitationElem 
                                email={elem.invitePerson} 
                                img={elem.invitePersonImage} 
                                major={elem.invitePersonMajor} 
                                nickname={elem.invitePersonNickname}/>
                        ))
                    }
                    </List>
                }


            </div>
        </div>
    );
}

export default Invitation;