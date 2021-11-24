import React, {useState, useRef, useEffect} from "react";
import {useParams, useHistory } from 'react-router-dom';
import moment from "moment";
import GroupSidebar from "../components/GroupSidebar";
import axios from "axios";
import PlusBtn from "../components/PlusBtn";
import BackBtn from "../components/BackBtn";
import PinkPlus from "../icons/pink-plus.png";
import "./Day.css";

import MyEditor from "../components/Editor";
import EditPost from "./EditPost";

import { Button, List, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


let sample_img = "https://w.namu.la/s/adb56b09aef6d27319fe0fed21df3cf9e282fe7964308413845ab53649de0ac7e4003aa7abb7b2fe51b934bfc22b68d7183381a532e6ffca6849ad42672b4fc580161f61963aefaa808acaa4c788504ec2212a4a827718b8451f23098f8f24d7fa2d12cb721787c3cd3e098b609a9555";
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
  
  const ReplyButton = styled(Button)({
    fontSize: '13px',
    width: '90px',
    height: '30px',
    boxShadow: 'none',
    textTransform: 'none',
    padding: '10px',
    lineHeight: 1.5,
    color: 'white',
    backgroundColor: '#3181C6',
    borderColor: '#0063cc',
    fontFamily: 'Roboto Condensed',
    marginLeft: '10px',
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

  const AddReplyButton = styled(Button)({
    fontSize: '13px',
    width: '90px',
    height: '30px',
    marginLeft: '10px',
    boxShadow: 'none',
    textTransform: 'none',
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

function NewComment({imgSrc}){
    return(
        // <ListItem style={{width:"1000px", marginBottom: "15px"}}>
        //     <ListItemAvatar>
        //         <Avatar src={imgSrc}>
        //         </Avatar>
        //     </ListItemAvatar>
        //     <TextField
        //         label="Add comment"
        //         variant="standard"
        //         style={{width: "800px"}}
        //         />
        //     <AddReplyButton >+</AddReplyButton>
        // </ListItem>
        <div className="day__commentBox__newComment">
            <img src={imgSrc}/>
            <input placeholder="Add Comment"/>
            {/* <button>+</button> */}
            <AddReplyButton >+</AddReplyButton>
        </div>
    );
}


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
        <div className="day__name" style={nameStyle}>
            {name}
        </div>
    );
}

function FriendList({friendList}){
    const friendCompList = [];

    for(const friend of friendList){
        friendCompList.push(<Friend name={friend.name} color={friend.color}/>);
    }

    return(
        <div className="day__nameList">
            {friendCompList}
        </div>
    );
}

function Post({title, description, postIdx}){
    const handleClick = (e) => {
        e.preventDefault();
        window.location.replace(window.location.href + `/${postIdx}/edit`);
    }
    return(
        <div className="day__post">
            <div className="day__post__line">
                <div className="day__post__title">{title}</div>
                <ColorButton className="day__post__editBtn" onClick={handleClick}>Edit</ColorButton>
            </div>
            {/* <div className="day__post__desc">{description}</div> */}
            <MyEditor initialValue={description} isViewer={true}/>
        </div>
    );
}

function Comment({childComment, commentDate, content, writer, imgSrc}){
    // const nameStyle = {
    //     background: color
    // };
    const [seeReply, setSeeReply] = useState(false);
    // const [open, setOpen] = useState(true);

    // const handleOpenReply = () => {
    //   setOpen(!open);
    // };
    const [cDate, setCDate] = useState(new Date(commentDate));

    const handleClick = (e) => {
        e.preventDefault();
        setSeeReply(!seeReply);
    }
    return(
        <div className="day__comment">
            <div className="day__comment__section">
                <div className="day__comment__left">
                    <img src={imgSrc}/>
                    <div className="day__comment__name" >{writer}</div>
                    <div className="day__comment__desc">{content}</div>
                </div>
                <ReplyButton variant="outlined" size="small" onClick={handleClick}>{seeReply? "Hide Reply":"See Reply"}</ReplyButton>
            </div>
            {
                seeReply?
                    <CommentList commentList={childComment} />
                    :
                    null
            }
        </div>
        // <>
        //     <ListItem style={{width: "1000px",  marginBottom: "15px", display: "flex", flexDirection:"column"}}>
        //         <div style={{display: "flex"}}>
        //       <ListItemAvatar>
        //         <Avatar src={imgSrc}></Avatar>
        //       </ListItemAvatar>
        //       <ListItemText primary={writer} secondary={`${cDate.getFullYear()}-${cDate.getMonth()}-${cDate.getDate()}`} style={{width:"200px"}} />
        //       <ListItemText primary={content} style={{width: "800px"}}/>
        //       <ReplyButton variant="outlined" size="small" onClick={handleClick}>{seeReply? "Hide Reply":"See Reply"}</ReplyButton>
        //       </div>
        //       {seeReply ? 
        //         <CommentList commentList={childComment} />
        //         :       
        //         null}
              
        //     </ListItem>

        // </>
    );
}

function CommentList({commentList}){
    return(
        <div className="day__commentBox">

            <List
                sx={{ bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                >
                    <NewComment imgSrc={sample_img} />
                    {
                        commentList.map(elem => 
                            <Comment 
                                childComment={elem.childComment}
                                commentDate={elem.commentDate}
                                content={elem.content}
                                writer={elem.writer}
                                imgSrc={elem.imgSrc} />)
                    }
            </List>
            
                
            
        </div>
    );
}
function Day({location}){
    // const {state} = useLocation();
    const history = useHistory();

    const [groupName, setGroupName] = useState(null);
    const [groupImg, setGroupImg] = useState(null);
    const [groupUserList, setGroupUserList] = useState([]);
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
    const commentList = [
        {
            childComment: [
                {
                    childComment: [],
                    commentDate: "2021-11-10T20:33:02.724Z",
                    commentId: 0,
                    content: "string",
                    writer: "string",
                    imgSrc: sample_img
                },
            ],
            commentDate: "2021-11-10T20:33:02.724Z",
            commentId: 0,
            content: "string",
            writer: "mj",
            imgSrc: sample_img
        },
        {
            childComment: [],
            commentDate: "2021-11-10T20:33:02.724Z",
            commentId: 0,
            content: "string",
            writer: "nk",
            imgSrc: sample_img
        },
        {
            childComment: [],
            commentDate: "2021-11-10T20:33:02.724Z",
            commentId: 0,
            content: "string",
            writer: "jk",
            imgSrc: sample_img
        },
    ];

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(`/api/postList?matchingroomId=${groupIdx}&postDate=${`${year}-${month<10? `0${month}`: month}-${day<10? `0${day}`: day}`}`,config)
            .then(res => {
                setPostList(res.data.value);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

            console.log(location);
        setGroupName(location.state.groupName);
        setGroupImg(location.state.groupImg);
        setGroupUserList(location.state.groupUserList);
    },[]);

    return(

        <div className="entireDay">
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
                <div className="day">
                    <div className="day__btns">
                        <BackBtn nextLoc={`/home/diary/${groupIdx}`} />
                    </div>
                    <div className="day__date">
                        {`${year}/${month}/${day}/${dayName}`}
                    </div>
                    <div className="day__line">
                        <FriendList friendList={friendList}/>
                        <PlusBtn setShowContents={setShowAddPost} desc={"+ Add Post"}/>
                    </div>
                    {
                        postList.map(post =>                 
                            <Post 
                                title={post.title}
                                description={post.content}
                                postIdx={post.Id}
                                />)
                    }

                    <div className="day__commentBox__title">
                        <div>Comment</div>
                        <div>{commentList.length}</div>
                    </div>
                    <CommentList commentList={commentList} />
                </div>
            }

        </div>
    );
}

export default Day;