import React , {useState} from "react";

import SideBar from "../components/SideBar";
import BackBtn from "../components/BackBtn";

import {Box, Typography} from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';

import { makeStyles } from '@material-ui/core/styles';

import "./MySetting.css";

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


function MySetting(){
    const classes = useStyles();
    const buttonClasses = useButtonStyles();

    const handleEditProfileBtn = (e) => {
        e.preventDefault();
        window.location.replace(window.location.href+"/edit-profile");
    }

    return(
        <Box sx={{ display:"flex", width:"100vw", height:"100vh"}} className={classes.notebook}>
            <SideBar />
            <Box  sx={{padding: "20px"}}>
                <Box className={buttonClasses.notebook}>
                    <BackBtn nextLoc={"/home"}/>
                </Box>
                
                <Box sx={{marginTop: "20px", paddingBottom: "10px", borderBottom: "1px solid #7c7c7c", width: "90%"}}>
                    <Typography variant="h4">Setting</Typography>
                </Box>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', fontFamily: 'Roboto Condensed'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    >
                    <ListItemButton onClick={handleEditProfileBtn}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit profile" />
                    </ListItemButton>
                </List>
            </Box>
        </Box>
    );
}

export default MySetting;