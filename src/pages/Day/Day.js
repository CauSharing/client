import React, {useState, useRef, useEffect, useContext} from "react";
import {useParams, useHistory } from 'react-router-dom';
import moment from "moment";
import GroupSidebar from "../../components/GroupSidebar";
import axios from "axios";
import PlusBtn from "../../components/PlusBtn";
import BackBtn from "../../components/BackBtn";
// import PinkPlus from "../icons/pink-plus.png";
import "./Day.css";

import MyEditor from "../../components/Editor";
import EditPost from "../EditPost";
import CommentList from './CommentList';

import { Button, List, TextField, Box, Typography ,ListItem, ListItemAvatar, ListItemText, Avatar} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {GroupContext} from "../../context/index";


let sample_img = "https://w.namu.la/s/adb56b09aef6d27319fe0fed21df3cf9e282fe7964308413845ab53649de0ac7e4003aa7abb7b2fe51b934bfc22b68d7183381a532e6ffca6849ad42672b4fc580161f61963aefaa808acaa4c788504ec2212a4a827718b8451f23098f8f24d7fa2d12cb721787c3cd3e098b609a9555";
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
  




function AddPost({matchingRoomId, setShowAddPost, year, month, day, dayName}){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSaveBtn = () => {
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const sendData = {
            "content": content,
            "matchingRoomId": matchingRoomId,
            "postDate": `${year}-${month<10? `0${month}`:month}-${day<10? `0${day}`: day}T05:50:27.917Z`,
            "title": title
        };    

        console.log(sendData);
        axios.post('/api/createPost',sendData, config)
        .then(res => {
            console.log(res);
            if(res.data.result){
                alert("saved");

            }
            else{
                alert(res.data.description);
            }
        })
        .catch(err =>{
            console.log(err);
        });
    };

    return(
        <div className="addPost">
            <BackBtn setShowContents={setShowAddPost}/>
            <div className="addPost__line">
                <div className="addPost__date">{`${year}/${month}/${day}/${dayName}`}</div>
                <ColorButton onClick={handleSaveBtn}>Save</ColorButton>
            </div>
            <TextField 
                id="standard-basic" 
                label="Title" 
                variant="standard" 
                style={{marginBottom: "15px"}}
                onChange={(e) => setTitle(e.target.value)}/>
            {/* <input className="addPost__title" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/> */}
           <MyEditor initialValue={""} isViewer={false} setContent={setContent}/>
        </div>
    )
}
function Friend({name, color}){
    const nameStyle = {
        background: color
    };

    return(
        <Box sx={{backgroundColor:color, padding: "5px", display: "flex", justifyContent: "center", 
        alignItems:"center", borderRadius: "5px", marginRight: "5px", minWidth: "20px", height: "100%"}}>
            {name}
        </Box>
    );
}

function FriendList({friendList}){
    const friendCompList = [];

    for(const friend of friendList){
        friendCompList.push(<Friend name={friend.name} color={friend.color}/>);
    }

    return(
        <Box sx={{display:"flex", alignItems:"center", height: "100%"}}>
            {friendCompList}
        </Box>
    );
}

function Post({title, description, postIdx, writer, postDate}){
    const [commentList, setCommentList] = useState([]);

    useEffect(async () => {
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });

        await instance.get(`/api/commentList?postId=${postIdx}`,config)
            .then(res => {
                setCommentList(res.data.value);
            })
            .catch(err => {
                console.log(err);
            });
    },[]);
    //     const commentList = [
    //     {
    //         childComment: [
    //             {
    //                 childComment: [],
    //                 commentDate: "2021-11-10T20:33:02.724Z",
    //                 commentId: 0,
    //                 content: "string",
    //                 writer: "string",
    //                 imgSrc: sample_img
    //             },
    //         ],
    //         commentDate: "2021-11-10T20:33:02.724Z",
    //         commentId: 0,
    //         content: "string",
    //         writer: "mj",
    //         imgSrc: sample_img
    //     },
    //     {
    //         childComment: [],
    //         commentDate: "2021-11-10T20:33:02.724Z",
    //         commentId: 0,
    //         content: "string",
    //         writer: "nk",
    //         imgSrc: sample_img
    //     },
    //     {
    //         childComment: [],
    //         commentDate: "2021-11-10T20:33:02.724Z",
    //         commentId: 0,
    //         content: "string",
    //         writer: "jk",
    //         imgSrc: sample_img
    //     },
    // ];
    const dateObj = new Date(postDate);
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();

    const handleClick = (e) => {
        e.preventDefault();
        window.location.replace(window.location.href + `/${postIdx}/edit`);
    }
    return(
        <Box sx={{width: "100%"}}>
            <Box sx={{width: "100%", display: "flex", flexDirection: "column"}}>
                <Box sx={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Box sx={{width: "100%", display: 'flex', alignItems: "end"}}>
                        <Typography variant="h5" sx={{marginRight: "5px"}}>{title}</Typography>
                        <Typography variant="body2" color="secondary.main" sx={{marginRight: "5px"}}>{writer}</Typography>
                        <Typography variant="body2" color="secondary.main">{hour}:{minute}</Typography>
                    </Box>                
                    <ColorButton className="day__post__editBtn" onClick={handleClick}>Edit</ColorButton>
                </Box>

                <MyEditor initialValue={description} isViewer={true}/>
            </Box>
            <Box sx={{width: "100%", borderBottom: "1px solid #7c7c7c", display: "flex", alignItems: "center", marginTop: "20px"}}>
                <Typography variant="h5" sx={{marginRight: "10px"}}>Comment</Typography>
                <Typography variant="body1" color="secondary">{commentList.length}</Typography>
            </Box>
            <CommentList commentList={commentList} isReply={false} postId={postIdx}/>
        </Box>
        // <div className="day__post">
        //     <div className="day__post__line">
        //         <div className="day__post__title">{title}</div>
        //         <ColorButton className="day__post__editBtn" onClick={handleClick}>Edit</ColorButton>
        //     </div>
        //     <MyEditor initialValue={description} isViewer={true}/>
        // </div>
    );
}


