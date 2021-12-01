import React , {useState, useRef} from 'react';
import { Button, List, TextField, Box, Typography ,ListItem, ListItemAvatar, ListItemText, Avatar, ButtonGroup} from '@mui/material';
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
    );
}

function Reply({ commentDate, content, writer, imgSrc ,isUser, commentId, setCommentList, postId}){
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(content);
    const timeObj = moment(commentDate).add(9, 'h');

    const handleEditButton = (e) => {
        e.preventDefault();
        setEditMode(true);
    }

    const handleEditSaveButton = async (e) => {
        // e.preventDefault();
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });
        
        const data = {
            changeContent: editedContent,
            commentId: commentId
        };

        await instance.put(`/api/updateComment`,data, config)
            .then(res => {
                alert("updated");
            })
            .catch(err => {
                console.log(err);
            });

        await setEditMode(false);

        await instance.get(`/api/commentList?postId=${postId}`,config)
        .then(res => {
            setCommentList(res.data.value);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleDeleteButton = async (e) => {
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });


        await instance.delete(`/api/deleteComment?commentId=${commentId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                alert(res.data.value);
            })
            .catch(err => {
                alert(err);
            });

        await instance.get(`/api/commentList?postId=${postId}`,config)
            .then(res => {
                setCommentList(res.data.value);
            })
            .catch(err => {
                console.log(err);
            });
    }

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
                    {
                        isUser && editMode?
                        <>
                            <TextField
                                label="Edit comment"
                                variant="standard"
                                value={editedContent}
                                onChange={(e) => {e.preventDefault(); setEditedContent(e.target.value)}}
                                multiline
                                >
                            </TextField>
                            <ButtonGroup variant="outlined" sx={{marginRight:"10px", display:"flex", fontSize: '13px'}}>
                                <Button color="success" sx={{fontSize: '13px'}} onClick={handleEditSaveButton}>Save</Button>
                                <Button color="error" sx={{fontSize: '13px'}} onClick={(e) => {e.preventDefault(); setEditMode(false);}}>Cancel</Button>
                            </ButtonGroup>
                        </>
                        :
                        <ListItemText primary={content} />
                    }
                </Box>
                <Box sx={{ display: "flex"}}>
                    {
                        isUser && !editMode?
                        <ButtonGroup variant="outlined" sx={{marginRight:"10px", display:"flex", fontSize: '13px'}}>
                            <Button color="success" sx={{fontSize: '13px'}} onClick={handleEditButton}>Edit</Button>
                            <Button color="error" sx={{fontSize: '13px'}} onClick={handleDeleteButton}>Delete</Button>
                        </ButtonGroup>
                        :
                        null
                    }
                </Box>
            </Box>
        </ListItem>
    );
}

function ReplyList({replyList, parentCommentId, postId, setCommentList}){
    const user = JSON.parse(localStorage.getItem('user'));
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
                                    isUser={elem.email === user.email}
                                    commentId={elem.commentId}
                                    setCommentList={setCommentList}
                                    postId={postId}
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

function Comment({childComment, commentDate, content, writer,isUser, imgSrc, isReply, commentId, postId, setCommentList}){
    const [seeReply, setSeeReply] = useState(false);
    const timeObj = moment(commentDate).add(9, 'h');

    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const handleClick = (e) => {
        e.preventDefault();
        setSeeReply(!seeReply);
    }

    const handleEditButton = (e) => {
        e.preventDefault();
        setEditMode(true);
    }

    const handleEditSaveButton = async (e) => {
        // e.preventDefault();
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });
        
        const data = {
            changeContent: editedContent,
            commentId: commentId
        };

        await instance.put(`/api/updateComment`,data, config)
            .then(res => {
                alert("updated");
            })
            .catch(err => {
                console.log(err);
            });

        await setEditMode(false);

        await instance.get(`/api/commentList?postId=${postId}`,config)
        .then(res => {
            setCommentList(res.data.value);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleDeleteButton = async (e) => {
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });


        await instance.delete(`/api/deleteComment?commentId=${commentId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                alert(res.data.value);
            })
            .catch(err => {
                alert(err);
            });

        await instance.get(`/api/commentList?postId=${postId}`,config)
            .then(res => {
                setCommentList(res.data.value);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return(
        <>
        <ListItem style={{width: "100%",  marginBottom: "10px", display: "flex", flexDirection:"column"}}>
            <Box sx={{display: "flex", width: "100%", flexDirection: "column"}}>
                <Box sx={{display: "flex", alignItems: "center", width:"100%"}}>
                    <Box sx={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                        <ListItemAvatar>
                            <Avatar src={imgSrc}></Avatar>
                        </ListItemAvatar>
                        
                        <ListItemText primary={writer} secondary={timeObj.format("MMM Do YYYY, h:mm a")}/>
                    </Box>
                    {
                        editMode?
                        <>
                            <TextField
                                label="Edit comment"
                                variant="standard"
                                value={editedContent}
                                onChange={(e) => {e.preventDefault(); setEditedContent(e.target.value)}}
                                multiline
                                >
                            </TextField>
                            <ButtonGroup variant="outlined" sx={{marginRight:"10px", display:"flex", fontSize: '13px'}}>
                                <Button color="success" sx={{fontSize: '13px'}} onClick={handleEditSaveButton}>Save</Button>
                                <Button color="error" sx={{fontSize: '13px'}} onClick={(e) => {e.preventDefault(); setEditMode(false);}}>Cancel</Button>
                            </ButtonGroup>
                        </>
                        :
                        <ListItemText primary={content} />
                    }
                    
                </Box>
                <Box sx={{ display: "flex"}}>
                    {
                        isUser && !editMode?
                        <ButtonGroup variant="outlined" sx={{marginRight:"10px", display:"flex", fontSize: '13px'}}>
                            <Button color="success" sx={{fontSize: '13px'}} onClick={handleEditButton}>Edit</Button>
                            <Button color="error" sx={{fontSize: '13px'}} onClick={handleDeleteButton}>Delete</Button>
                        </ButtonGroup>
                        :
                        null
                    }

                {
                    isReply || editMode?
                    null
                    :
                    <Button size="small" onClick={handleClick} color="primary">{seeReply? "Hide Reply":"Write / See Reply"}</Button>
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
    const user = JSON.parse(localStorage.getItem('user'));

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
                                    isUser = {elem.email === user.email}
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