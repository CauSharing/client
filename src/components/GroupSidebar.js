import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import {Drawer,Divider, Avatar, Typography,Button,Box  } from '@mui/material';
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
function GroupSidebar({diaryIdx}){
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

        if(window.location.pathname === `/home/diary/${diaryIdx}`)
            setCurMenu("0");
        else if(window.location.pathname === `/home/diary/${diaryIdx}/chat`)
            setCurMenu("1");
        else if(window.location.pathname === `/home/diary/${diaryIdx}/notice`)
            setCurMenu("2");
        else if(window.location.pathname === `/home/diary/${diaryIdx}/setting`)
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

            <Avatar
                sx={{width: "120px", height:"120px", fontSize: "30px", marginBottom:"20px"}}
                alt={user? user.nickname : "undefined"}
                src={user? user.image : null}>
            </Avatar>
            <Typography variant="h5" sx={{marginBottom:"40px"}}>{user? user.nickname : "undefined"}</Typography>
            <Divider />
            <Link to={`/home/diary/${diaryIdx}`} style={{ textDecoration: 'none' }}>
                {
                    curMenu === "0"?
                    <ClickedBtn onCLick={handleClick}>
                        Home
                    </ClickedBtn>
                    :
                    <NotClickedBtn onCLick={handleClick}>
                        Home
                    </NotClickedBtn>
                }
            </Link>
            <Divider />
            <Link to={`/home/diary/${diaryIdx}/chat`} style={{ textDecoration: 'none' }}>
            {
                curMenu === "1"?
                <ClickedBtn onCLick={handleClick}>
                    Chat
                </ClickedBtn>
                :
                <NotClickedBtn onCLick={handleClick}>
                    Chat
                </NotClickedBtn>
            }
            </Link>
            <Divider />
            <Link to={`/home/diary/${diaryIdx}/notice`} style={{ textDecoration: 'none' }}>
            {
                curMenu === "2"?
                <ClickedBtn onCLick={handleClick}>
                    Notice
                </ClickedBtn>
                :
                <NotClickedBtn onCLick={handleClick}>
                    Notice
                </NotClickedBtn>
            }
            </Link>
            <Divider />
            <Link to={`/home/diary/${diaryIdx}/setting`} style={{ textDecoration: 'none' }}>
            {
                curMenu === "3"?
                <ClickedBtn onCLick={handleClick}>
                    Setting
                </ClickedBtn>
                :
                <NotClickedBtn onCLick={handleClick}>
                    Setting
                </NotClickedBtn>
            }
            </Link>
            <Box sx={{position: "relative", top:"35vh"}}>
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