function Day({}){
    // const {state} = useLocation();
    const {state} = useContext(GroupContext);
    const [groupName, setGroupName] = useState(state.groupName);
    const [groupImg, setGroupImg] = useState(state.groupImg);
    const [groupUserList, setGroupUserList] = useState(state.groupUserList);
    const history = useHistory();

    const {groupIdx, year, month, day} = useParams();
    const dayName = moment(`${year}-${month}-${day}`).format('ddd');
    console.log(year, month, day);

    const [showAddPost, setShowAddPost] = useState(false);

    const [postList, setPostList] = useState([]);

    // sample friends
    const friendList = [
        {id: 0, name: "Minju", color: "#FFA897"},
        {id: 1, name: "Nakyoung", color: "#B6E8FD"},
        {id: 2, name: "Jikyang", color: "#FEBBFF"}
    ];

    // sample comment list


    useEffect(async () => {
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });

        await instance.get(`/api/postList?matchingroomId=${groupIdx}&postDate=${`${year}-${month<10? `0${month}`: month}-${day<10? `0${day}`: day}`}`,config)
            .then(res => {
                setPostList(res.data.value);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

            // console.log(location);
        await setGroupName(state.groupName);
        await setGroupImg(state.groupImg);
        await setGroupUserList(state.groupUserList);
    },[]);

    return(

        <Box sx={{display: "flex", width: "100%", justifyContent:"center"}}>
            <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            {
            showAddPost ?
                <AddPost 
                    setShowAddPost={setShowAddPost} 
                    year={year} 
                    month={month} 
                    day={day} 
                    dayName={dayName}
                    matchingRoomId={groupIdx}/>
                :
                <Box sx={{width: "100%", padding: "20px"}}>
                    <Box sx={{marginBottom: "20px"}}>
                        <BackBtn nextLoc={`/home/diary/${groupIdx}`} />
                    </Box>
                    <Typography variant="h5">
                        {`${year}/${month}/${day}/${dayName}`}
                    </Typography>
                    <Box sx={{marginBottom: "20px",width: "90%", display:"flex", alignItems: "center", justifyContent: "space-between"}}>
                        <FriendList friendList={friendList}/>
                        <PlusBtn setShowContents={setShowAddPost} desc={"+ Add Post"}/>
                    </Box>
                    <Box sx={{marginBottom: "20px",width: "90%", display:"flex", flexDirection:"column", alignItems:"center"}}>
                    {
                        postList.map(post =>                 
                            <Post 
                                title={post.title}
                                description={post.content}
                                postIdx={post.postId}
                                writer = {post.userNickname}
                                postDate = {post.postDate}
                                />)
                    }
                    </Box>
                    {/* <Box sx={{width: "90%", display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Box sx={{width: "100%", borderBottom: "1px solid #7c7c7c", display: "flex", alignItems: "center"}}>
                            <Typography variant="h5" sx={{marginRight: "10px"}}>Comment</Typography>
                            <Typography variant="body1" color="secondary">{commentList.length}</Typography>
                        </Box>
                        <CommentList commentList={commentList} isReply={false} />
                    </Box> */}
                </Box>
            }

        </Box>
    );
}

export default Day;