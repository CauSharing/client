import React , {useState, useRef} from 'react';
import { Button, List, TextField, Box, Typography ,ListItem, ListItemAvatar, ListItemText, Avatar} from '@mui/material';
import { styled } from '@mui/material/styles';

import axios from "axios";
import moment from 'moment';

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


function NewComment({imgSrc, isReply, parentCommentId, postId, setCommentList}){
    const [newComment, setNewComment] = useState("");
    let textInput = useRef(null);

    const handleClick = async (e) => {
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });

        
        const data = {
            content: newComment,
            parentCommentId: isReply? parentCommentId: 0,
            postId: postId
        };

        await instance.post('/api/createComment',data, config)
           .then(res => {
               console.log(res);
               if(res.data.result){
                    
               }
               else{
                   alert("error!");
               }
           })
           .catch(err =>{
               alert("error");
           });

        await instance.get(`/api/commentList?postId=${postId}`,config)
           .then(res => {
               setCommentList(res.data.value);
           })
           .catch(err => {
               console.log(err);
           });
        textInput.current.value = "";
    }
    return(
        <ListItem style={{width:"100%", marginBottom: "10px"}}>
            <ListItemAvatar>
                <Avatar src={imgSrc} size="small" sx={{width: isReply?"30px":null, height: isReply? "30px":null}}>
                </Avatar>
            </ListItemAvatar>
            <TextField
                label="Add comment"
                variant="standard"
                style={{width: "90%"}}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                multiline
                inputRef={textInput}
                />
            <Button onClick={handleClick} disabled={newComment===""} color="primary" variant="outlined">Reply</Button>
        </ListItem>
        // <div className="day__commentBox__newComment">
        //     <img src={imgSrc}/>
        //     <input placeholder="Add Comment"/>
        //     <AddReplyButton >+</AddReplyButton>
        // </div>
    );
}

function Reply({ commentDate, content, writer, imgSrc}){
    const timeObj = moment(commentDate).add(9, 'h');

    return(
        <ListItem style={{width: "100%",  marginBottom: "10px", display: "flex", flexDirection:"column"}}>
            <Box sx={{display: "flex", width: "100%", flexDirection: "column"}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Box sx={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                        <ListItemAvatar>
                            <Avatar src={imgSrc} sx={{width: "30px", height: "30px"}}></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={writer} secondary={timeObj.format("MMM Do YYYY, h:mm a")}/>
                    </Box>
                    <ListItemText primary={content} />
                </Box>
            </Box>
        </ListItem>
    );
}

function ReplyList({replyList, parentCommentId, postId, setCommentList}){
    return(
        <Box sx={{display: "flex", width: "100%", flexDirection: "column", marginLeft: "20px"}}>
            <NewComment imgSrc={null} isReply={true} parentCommentId={parentCommentId} postId={postId} setCommentList={setCommentList}/>
            {
                replyList ?
                <Box sx={{display: "flex", width: "100%"}}>
                <List
                    sx={{ bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    >
                        
                        {
                            replyList.map(elem => 
                                <Reply 
                                    childComment={elem.childComment}
                                    commentDate={elem.commentDate}
                                    content={elem.content}
                                    writer={elem.nickname}
                                    imgSrc={elem.imgSrc} 
                                    />)
                        }
                </List>
                </Box>
                :
                null
            }

        </Box>
    );
}

function Comment({childComment, commentDate, content, writer, imgSrc, isReply, commentId, postId, setCommentList}){
    // const nameStyle = {
    //     background: color
    // };
    const [seeReply, setSeeReply] = useState(false);
    // const [open, setOpen] = useState(true);

    // const handleOpenReply = () => {
    //   setOpen(!open);
    // };
    // const [cDate, setCDate] = useState(new Date(commentDate));
    const timeObj = moment(commentDate).add(9, 'h');

    const handleClick = (e) => {
        e.preventDefault();
        setSeeReply(!seeReply);
    }
    return(
        <>
        <ListItem style={{width: "100%",  marginBottom: "10px", display: "flex", flexDirection:"column"}}>
            <Box sx={{display: "flex", width: "100%", flexDirection: "column"}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Box sx={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                        <ListItemAvatar>
                            <Avatar src={imgSrc}></Avatar>
                        </ListItemAvatar>
                        
                        <ListItemText primary={writer} secondary={timeObj.format("MMM Do YYYY, h:mm a")}/>
                    </Box>
                    <ListItemText primary={content} />
                </Box>
                <Box sx={{maxWidth: "150px", display: "flex"}}>
                    <Box sx={{width: "20px"}}></Box>
                {
                    isReply?
                    null
                    :
                    <Button size="small" onClick={handleClick} color="primary">{seeReply? "Hide Reply":"Write / See Reply"}</Button>
                    // <ReplyButton variant="outlined" size="small" onClick={handleClick}>{seeReply? "Hide Reply":"See Reply"}</ReplyButton>
                }
                </Box>
            </Box>

                
        </ListItem>
        <Box sx={{width: "100%"}}>     
        {seeReply ? 
                <ReplyList replyList={childComment} parentCommentId={commentId} postId={postId} setCommentList={setCommentList}/>
                :       
                null}
        </Box>
        </>
    );
}

function CommentList({commentList, isReply, postId, setCommentList}){
    return(
        <Box sx={{display: "flex", width: "100%", flexDirection: "column"}}>
            <NewComment imgSrc={null} postId={postId} setCommentList={setCommentList}/>
            <Box sx={{display: "flex", width: "100%"}}>
                <List
                    sx={{ bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    >
                        
                        {
                            commentList.map(elem => 
                                <Comment 
                                    commentId={elem.commentId}
                                    childComment={elem.childComment}
                                    commentDate={elem.commentDate}
                                    content={elem.content}
                                    writer={elem.nickname}
                                    imgSrc={elem.imgSrc} 
                                    isReply={isReply}
                                    postId={postId}
                                    setCommentList={setCommentList}/>)
                        }
                </List>
            </Box>
        </Box>
    );
}

export default CommentList;