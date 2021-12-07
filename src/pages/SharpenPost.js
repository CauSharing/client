import React, {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import GroupSidebar from "../components/GroupSidebar";
import BackBtn from "../components/BackBtn";

import moment from "moment";

import DiffMatchPatch from 'diff-match-patch';

import { Button, Box, TextField , Typography} from '@mui/material';
import { styled } from '@mui/material/styles';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';


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

const ColorButton = styled(Button)({
    width: '126px',
    height: '41px',
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


function OriginalContent({content}){
    return(
        <Box sx={{width: "50%"}}>
            {content}
        </Box>
    );
}

function EditedContent({writer, content, originalContent}){
    const [coloredContent, setColoredContent]=useState([]);
    const [userColor, setUserColor] = useState("transparent");
    
    useEffect(() => {
        const dmp = new DiffMatchPatch();
        const diff = dmp.diff_main(originalContent, content);
            
        var l = [];
        for(var j=0; j<diff.length; j++){
            if(diff[j][0] === -1){
                l.push(<span style={{backgroundColor: "#FE8F8F", textDecoration: "line-through"}}>{diff[j][1]}</span>);
            }
            else if(diff[j][0] === 0){
                l.push(<span>{diff[j][1]}</span>);
            }
            else {
                l.push(<span style={{backgroundColor: "#B1E693"}}>{diff[j][1]}</span>);
            }
        }
        setColoredContent(l);

        if(localStorage.getItem('colorInfo')){
            var colorInfo = JSON.parse(localStorage.getItem('colorInfo'));
            var user = colorInfo.find(elem => elem.nickname === writer);
            console.log(colorInfo, user, writer);
            if(user)
                setUserColor(user.color);
        }
        
        
    }, []);
    return(
        <Box sx={{width: "50%", display:"flex", alignItems: "center", borderLeft: "1px solid #C0C0C0"}}>
            <Typography variant="body1" sx={{borderRadius: "5px", marginRight:"5px",minWidth: "40px", padding: "5px", backgroundColor: userColor, display:"flex", alignItems: "center",justifyContent:"center"}}>{writer}</Typography>
            <Typography variant="body1">{coloredContent}</Typography>
        </Box>
    );
}

function Block({originalContent, editedDataList, line, userNickname, postId, setTitle, setOriginalList, setEditedList}){
    const [newEditedData, setNewEditedData] = useState(originalContent);
    const handleClick = async (e) => {
        const data = {
            editedDataList: [
                {
                    content : newEditedData,
                    editedDataId : 0,
                    line : line,
                    writer : userNickname
                }
            ],
            postId: parseInt(postId)
        };

        console.log(data);

        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
            });

        await instance.post(`/api/sharpening`,data, config)
        .then(res => {
            console.log(data, res);
        })
        .catch(err => {
            console.log(err);
            alert("error");
        });   
        await instance.get(`/api/post?postId=${postId}`,config)
        .then(res => {
            console.log(res);
            if(res.data.result){
                var list = [];

                setTitle(res.data.value.title);

                var el = document.createElement( 'html' );
                el.innerHTML = res.data.value.content;
                var ps = el.querySelectorAll("p");
                
                ps.forEach((elem, index) => {
                    if(elem.innerText !== "")
                        list.push(elem.innerText);
                });
                console.log(list);
                setOriginalList(list);
            }

        })
        .catch(err => {
            console.log(err);
        });   

        await instance.get(`/api/sharpening/${postId}`,config)
        .then(res => {
            console.log(res);
            if(res.data.result){
                if(res.data.value !== null){
                    setEditedList(res.data.value.editedDataList);
                }
            }
            else{
                new Error();
            }
            
        })
        .catch(err => {
            console.log(err);
            alert("error");
        })
    }
    return(
        <Box sx={{width: "100%", borderBottom: "1px solid #C0C0C0"}}>
            <Box sx={{width:"100%", display: "flex", alignItems:"center"}}>
                <OriginalContent content={originalContent} />
                <Box sx={{width: "50%", display:"flex", alignItems:"center"}}>
                    <TextField 
                        variant="standard" 
                        onChange={(e) => setNewEditedData(e.target.value)} 
                        defaultValue={originalContent} 
                        multiline
                        style={{width:"90%", fontSize:"18px", borderLeft: "1px solid #C0C0C0"}} 
                        inputStyle ={{width: '90%', fontSize:"18px"}}/>
                    <Button variant="outlined" onClick={handleClick} size="small">Submit</Button>
                </Box>
            </Box>
            {
                editedDataList.length > 0 ?
                editedDataList.map(elem => 
                    <Box sx={{width: "100%", display:"flex"}}>
                        <Box sx={{width: "50%"}}></Box>
                        <EditedContent writer={elem.writer} content={elem.content} originalContent={originalContent}/>
                    </Box>)
                :
                null
            }
        </Box>
    );
}
function SharpenPost({}){
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState("");
    const [groupUserList, setGroupUserList] = useState([]);

    const { groupIdx, year, month, day, postIdx} = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const dayName = moment(`${year}-${month}-${day}`).format('ddd');

    const [title, setTitle] = useState("");
    const [originalList, setOriginalList] = useState([]);
    const [editedList, setEditedList] = useState([]);

    const classes = useStyles();

    useEffect( async () => {
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
        .then(res => {
            console.log(res);
            if(res.data.result){
                var list = [];

                setTitle(res.data.value.title);

                var el = document.createElement( 'html' );
                el.innerHTML = res.data.value.content;
                var ps = el.querySelectorAll("p");
                
                ps.forEach((elem, index) => {
                    if(elem.innerText !== "")
                        list.push(elem.innerText);
                });
                console.log(list);
                setOriginalList(list);
            }

        })
        .catch(err => {
            console.log(err);
        });   

        await instance.get(`/api/sharpening/${postIdx}`,config)
        .then(res => {
            console.log(res);
            if(res.data.result){
                if(res.data.value !== null){
                    setEditedList(res.data.value.editedDataList);
                }
            }
            else{
                new Error();
            }
            
        })
        .catch(err => {
            console.log(err);
            alert("error");
        })

    }, []);

    return(
        <Box sx={{width:"100%", display:"flex"}} className={classes.notebook}>
            <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            <Box sx={{width:"100%", padding:"20px"}}>
                <BackBtn nextLoc={`/home/diary/${groupIdx}/${year}-${month}-${day}`}/>
                <Box 
                    sx={{  display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                            width:"100%",
                            margin:"20px 0px",}}>
                    <Typography variant="h5">
                        {`${year}/${month}/${day}/${dayName}`}
                    </Typography>
                    {/* <ColorButton>Save</ColorButton> */}
                </Box>
                <Box  sx={{width:"100%"}}>
                    <Typography variant="h5" >{title}</Typography>
                    <Box
                        sx={{  display: "flex", alignItems:"center", width:"100%", margin:"20px 0px"}}>
                        <Typography variant="subtitle1" sx={{width:"50%", color:"#3181c6", padding: "0px 5px"}}>Original</Typography>
                        <Typography variant="subtitle1" sx={{width:"50%", color:"#3181c6", padding: "0px 5px"}}>Edit</Typography>
                    </Box>
                    <Box  sx={{  width: "100%"}}>
                    {                    
                        originalList.map((elem, index) => {
                            return <Block 
                                        originalContent={elem} 
                                        editedDataList={editedList.filter(data =>index === data.line)} 
                                        line={index} 
                                        userNickname={user.nickname} 
                                        postId={postIdx}
                                        setTitle={setTitle}
                                        setOriginalList = {setOriginalList}
                                        setEditedList={setEditedList}/>;
                        })
                    }
                    </Box>
                 </Box>
            </Box>
        </Box>
    );
}
export default SharpenPost;