import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import {Drawer,Divider, Avatar, Typography,Button,Box ,IconButton,AppBar ,Menu ,MenuItem  } from '@mui/material'
// import Logo from '../icons/CxC_logo.png';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/core/styles';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

  
function SideBar(){
    const [user, setUser] = useState(null);
    const [clickedMenu, setClickedMenu] = useState(null);
    const [open, setOpen] = useState(false);

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

    const handleAppBarClick = () => {
        setOpen(!open);
    };

    const classes = useStyles();
    const anchorRef = useRef(null);

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user')));

        if(window.location.pathname === `/home`)
            setClickedMenu("0");
        else if(window.location.pathname === `/invitation`)
            setClickedMenu("1");
        else if(window.location.pathname === `/setting` || window.location.pathname === `/setting/edit-profile`)
            setClickedMenu("2");
    }, []);

    return(
        <>
        <Box className={classes.phone}>
        {
            <AppBar sx={{padding:"5px"}}>
                <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    <Box sx={{display:"flex", padding: "0px 5px"}}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() => {window.location.href="/"}}
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
                <Box sx={{display:"flex", alignItems:"center"}}>
                    <Typography variant="body1" >{user? user.nickname : "undefined"}</Typography>
                    <Avatar 
                        sx={{margin:"5px"}}
                        alt={user? user.nickname : "undefined"}
                        src={user? user.image : null}>
                    </Avatar>
                </Box>
                {        
                    open?
                    <Menu 
                        open={open} 
                        onClose={handleAppBarClick}
                        anchorEl={anchorRef.current}
                        placement="bottom-start">

                        <Link to="/home" style={{ textDecoration: 'none' }}>
                            <MenuItem>Home</MenuItem>
                        </Link>
                        <Link to="/invitation" style={{ textDecoration: 'none' }}>
                            <MenuItem>Invitation list</MenuItem>
                        </Link>
                        <Link to="/setting" style={{ textDecoration: 'none' }}>
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
            <Avatar
                sx={{width: "120px", height:"120px", fontSize: "30px", marginBottom:"20px"}}
                alt={user? user.nickname : "undefined"}
                src={user? user.image : null}>
            </Avatar>
            <Typography variant="h5" sx={{marginBottom:"40px"}}>{user? user.nickname : "undefined"}</Typography>
            <Divider />
            <Link to="/home" style={{ textDecoration: 'none' }}>
                {
                    clickedMenu === "0"?
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
            <Link to={`/invitation`} style={{ textDecoration: 'none' }}>
            {
                clickedMenu === "1"?
                <ClickedBtn onCLick={handleClick}>
                    Invitation list
                </ClickedBtn>
                :
                <NotClickedBtn onCLick={handleClick}>
                    Invitation list
                </NotClickedBtn>
            }
            </Link>
            <Divider />
            <Link to="/setting" style={{ textDecoration: 'none' }}>
            {
                clickedMenu === "2"?
                <ClickedBtn onCLick={handleClick}>
                    Setting
                </ClickedBtn>
                :
                <NotClickedBtn onCLick={handleClick}>
                    Setting
                </NotClickedBtn>
            }
            </Link>
            <Box sx={{position: "absolute", bottom:"10px"}}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" sx={{color:"#B1B1B1"}}>
                        Logout
                    </Typography>
                </Link>
            </Box>
        </Drawer>
        </Box>
        </>
    );
}

export default SideBar;