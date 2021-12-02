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

import "./Chat.css";

const sockJS = new SockJS("http://3.37.167.224:8080/api/ws-stomp");
const stompClient  = Stomp.over(sockJS);

function NewContents({messageEndRef, groupIdx, user, srcLang, destLang}){
  const [newContents, setNewContents] = useState([]);

  const onMessageReceived = async (payload) => {
     var newChatList = JSON.parse(sessionStorage.getItem('newChats'));
     var newData =JSON.parse(payload.body);
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

  var beforeTime = null;

  return(
    <Box>
    {
      newContents.map((elem, index) => {
        if(index === 0){
          var splitedDate = null;
          if(elem.chatDate)
            splitedDate = moment(elem.chatDate).add(9, 'h');
          else
            splitedDate = moment(elem.time).add(9, 'h');

          var timeString = moment(splitedDate).format("dddd, MMMM Do YYYY");
          beforeTime = splitedDate;

          return(
          <>
            <DayInfoMessage time={timeString}/>
            <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
              isGrouped={false} time={splitedDate.format("LT")}/>
          </>
          );
        }else{
          var splitedDate = null;
          if(elem.chatDate)
            splitedDate = moment(elem.chatDate).add(9, 'h');
          else
            splitedDate = moment(elem.time).add(9, 'h');
          
          if(splitedDate.isSame(beforeTime, 'day')){
            if(splitedDate.isAfter(beforeTime, 'minute')){
              beforeTime = splitedDate;
              return(
                <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                  isGrouped={false} time={splitedDate.format("LT")}/>
              );
            }else{
              beforeTime = splitedDate;
              return(
                <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                  isGrouped={true} time={splitedDate.format("LT")}/>
              );
            }
          }else{
            var timeString = moment(splitedDate).format("dddd, MMMM Do YYYY");
            beforeTime = splitedDate;
            return(
              <>
                <DayInfoMessage time={timeString} />
                <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                  isGrouped={false} time={splitedDate.format("LT")}/>
              </>
              );
          }
            
        }}

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
    <Box sx={{width: "100%", position: "sticky", bottom: "0", backgroundColor:"white",height: "100px", zIndex: "100", display:"flex"}}>
    <TextField
      multiline
      rows={4}
      variant="standard"
      onChange={handleChange}
      value={message}
      sx={{ height: "100%", width: "90%"}}
    />
    <Button variant="contained" onClick={handleClick} sx={{ height: "100%", width:"10%"}} disabled={message===""}>Send</Button>
  </Box>
  );
}


const Chat = () => {
  const groupInfo = JSON.parse(localStorage.getItem('curGroup'));
  const [groupName, setGroupName] = useState(groupInfo.groupName);
  const [groupImg, setGroupImg] = useState(groupInfo.groupImg);
  const [groupUserList, setGroupUserList] = useState(groupInfo.groupUserList);
  const user = JSON.parse(window.localStorage.getItem('user'));

  const {groupIdx} = useParams();

  const [srcLang, setSrcLang] = useState("en");
  const [destLang, setDestLang] = useState("ko");

  stompClient.debug= () => {};

  const [originalContents, setOriginalContents] = useState([]);
  

  const messageEndRef = useRef();


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
      // console.log(res.data.value);
        if(res.data.result){
          setOriginalContents(res.data.value);
        }
        else{
          console.log("res.data.result === false");
          // alert("error while calling chatting history");
        }
    })
    .catch(err =>{
      console.log(`error: ${err}`);
      // alert("error while calling chatting history");
    });

    // await localStorage.setItem('NumOfSeenChat', contents.length);
    await messageEndRef.current.scrollIntoView();
    sessionStorage.setItem('newChats', JSON.stringify([]));
    // console.log("chat: ", contents.length);

  }, []);
  
  var beforeTime = null;


    return(
      <Box sx={{display:"flex", height:"100vh", overflow:"hidden"}}>
        <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
        <Box sx={{width: "50%", paddingTop:"20px", display: "flex", flexDirection: "column", height: "100vh"}}>
          <Box sx={{width: "100%", display: "flex", position: "sticky", zIndex: "100",top:"0", backgroundColor:"white"}}>
            <Setting srcLang = {srcLang} setSrcLang={setSrcLang} destLang={destLang} setDestLang={setDestLang}/>
          </Box>
          <Box sx={{width: "100%", padding: "20px", overflow: "auto"}} className="container">
            {
              originalContents.map((elem,index) => {
                if(index === 0){
                  var splitedDate = moment(elem.chatDate).add(9, 'h');
                  var timeString = moment(splitedDate).format("dddd, MMMM Do YYYY");
                  beforeTime = splitedDate;

                  return(
                  <>
                    <DayInfoMessage time={timeString}/>
                    <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                      isGrouped={false} time={splitedDate.format("LT")}/>
                  </>
                  );
                }else{
                  var splitedDate = null;
                  if(elem.chatDate)
                    splitedDate = moment(elem.chatDate).add(9, 'h');
                  else
                    splitedDate = moment(elem.time).add(9, 'h');
                  
                  if(splitedDate.isSame(beforeTime, 'day')){
                    if(splitedDate.isAfter(beforeTime, 'minute')){
                      beforeTime = splitedDate;
                      return(
                        <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                          isGrouped={false} time={splitedDate.format("LT")}/>
                      );
                    }else{
                      beforeTime = splitedDate;
                      return(
                        <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                          isGrouped={true} time={splitedDate.format("LT")}/>
                      );
                    }
                  }else{
                    var timeString = moment(splitedDate).format("dddd, MMMM Do YYYY");
                    beforeTime = splitedDate;
                    return(
                      <>
                        <DayInfoMessage time={timeString}/>
                        <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                          isGrouped={false} time={splitedDate.format("LT")}/>
                      </>
                      );
                  }
                    
                }
              })    
            }
            <NewContents messageEndRef={messageEndRef} groupIdx={groupIdx} user={user} srcLang={srcLang} destLang={destLang}/>
            <div ref={messageEndRef}></div>
          </Box>
            <InputContainer groupIdx={groupIdx} email={user.email} />
            
        </Box>
      </Box>
    );

}

export default Chat;