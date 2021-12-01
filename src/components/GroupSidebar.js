import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import {Drawer,Divider, Avatar, Typography,Button,Box,AvatarGroup   } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../icons/CxC_logo.png';

import axios from "axios";

const ColorButton = styled(Button)({
    border: "none",
    margin:"0px",
    borderRadius:"0px",
    width:"200px",
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '18px',
    padding: '10px',
    fontFamily: 'Roboto Condensed',
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
function GroupSidebar({}){
    // const [user, setUser] = useState(null);
    const [curMenu, setCurMenu] = useState(null);
    const imageRegex = /.*\.(gif|jpe?g|bmp|png)$/igm;
    const [groupIdx, setGroupIdx] = useState(null);
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState("");
    const [groupUserList, setGroupUserList] = useState([]);
    // const [numOfUnseenChat, setNumOfUnseenChat] = useState(0);

    const ClickedBtn = styled(ColorButton)({
        color: 'black',
        backgroundColor: 'white'
    });
    const NotClickedBtn = styled(ColorButton)({
        color: 'white',
        backgroundColor:  'primary'
    });

    useEffect( () => {
        var groupInfo = JSON.parse(localStorage.getItem('curGroup'));
        setGroupIdx(groupInfo.groupIdx);
        setGroupName(groupInfo.groupName);
        setGroupImg(groupInfo.groupImg);
        setGroupUserList(groupInfo.groupUserList);

        console.log("group sidebar render");
        if(window.location.pathname === `/home/diary/${groupInfo.groupIdx}`)
            setCurMenu("0");
        else if(window.location.pathname === `/home/diary/${groupInfo.groupIdx}/chat`)
            setCurMenu("1");
        else if(window.location.pathname === `/home/diary/${groupInfo.groupIdx}/notice`)
            setCurMenu("2");
        else if(window.location.pathname === `/home/diary/${groupInfo.groupIdx}/group-setting`)
            setCurMenu("3");
    }, []);

    return(
        <Box>
        <Drawer
            PaperProps={{
                sx: {
                  backgroundColor: '#0148A0',
                  color: "white",
                  borderRadius:" 0px 70px 0px 0px",
                  display:"flex",
                  flexDirection: "column",
                  alignItems:"center",
                  padding: "20px 0px"
                }
              }}
            sx={{
            width: "200px",
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: "200px",
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
        >
            {
                groupImg ?
                <Avatar
                    sx={{width: "120px", height:"120px", fontSize: "30px", marginBottom:"20px"}}
                    alt={groupName}
                    src={groupImg}>
                </Avatar>       
                :
                <AvatarGroup max={2} sx={{marginBottom:"20px"}}>
                {
                    groupUserList.map(user => 
                        <Avatar 
                            sx={{width:"60px", height:"60px"}}
                            src={user.image? user.image : user.nickname}
                            alt={user.nickname}/>
                            )
                }
                </AvatarGroup>
            }

      
            <Typography variant="h5" sx={{marginBottom:"40px"}}>{groupName? groupName : "undefined"}</Typography>
            <Divider />
            {
                <Link to={`/home/diary/${groupIdx}`} style={{ textDecoration: 'none' }}>
                {
                    curMenu === "0"?
                    <ClickedBtn>
                        Home
                    </ClickedBtn>
                    :
                    <NotClickedBtn>
                        Home
                    </NotClickedBtn>
                }
                </Link>
            }
            <Divider />
            {
                <Link to={`/home/diary/${groupIdx}/chat`} style={{ textDecoration: 'none' }}>
                {
                    curMenu === "1"?
                    <ClickedBtn>
                        Chat
                    </ClickedBtn>
                    :
                    <NotClickedBtn>
                        Chat
                    </NotClickedBtn>
                }
                </Link>
            }
            <Divider />
            {
                <Link to={`/home/diary/${groupIdx}/group-setting`} style={{ textDecoration: 'none' }}>
                {
                    curMenu === "3"?
                    <ClickedBtn>
                        Group Setting
                    </ClickedBtn>
                    :
                    <NotClickedBtn>
                        Group Setting
                    </NotClickedBtn>
                }
                </Link>
            }
            <Box sx={{position: "absolute", bottom:"10px"}}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" sx={{color:"dimgrey"}}>
                        Logout
                    </Typography>
                </Link>
            </Box>
        </Drawer>
        </Box>
    );
}

export default GroupSidebar;