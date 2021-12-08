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
import EditPost from "../SharpenPost";
import CommentList from './CommentList';

import {ButtonGroup, Button, List, TextField, Box, Typography ,
    CircularProgress ,Dialog, DialogTitle, DialogContent, DialogContentText,DialogActions} from '@mui/material';
import { styled } from '@mui/material/styles';

import randomColor from 'randomcolor';
import { makeStyles } from '@material-ui/core/styles';


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
  




function AddPost({matchingRoomId, setShowAddPost, year, month, day, dayName, setPostList}){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSaveBtn = async () => {
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });

        const sendData = {
            "content": content,
            "matchingRoomId": matchingRoomId,
            "postDate": `${year}-${month<10? `0${month}`:month}-${day<10? `0${day}`: day}T05:50:27.917Z`,
            "title": title
        };    

        console.log(sendData);
        await instance.post('/api/createPost',sendData, config)
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

        await instance.get(`/api/postList?matchingroomId=${matchingRoomId}&postDate=${`${year}-${month<10? `0${month}`: month}-${day<10? `0${day}`: day}`}`,config)
            .then(res => {
                setPostList(res.data.value);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

    };

    return(
        <Box sx={{width: "100%", display: "flex", flexDirection: "column", padding: "20px"}}>
            <BackBtn setShowContents={setShowAddPost}/>
            <Box sx={{width: "90%", display:"flex", justifyContent: "space-between", alignItems:"center",marginTop:"20px"}}>
                <Typography variant="h5">{`${year}/${month}/${day}/${dayName}`}</Typography>
                <ColorButton onClick={handleSaveBtn}>Save</ColorButton>
            </Box>
            <TextField 
                id="standard-basic" 
                label="Title" 
                variant="standard" 
                style={{marginBottom: "15px"}}
                onChange={(e) => setTitle(e.target.value)}
                sx={{width: "90%"}}/>
            <Box sx={{width:"90%"}}>
                <MyEditor initialValue={""} isViewer={false} setContent={setContent}/>
            </Box>
        </Box>
    )
}
function Friend({name, color}){
    return(
        <Box sx={{backgroundColor:color, padding: "10px", display: "flex", justifyContent: "center", 
        alignItems:"center", borderRadius: "5px", marginRight: "5px", minWidth: "20px", height: "100%", fontFamily: "Roboto Condensed"}}>
            {name}
        </Box>
    );
}

function FriendList({friendList}){
    const [friendCompList, setFriendCompList] = useState([]);

    useEffect( () => {

        var colors = randomColor({count: friendList.length, luminosity: 'bright',format: 'rgba', alpha: 0.5});
        var fl = [];
        friendList.map( (friend, index) => 
            fl.push(<Friend name={friend.nickname} color={colors[index]}/>));

        setFriendCompList(fl);

        var list = [];
        for(var i=0; i<friendList.length; i++){
            list.push({nickname: friendList[i].nickname, color: colors[i]});
        }
       
        localStorage.setItem('colorInfo', JSON.stringify(
            list
        ));
    },[]);

    return(
        <Box sx={{display:"flex", alignItems:"center", height: "100%"}}>
            {friendCompList}
        </Box>
    );
}

function Post({title, description, postIdx, writer, postDate, isUser,setOpenDeleteDialog, setDeletePost}){
    const [commentList, setCommentList] = useState([]);
    const timeObj = moment(postDate);

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
                // console.log(res);
                setCommentList(res.data.value);
            })
            .catch(err => {
                console.log(err);
            });
    },[]);


    const handleClick = (e) => {
        e.preventDefault();
        window.location.replace(window.location.href + `/${postIdx}/sharpen`);
    }

    const handleEditClick = (e) => {
        e.preventDefault();
        window.location.replace(window.location.href + `/${postIdx}/edit-post`);
    }
    
    const handleDeleteClick = (e) => {
        // e.preventDefault();
        setOpenDeleteDialog(true);
        setDeletePost({
            title: title,
            postIdx:postIdx
        });


    }
    
    return(
        <>
        
        <Box sx={{width: "100%", padding: "20px 0px",borderTop:"1px solid #7c7c7c"}}>
            <Box sx={{width: "100%", display: "flex", flexDirection: "column"}}>
                <Box sx={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Box sx={{width: "100%", display: 'flex', alignItems: "end"}}>
                        <Typography variant="h5" sx={{marginRight: "5px"}}>{title}</Typography>
                        <Typography variant="body2" color="secondary.main" sx={{marginRight: "5px"}}>{writer}</Typography>
                    </Box>    
                    <Box sx={{display:"flex"}}>           
                        {
                            isUser?
                            <ButtonGroup variant="outlined" sx={{marginRight:"10px", display:"flex"}}>
                                <Button color="success" onClick={handleEditClick}>Edit</Button>
                                <Button color="error" onClick={handleDeleteClick}>Delete</Button>
                            </ButtonGroup>
                            :
                            null
                        }
                        <ColorButton  onClick={handleClick}>Sharpening</ColorButton>
                    </Box> 
                </Box>
                <MyEditor initialValue={description} isViewer={true}/>
            </Box>
            <Box sx={{width: "100%", borderBottom: "1px solid #7c7c7c", display: "flex", alignItems: "center", marginTop: "20px"}}>
                <Typography variant="h5" sx={{marginRight: "10px"}}>Comment</Typography>
                <Typography variant="body1" color="secondary">{commentList.length}</Typography>
            </Box>
            <CommentList commentList={commentList} isReply={false} postId={postIdx} setCommentList={setCommentList}/>
        </Box>
        </>
    );
}

