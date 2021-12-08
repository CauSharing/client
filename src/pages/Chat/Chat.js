import React, { useRef, useEffect, useState, useContext, useMemo } from 'react';
import { Link ,useParams, useLocation} from 'react-router-dom';
import axios from "axios";

import {Box, TextField, Button} from '@mui/material';
import GroupSidebar from "../../components/GroupSidebar";
import Setting from './Setting';
import Message from './Message';
import DayInfoMessage from './DayInfoMessage';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';

import "./Chat.css";

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

const useChatStyles = makeStyles((theme) => ({
  notebook:{
    width:"50%",
    [theme.breakpoints.down('sm')]:{
      width:"100%",
    }
  }
}))

const sockJS = new SockJS("http://3.37.167.224:8080/api/ws-stomp");
const stompClient  = Stomp.over(sockJS);

function NewContents({messageEndRef, groupIdx, user, srcLang, destLang, groupUserList, lastMessage}){
  const [newContents, setNewContents] = useState([]);

  const onMessageReceived = async (payload) => {
     var newChatList = JSON.parse(sessionStorage.getItem('newChats'));
     var newData =JSON.parse(payload.body);
     var user = groupUserList.find(elem => elem.email === newData.email);
    newData["image"] = user? (user.image? user.image: null) : null;
    await sessionStorage.setItem('newChats',JSON.stringify([...newChatList, newData]));
    await setNewContents([...newChatList, newData]);
    await messageEndRef.current.scrollIntoView();
  }

  const onConnected = () => {
    stompClient.subscribe(`/sub/chat/room/${groupIdx}`, onMessageReceived);
  }

  const onError = (error) => {
    console.log("Can't connect to chat server. Please try agian");
  }

  useEffect(() => {
    stompClient.connect({},onConnected, onError);
  },[]);

  useEffect(() => {

  }, [newContents]);

  var beforeTime = lastMessage ? lastMessage.time : null;
  var beforeUser = lastMessage ? lastMessage.email : null;

  return(
    <Box>
    {
      newContents.map((elem, index) => {
        var splitedDate = null;
        if(elem.chatDate)
          splitedDate = moment(elem.chatDate).add(9, 'h');
        else
          splitedDate = moment(elem.time).add(9, 'h');

        if(beforeTime){
          if(!splitedDate.isSame(beforeTime, 'day')){
            var timeString = moment(splitedDate).format("dddd, MMMM Do YYYY");
            beforeTime = splitedDate;
            beforeUser = elem.email;
            return(
              <>
                <DayInfoMessage time={timeString} />
                <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                  isGrouped={false} time={splitedDate.format("LT")}/>
              </>
              );
          }else{
            if(!splitedDate.isAfter(beforeTime, 'minute') && beforeUser === elem.email){ //1분 이내에 보냄 & 이전 메시지를 보낸 사람이 나 자신일 때
                // 두가지 조건을 만족해야 프로필 정보가 안뜸
                beforeTime = splitedDate;
                return(
                  <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                    isGrouped={true} time={splitedDate.format("LT")}/>
                );
            }else{
              beforeTime = splitedDate;
              beforeUser = elem.email;
              return(
                <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                  isGrouped={false} time={splitedDate.format("LT")}/>
              );
            }
          }
        }else{
          var timeString = moment(splitedDate).format("dddd, MMMM Do YYYY");
          beforeTime = splitedDate;
          beforeUser = elem.email;
          return(
            <>
              <DayInfoMessage time={timeString} />
              <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                isGrouped={false} time={splitedDate.format("LT")}/>
            </>
            );          
        }
        
      }

      )}
    </Box>
  );
}

const InputContainer = ({groupIdx, email}) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    stompClient.send("/pub/chat/message",{},JSON.stringify({
      message:message,
      matchingRoomId:groupIdx,
      email:email
    }));

    setMessage("");
  };


  return(
    <Box sx={{width: "100%", position: "sticky", bottom: "0", backgroundColor:"white",maxHeight: "20vh", zIndex: "100", display:"flex", paddingLeft: '20px', marginTop:'20px'}}>
      <TextField
        multiline
        rows={4}
        variant="standard"
        onChange={handleChange}
        value={message}
        sx={{ height: "100%", width: "90%"}}
      />
      <Button variant="contained" onClick={handleClick} sx={{maxHeight: "20vh", width:"10%"}} disabled={message===""}>Send</Button>
  </Box>
  );
}


