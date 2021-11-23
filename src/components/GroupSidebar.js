import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import {Drawer,Divider, Avatar, Typography,Button,Box,AvatarGroup   } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../icons/CxC_logo.png';

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
function GroupSidebar({groupIdx, groupName, groupImg, groupUserList}){
    const [user, setUser] = useState(null);
    const [curMenu, setCurMenu] = useState("0");

    const ClickedBtn = styled(ColorButton)({
        color: 'black',
        backgroundColor: 'white'
    });
    const NotClickedBtn = styled(ColorButton)({
        color: 'white',
        backgroundColor:  'primary'
    });

    const handleClick = (e) => {
        e.preventDefault();
    }

    // const handleMenuClick = (e) => {
    //     e.preventDefault();
    //     setOpen(!open);
    // }

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user')));

        if(window.location.pathname === `/home/diary/${groupIdx}`)
            setCurMenu("0");
        else if(window.location.pathname === `/home/diary/${groupIdx}/chat`)
            setCurMenu("1");
        else if(window.location.pathname === `/home/diary/${groupIdx}/notice`)
            setCurMenu("2");
        else if(window.location.pathname === `/home/diary/${groupIdx}/setting`)
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
                    alt={groupName? groupName : "undefined"}
                    src={groupImg}>
                </Avatar>       
                :
                <AvatarGroup max={2} sx={{marginBottom:"20px"}}>
                {
                    groupUserList.map(user => 
                        <Avatar 
                            sx={{width:"60px", height:"60px"}}
                            src={user.nickname}
                            alt={user.nickname}/>
                            )
                }
                </AvatarGroup>
            }

      
            <Typography variant="h5" sx={{marginBottom:"40px"}}>{groupName? groupName : "undefined"}</Typography>
            <Divider />
            <Link to={`/home/diary/${groupIdx}`} style={{ textDecoration: 'none' }}>
                {
                    curMenu === "0"?
                    <ClickedBtn onClick={handleClick}>
                        Home
                    </ClickedBtn>
                    :
                    <NotClickedBtn onClick={handleClick}>
                        Home
                    </NotClickedBtn>
                }
            </Link>
            <Divider />
            <Link to={`/home/diary/${groupIdx}/chat`} style={{ textDecoration: 'none' }}>
            {
                curMenu === "1"?
                <ClickedBtn onClick={handleClick}>
                    Chat
                </ClickedBtn>
                :
                <NotClickedBtn onClick={handleClick}>
                    Chat
                </NotClickedBtn>
            }
            </Link>
            <Divider />
            <Link to={`/home/diary/${groupIdx}/notice`} style={{ textDecoration: 'none' }}>
            {
                curMenu === "2"?
                <ClickedBtn onClick={handleClick}>
                    Notice
                </ClickedBtn>
                :
                <NotClickedBtn onClick={handleClick}>
                    Notice
                </NotClickedBtn>
            }
            </Link>
            <Divider />
            <Link to={`/home/diary/${groupIdx}/setting`} style={{ textDecoration: 'none' }}>
            {
                curMenu === "3"?
                <ClickedBtn onClick={handleClick}>
                    Setting
                </ClickedBtn>
                :
                <NotClickedBtn onClick={handleClick}>
                    Setting
                </NotClickedBtn>
            }
            </Link>
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