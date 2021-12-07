import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import {Drawer,Divider, Avatar, Typography,Button,Box,AvatarGroup, AppBar, Menu, MenuItem,IconButton   } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../icons/CxC_logo.png';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

const useStyles = makeStyles((theme) => ({
    notebook : {
        display: "block",
        [theme.breakpoints.down('xs')]:{
            display: "none",
        }
    },
    phone : {
        display: "none",
        [theme.breakpoints.down('xs')]:{
            display:"block",
        }
    }
}));


function GroupSidebar({}){
    // const [user, setUser] = useState(null);
    const [curMenu, setCurMenu] = useState(null);
    const imageRegex = /.*\.(gif|jpe?g|bmp|png)$/igm;
    const [groupIdx, setGroupIdx] = useState(null);
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState("");
    const [groupUserList, setGroupUserList] = useState([]);
    // const [numOfUnseenChat, setNumOfUnseenChat] = useState(0);

    const [open, setOpen] = useState(false);

    const ClickedBtn = styled(ColorButton)({
        color: 'black',
        backgroundColor: 'white'
    });
    const NotClickedBtn = styled(ColorButton)({
        color: 'white',
        backgroundColor:  'primary'
    });

    const classes = useStyles();
    const anchorRef = useRef(null);

    const handleAppBarClick = () => {
        setOpen(!open);
    };

    useEffect( () => {
        var groupInfo = JSON.parse(localStorage.getItem('curGroup'));
        setGroupIdx(groupInfo.groupIdx);
        setGroupName(groupInfo.groupName);
        setGroupImg(groupInfo.groupImg);
        setGroupUserList(groupInfo.groupUserList);

        console.log("group sidebar render");
        if(window.location.pathname.includes(`/home/diary/${groupInfo.groupIdx}/group-setting`))
            setCurMenu("3");
        else if(window.location.pathname === `/home/diary/${groupInfo.groupIdx}/chat`)
            setCurMenu("1");
        else
            setCurMenu("0");
    }, []);

    return(
        <>
         <Box className={classes.phone}>
        {
            <AppBar position="sticky" sx={{top:0,bottom:"auto", padding:"5px", width:"100vw"}}>
                <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    <Box sx={{display:"flex", padding: "0px 5px"}}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() => {window.location.href="/home"}}
                            sx={{display:"flex", width:"50px"}}
                            >
                            <ArrowBackIcon sx={{margin:"0px", padding:"0px"}}/>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            id="menuIcon"
                            edge="start"
                            ref={anchorRef}
                            onClick={handleAppBarClick}
                            sx={{display:"flex", width:"50px"}}
                            >
                            <MenuIcon sx={{margin:"0px", padding:"0px"}}/>
                        </IconButton>
                    </Box>
                <Box sx={{display:"flex", alignItems:"center", padding: "0px 5px"}}>
                    <Typography variant="body1">{groupName? groupName : "undefined"}</Typography>
                    {
                        groupImg ?
                        <Avatar
                            sx={{margin:'5px'}}
                            alt={groupName}
                            src={groupImg}>
                        </Avatar>       
                        :
                        <AvatarGroup max={2} sx={{margin:'5px'}}>
                        {
                            groupUserList.map(user => 
                                // console.log(user)
                                <Avatar 
                                    src={user.image? user.image : user.nickname}
                                    alt={user.nickname}/>
                                    )
                        }
                        </AvatarGroup>
                    }
                </Box>
                {        
                    open?
                    <Menu 
                        open={open} 
                        onClose={handleAppBarClick}
                        anchorEl={anchorRef.current}
                        placement="bottom-start">

                        <Link to={`/home/diary/${groupIdx}`} style={{ textDecoration: 'none' }}>
                            <MenuItem>Home</MenuItem>
                        </Link>
                        <MenuItem onClick={() => {window.location.replace(`/home/diary/${groupIdx}/chat`);}}>Chat</MenuItem>
                        <Link to={`/home/diary/${groupIdx}/group-setting`} style={{ textDecoration: 'none' }}>
                            <MenuItem>Setting</MenuItem>
                        </Link>
                    </Menu>
                    :
                    null
                }
                </Box>
            </AppBar>
        }
        </Box>
        <Box className={classes.notebook}>
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
                        // console.log(user)
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
                curMenu === "1"?
                <ClickedBtn onClick={() => {window.location.replace(`/home/diary/${groupIdx}/chat`);}} variant="contained" color="primary">
                    Chat    
                </ClickedBtn>
                :
                <NotClickedBtn onClick={() => {window.location.replace(`/home/diary/${groupIdx}/chat`);}}  variant="contained" color="primary">
                    Chat   
                </NotClickedBtn>
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
        </>
    );
}

export default GroupSidebar;