const Chat = () => {
  const groupInfo = JSON.parse(localStorage.getItem('curGroup'));
  const [groupName, setGroupName] = useState(groupInfo.groupName);
  const [groupImg, setGroupImg] = useState(groupInfo.groupImg);
  const [groupUserList, setGroupUserList] = useState(groupInfo.groupUserList);
  const [lastMessage, setLastMessage] = useState(null);
 
  const user = JSON.parse(window.localStorage.getItem('user'));

  const {groupIdx} = useParams();

  const [srcLang, setSrcLang] = useState("en");
  const [destLang, setDestLang] = useState("ko");

  stompClient.debug= () => {};

  const [originalContents, setOriginalContents] = useState([]);
  

  const messageEndRef = useRef();
  const classes = useStyles();
  const buttonClasses = useButtonStyles();
  const chatClasses = useChatStyles();

  useEffect(async () => {
    console.log("chat render");
    const instance = axios.create({
      timeout: 30000,
    });
    const token = localStorage.getItem("userToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    await instance.get(`/api/chatList?matchingRoomId=${groupIdx}`,config)
    .then(res => {
        if(res.data.result){
          setOriginalContents(res.data.value);
          if(res.data.value.length > 0){
            setLastMessage({
              time: moment(res.data.value[res.data.value.length-1].chatDate).add(9, 'h'),
              email: res.data.value[res.data.value.length-1].email});
          }
        }
        else{
          console.log("res.data.result === false");
        }
    })
    .catch(err =>{
      console.log(`error: ${err}`);
    });

    await messageEndRef.current.scrollIntoView();
    sessionStorage.setItem('newChats', JSON.stringify([]));
  }, []);
  
  var beforeTime = lastMessage ? lastMessage.time : null;
  var beforeUser = lastMessage ? lastMessage.email : null;


    return(
      <Box sx={{display:"flex",width:"100vw", height:"100vh"}} className={classes.notebook}>
        <GroupSidebar />
        <Box sx={{padding:"20px 5px", display: "flex", flexDirection: "column", height: "100vh"}} className={chatClasses.notebook}>
          <Setting srcLang = {srcLang} setSrcLang={setSrcLang} destLang={destLang} setDestLang={setDestLang} groupIdx={groupIdx}/>
          <Box sx={{width: "100%", padding: "20px", overflowY: "scroll", minHeight:"70vh"}} className="container">
            {
              originalContents?
              null
              :
              <Box sx={{minHeight:"70vh"}}>

              </Box>
            }
            {
              originalContents.map((elem,index) => {
                var splitedDate = null;
                if(elem.chatDate)
                  splitedDate = moment(elem.chatDate).add(9, 'h');
                else
                  splitedDate = moment(elem.time).add(9, 'h');
        
                if(beforeTime){
                  if(!splitedDate.isSame(beforeTime, 'day')){
                    var timeString = moment(splitedDate).format("dddd, MMMM Do YYYY");
                    beforeTime = splitedDate;
                    beforeUser = elem.email;
                    return(
                      <>
                        <DayInfoMessage time={timeString} />
                        <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                          isGrouped={false} time={splitedDate.format("LT")}/>
                      </>
                      );
                  }else{
                    if(!splitedDate.isAfter(beforeTime, 'minute') && beforeUser === elem.email){ //1분 이내에 보냄 & 이전 메시지를 보낸 사람이 나 자신일 때
                        // 두가지 조건을 만족해야 프로필 정보가 안뜸
                        beforeTime = splitedDate;
                        return(
                          <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                            isGrouped={true} time={splitedDate.format("LT")}/>
                        );
                    }else{
                      beforeTime = splitedDate;
                      beforeUser = elem.email;
                      return(
                        <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                          isGrouped={false} time={splitedDate.format("LT")}/>
                      );
                    }
                  }
                }else{
                  var timeString = moment(splitedDate).format("dddd, MMMM Do YYYY");
                  beforeTime = splitedDate;
                  beforeUser = elem.email;
                  return(
                    <>
                      <DayInfoMessage time={timeString} />
                      <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                        isGrouped={false} time={splitedDate.format("LT")}/>
                    </>
                    );          
                }
              })    
            }
            <NewContents 
              messageEndRef={messageEndRef} 
              groupIdx={groupIdx} 
              user={user} 
              srcLang={srcLang} 
              destLang={destLang} 
              groupUserList={groupUserList}
              lastMessage={lastMessage}/>
            <div ref={messageEndRef}></div>
          </Box>
          <InputContainer groupIdx={groupIdx} email={user.email} />
            
        </Box>
        
      </Box>
    );

}

export default Chat;