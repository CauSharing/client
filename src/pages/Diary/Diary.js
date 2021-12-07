import React, {useState, useEffect} from "react";
import { Link ,useParams, withRouter, useLocation} from 'react-router-dom';
import GroupSidebar from "../../components/GroupSidebar";
import "./Diary.css";
import Calendar from "../../components/Calendar";
// import BackBtn from "../../components/BackBtn";

import {Box, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

import './Diary.css';

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


function Diary({}){
    const {groupIdx} = useParams();
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState("");
    const [groupUserList, setGroupUserList] = useState([]);

    const buttonClasses = useButtonStyles();
    const classes = useStyles();

    useEffect(() => {
        var groupInfo = JSON.parse(localStorage.getItem('curGroup'));
        setGroupName(groupInfo.groupName);
        setGroupImg(groupInfo.groupImg);
        setGroupUserList(groupInfo.groupUserList);
    },[]);

    const handleBackButton = (e) => {
        window.location.href = "/home";
    }

    return(
        <Box sx={{display:"flex", width: "100vw", height:"100vh", overflowY:"auto"}} className={classes.phone, classes.notebook+" container"}>
            <GroupSidebar groupIdx={groupIdx}/>
            <Box sx={{padding: "20px", width: "100%"}}>
                <Button 
                    className={buttonClasses.notebook}
                    size="small"
                    variant="outlined"
                    sx={{display:"flex", alignItems:"center", justifyContent:"center", color: "#3181C6"}}
                    onClick={handleBackButton}>
                        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <ArrowBackIcon />
                    View diary list
                    </Box>
                </Button>
                <Calendar groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            </Box>
        </Box>

    );
}

export default withRouter(Diary);