function DeletePostDialog({open, setOpen, deletePost, setDeletePost, groupIdx, year, month, day, setPostList}){
    const token = localStorage.getItem("userToken");
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setDeletePost(null);
        setOpen(false);
      };

    const handleYes = async () => {
        await setLoading(true);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });

        instance.delete(`/api/postDelete?postId=${deletePost.postIdx}`,config)
           .then(res => {
               console.log(res);
               if(res.data.result){
                    setDeletePost(null);
               }
               else{
                    console.log("Error");
               }
           })
           .catch(err =>{
               console.log(err);
           });
   
       await instance.get(`/api/postList?matchingroomId=${groupIdx}&postDate=${`${year}-${month<10? `0${month}`: month}-${day<10? `0${day}`: day}`}`,config)
           .then(res => {
               setPostList(res.data.value);
               console.log(res);
           })
           .catch(err => {
               console.log(err);
           });
        
        await setLoading(false);
        await setOpen(false);
    }

    return(
        
        deletePost?
        <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle color="error">
            {`Delete ${deletePost.title}?`}
            </DialogTitle>
            {
                loading?
                <DialogContent sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <CircularProgress />
                    <DialogContentText sx={{marginLeft:"5px"}}>
                        Loading...
                    </DialogContentText>
                </DialogContent>
                :
                <>
                    <DialogContent>
                        <DialogContentText>
                            {
                                "If you click 'yes', this post will be permanently deleted."
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            No
                        </Button>
                        <Button onClick={handleYes}>
                            Yes
                        </Button>
                    </DialogActions>
                </>
            }

        </Dialog>
        :
        null
    );
}

function Day({}){
    const user = JSON.parse(localStorage.getItem("user"));
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState("");
    const [groupUserList, setGroupUserList] = useState([]);

    const {groupIdx, year, month, day} = useParams();
    const timeObj = moment(`${year}-${month}-${day}`).add(9, 'h');
    const dayName = timeObj.format('ddd');

    const [showAddPost, setShowAddPost] = useState(false);
    const [postList, setPostList] = useState([]);

    const [postLoading, setPostLoading] = useState(false);

    const [openDeleteDialog,setOpenDeleteDialog] = useState(false);
    const [deletePost, setDeletePost] = useState(null);

    const classes = useStyles();

    useEffect(async () => {
        var groupInfo = JSON.parse(localStorage.getItem('curGroup'));
        setGroupName(groupInfo.groupName);
        setGroupImg(groupInfo.groupImg);
        setGroupUserList(groupInfo.groupUserList);

        await setPostLoading(true);

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

        
        await setPostLoading(false);
        
    },[]);

    return(

        <Box sx={{display: "flex", width: "100%", justifyContent:"center"}} className={classes.notebook}>
            <DeletePostDialog 
                open={openDeleteDialog} 
                setOpen={setOpenDeleteDialog} 
                deletePost={deletePost} 
                setDeletePost={setDeletePost}
                groupIdx={groupIdx}
                year={year}
                month={month}
                day={day}
                setPostList={setPostList}/>
            <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            {
                postLoading?
                <Box sx={{width: "100%",height: "100vh" ,padding: "20px", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
                    <CircularProgress />
                    <Typography variant="h5" color="primary" sx={{marginTop:"20px"}}>Loading</Typography>
                </Box>
                :
            showAddPost ?
                <AddPost 
                    setShowAddPost={setShowAddPost} 
                    year={year} 
                    month={month} 
                    day={day} 
                    dayName={dayName}
                    matchingRoomId={groupIdx}
                    setPostList={setPostList}/>
                :
                <Box sx={{width: "100%", padding: "20px"}}>
                    <Box sx={{marginBottom: "20px"}}>
                        <BackBtn nextLoc={`/home/group/${groupIdx}`} />
                    </Box>
                    <Typography variant="h5">
                        {timeObj.format("dddd, MMMM Do YYYY")}
                        {/* {`${year}/${month}/${day}/${dayName}`} */}
                    </Typography>
                    <Box sx={{marginBottom: "20px",width: "90%", display:"flex", alignItems: "center", justifyContent: "space-between",  margin: "20px 0px"}}>
                        <FriendList friendList={groupUserList}/>
                        <PlusBtn setShowContents={setShowAddPost} desc={"+ Add Post"}/>
                    </Box>
                    <Box sx={{marginBottom: "20px",width: "90%", display:"flex", flexDirection:"column", alignItems:"center"}}>
                    {
                        postList.length > 0 ?
                        postList.map(post =>                 
                            <Post 
                                title={post.title}
                                description={post.content}
                                postIdx={post.postId}
                                writer = {post.userNickname}
                                postDate = {post.postDate}
                                isUser={post.userEmail === user.email}
                                openDeleteDialog={openDeleteDialog}
                                setOpenDeleteDialog={setOpenDeleteDialog}
                                setDeletePost={setDeletePost}
                                />)
                        :
                        <Box sx={{width: "100%"}}>
                            <Typography variant="h5">No post</Typography>
                        </Box>
                    }
                    </Box>
                </Box>
            }

        </Box>
    );
}

export default Day;