import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import SideBar from "../components/SideBar";
import Matching from "../components/Matching";
import DiaryThumbnail from "../components/DiaryThumbnail";
import "./DiaryList.css";

import { Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// import {diaries} from "./sampleDiary.json";

const ColorButton = styled(Button)({
    width: '126px',
    height: '41px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '18px',
    padding: '10px',
    lineHeight: 1.5,
    backgroundColor: '#3181C6',
    borderColor: '#0063cc',
    fontFamily: 'Roboto Condensed',
    marginLeft: '20px',
    marginBottom: '20px',
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


function DiaryList({departmentList, userEmail, userNickname, userDepartment, userMajor, userImage, userLanguage}){
    console.log("render diarylist");
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [matchingRoomList, setMatchingRoomList] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        setShowAddFriend(true);
    }

    const token = localStorage.getItem("userToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        // console.log("diarylist-user information: ", userEmail, userNickname, userDepartment, userMajor, userImage, userLanguage);
        axios.get('/api/roomList', config)
           .then(res => {
               console.log(res);
               if(res.data.result){
                   
                    setMatchingRoomList(res.data.value);
               }
               else{
                   alert("error!");
               }
           })
           .catch(err =>{
               console.log(err);
           });
    },[]);

    let diaryList = [];
    matchingRoomList.map((diary, index) => (
        diaryList.push(<td><DiaryThumbnail
                                    groupName={diary.matchingRoomName? diary.matchingRoomName: `Group ${index+1}`}
                                    groupImg={diary.matchingRoomImage}
                                    groupUserList={diary.userList}
                                    groupIdx={diary.matchingRoomId}
                                /></td>)

    ));

    // let rows = [];
    // let cells= [];
    //  diaryList.forEach((row, i) => {
    //     if(i%4 !== 0){
    //         cells.push(row);
    //     }else{
    //         rows.push(cells);
    //         cells = [];
    //         cells.push(row);
    //     }
    //     if(i === diaryList.length - 1){
    //         rows.push(cells);
    //     }
    //  });

    //  let table = rows.map((d, i) => {
    //     return <tr>{d}</tr>;
    //  });

    return(
        <div className="diarylist">
            <SideBar departmentList={departmentList} clickedMenuId={"0"}/>
            {
                showAddFriend?
                <Matching departmentList={departmentList} setShowAddFriend={setShowAddFriend} showAddFriend={showAddFriend}/>
                :
                <div className="diarylist__main">
                    <ColorButton variant="contained" className="diarylist__addBtn" onClick={handleClick}>+ Add Friend</ColorButton>
                    {/* <table className="diarylist__list">
                        {table}
                    </table> */}
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {diaryList.map((elem, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        {elem}
                    </Grid>
                    ))}
                </Grid>
                </Box>
                </div>
            }

        </div>
    );
}

export default DiaryList;