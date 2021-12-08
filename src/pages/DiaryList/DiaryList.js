import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import SideBar from "../../components/SideBar";
import Matching from "../../components/Matching";
import DiaryThumbnail from "../../components/DiaryThumbnail";
import "./DiaryList.css";

import { Button, Grid, Box , Typography, CircularProgress,Fab   } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@mui/icons-material/Add';

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
        flexDirection: "row",
        [theme.breakpoints.down('sm')]:{
            flexDirection: "column",
        }
    },
    phone : {
        flexDirection: "column",
        [theme.breakpoints.down('sm')]:{
            flexDirection: "row",
        }
    }
}));

const useButtonStyles = makeStyles((theme) => ({
    notebook : {
        display: "block",
        [theme.breakpoints.down('sm')]:{
            display: "none",
        }
    },
    phone : {
        display: "none",
        [theme.breakpoints.down('sm')]:{
            display: "block",
        }
    }
}));


function DiaryList({departmentList}){

    const [showAddFriend, setShowAddFriend] = useState(false);
    const [matchingRoomList, setMatchingRoomList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = (e) => {
        e.preventDefault();
        setShowAddFriend(true);
    }

    const token = localStorage.getItem("userToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const classes = useStyles();
    const buttonClasses = useButtonStyles();

    useEffect(async () => {
        const instance = axios.create({
            timeout: 30000,
          });

        await instance.get('/api/roomList', config)
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
        
        await setIsLoading(false);
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

    return(
        
        <Box sx={{display:"flex", width: "100vw", height:"100vh"}} className={classes.phone, classes.notebook}>
            <SideBar/>
            <Box sx={{padding: "20px"}}>
            {
                isLoading?
                <Box sx={{display:"flex", alignItems: "center", justifyContent:"center"}}>
                    <CircularProgress  color="primary"/>
                </Box>
                :
                showAddFriend?
                <Matching departmentList={departmentList} setShowAddFriend={setShowAddFriend} showAddFriend={showAddFriend}/>
                :
                <Box sx={{height: "100%"}}>
                    <Box >
                        <ColorButton 
                            className={buttonClasses.notebook}
                            variant="contained" 
                            onClick={handleClick}
                            >
                            + Add Friend
                        </ColorButton>
                    </Box>
                    <Box sx={{  marginTop:"20px"}}>
                        <Grid container spacing={{xs:2,sm:2,md:2, lg:4,xl:6}} columns={{ xs: 2, sm: 6, md: 6 ,lg:8, xl:10 }}>
                            {diaryList.map((elem, index) => (
                            <Grid item xs={1} sm={2} md={2} lg={2} xl={2} key={index}>
                                {elem}
                            </Grid>
                            ))}
                        </Grid>
                    </Box>

                </Box>
            }
                
            </Box>
            <Fab 
                color="primary"
                size="medium"  
                className={buttonClasses.phone} 
                onClick={() => setShowAddFriend(!showAddFriend)}
                sx={{position:"fixed", bottom:"10px", right:"10px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <AddIcon />
                </Box>
            </Fab>
        </Box>
    
    );
}

export default DiaryList;