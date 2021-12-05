import React, {useState, useEffect} from "react";
import { Link ,useParams, withRouter, useLocation} from 'react-router-dom';
import GroupSidebar from "../../components/GroupSidebar";
import "./Diary.css";
import Calendar from "../../components/Calendar";
// import BackBtn from "../../components/BackBtn";

import {Box, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Diary({}){
    const {groupIdx} = useParams();
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState("");
    const [groupUserList, setGroupUserList] = useState([]);

    // const location = useLocation();

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
        <Box sx={{display:"flex"}}>
            <GroupSidebar groupIdx={groupIdx}/>
            <Box sx={{padding: "20px", width: "100%"}}>
                {/* <BackBtn nextLoc={"/home"}/> */}
                <Button 
                    size="small"
                    variant="outlined"
                    sx={{display:"flex", alignItems:"center", justifyContent:"center", color: "#3181C6"}}
                    onClick={handleBackButton}>
                    <ArrowBackIcon />
                    View diary list
                </Button>
                <Calendar groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            </Box>
        </Box>

    );
}

export default withRouter(Diary);