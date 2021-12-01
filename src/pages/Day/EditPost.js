import React , {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Box, TextField, Button, Typography} from '@mui/material';
import GroupSidebar from "../../components/GroupSidebar";

import BackBtn from '../../components/BackBtn';
import { styled } from '@mui/material/styles';

import MyEditor from '../../components/Editor';

import moment from 'moment';
import axios from 'axios';

const ColorButton = styled(Button)({
    maxWidth: '120px',
    height: '40px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '18px',
    padding: '10px',
    lineHeight: 1.5,
    color: 'white',
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

function Editor({content, setContent}){
    return(
        <Box sx={{width:"90%"}}>
            <MyEditor initialValue={`${content}`} isViewer={false} setContent={setContent}/>
        </Box>
    );
}

function EditPost(){
    const { groupIdx, year, month, day, postIdx} = useParams();
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState("");
    const [groupUserList, setGroupUserList] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const dayName = moment(`${year}-${month}-${day}`).format('ddd');

    useEffect(async () => {
        var groupInfo = JSON.parse(localStorage.getItem('curGroup'));
        setGroupName(groupInfo.groupName);
        setGroupImg(groupInfo.groupImg);
        setGroupUserList(groupInfo.groupUserList);

        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });

        await instance.get(`/api/post?postId=${postIdx}`,config)
          .then((res) => {
              console.log(res);
              if(res.data.result){
                  setTitle(res.data.value.title);
                  setContent(res.data.value.content);
              }else{
                  console.log("error");
              }
          })
          .catch(err => {
              console.log(err);
          });     
    },[]);


    const handleSaveBtn = (e) => {
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const sendData = {
            "content": content,
            "matchingRoomId": groupIdx,
            "postDate": `${year}-${month<10? `0${month}`:month}-${day<10? `0${day}`: day}T05:50:27.917Z`,
            "title": title
        };    

        // console.log(sendData);
        axios.put(`/api/postUpdate?postId=${postIdx}`,sendData, config)
        .then(res => {
            console.log(res);
            if(res.data.result){
                alert("updated");
            }
            else{
                alert(res.data.description);
            }
        })
        .catch(err =>{
            console.log(err);
        });
    }

    return(
        <Box sx={{display: "flex", width: "100%", justifyContent:"center"}}>
            {
                console.log("render edit post") 
            }
            <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            <Box sx={{width: "100%", display: "flex", flexDirection: "column", padding: "20px"}}>
                <BackBtn nextLoc={'dfsf'}/>
                <Box sx={{width: "90%", display:"flex", justifyContent: "space-between", alignItems:"center",marginTop:"20px"}}>
                    <Typography variant="h5">{`${year}/${month}/${day}/${dayName}`}</Typography>
                    <ColorButton onClick={handleSaveBtn}>Save</ColorButton>
                </Box>
                <TextField 
                    id="standard-basic" 
                    label="Title" 
                    variant="standard" 
                    style={{marginBottom: "15px"}}
                    value={title}
                    onChange={(e) => {e.preventDefault(); setTitle(e.target.value);}}
                    sx={{width: "90%"}}/>
                {
                    content?
                    <Editor content={content} setContent={setContent} />
                    :
                    null
                }
                
            </Box>
        </Box>
    );
}

export default EditPost;