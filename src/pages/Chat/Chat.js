import React, { useRef, useEffect, useState, useContext, useMemo,useCallback } from 'react';
import { Link ,useParams, useLocation} from 'react-router-dom';
import axios from "axios";

import {Box, TextField, Button} from '@mui/material';
import GroupSidebar from "../../components/GroupSidebar";
import Setting from './Setting';
import Message from './Message';
import DayInfoMessage from './DayInfoMessage';
import {GroupContext} from "../../context/index";

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import "./Chat.css";


const sockJS = new SockJS("http://3.37.167.224:8080/api/ws-stomp");
const stompClient  = Stomp.over(sockJS);

const InputContainer = ({groupIdx, email, stompClient}) => {
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
    <Box sx={{width: "100%", position: "sticky", bottom: "0", backgroundColor:"white",height: "100px", zIndex: "100"}}>
    <TextField
      multiline
      rows={4}
      variant="standard"
      onChange={handleChange}
      value={message}
      sx={{ height: "100%", minWidth:"90%"}}
    />
    <Button variant="contained" onClick={handleClick} sx={{ height: "100%", minWidth:"10%"}} disabled={message===""}>Send</Button>
  </Box>
  );
}


const Chat = () => {
  const {state} = useContext(GroupContext);
  const [groupName, setGroupName] = useState(state.groupName);
  const [groupImg, setGroupImg] = useState(state.groupImg);
  const [groupUserList, setGroupUserList] = useState(state.groupUserList);
  const user = JSON.parse(window.localStorage.getItem('user'));

  const {groupIdx} = useParams();

  const [srcLang, setSrcLang] = useState("en");
  const [destLang, setDestLang] = useState("ko");

  stompClient.debug= () => {};

  const [contents, setContents] = useState([]);
  const messagesEndRef = useRef();

  const onMessageReceived = (payload) => {
    
    setContents([...contents, JSON.parse(payload.body)]);
    console.log("received message successfully");
    messagesEndRef.current.scrollIntoView();
  }

  const onConnected = () => {
    stompClient.subscribe(`/sub/chat/room/${groupIdx}`, onMessageReceived);
    console.log("connected successfully", stompClient);
    // messagesEndRef.current.scrollIntoView();
  }

  const onError = (error) => {
    console.log("Can't connect to chat server. Please try agian");
  }

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
          setContents(res.data.value);
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
    await messagesEndRef.current.scrollIntoView();

    // console.log("chat: ", contents.length);
  }, []);

  useEffect( async() => {
    await stompClient.connect({},onConnected, onError);
  }, [contents]);


  var year = null;
  var month = null;
  var date = null;
  var hour = null;
  var min = null;

    return(
      <Box sx={{display:"flex", height:"100vh", overflow:"hidden"}}>
        <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
        <Box sx={{width: "50%", paddingTop:"20px", display: "flex", flexDirection: "column", height: "100vh"}}>
          <Box sx={{width: "100%", display: "flex", position: "sticky", zIndex: "100",top:"0", backgroundColor:"white"}}>
            <Setting srcLang = {srcLang} setSrcLang={setSrcLang} destLang={destLang} setDestLang={setDestLang}/>
          </Box>
          <Box sx={{width: "100%", padding: "20px", overflow: "auto"}} className="container">
            {
              contents.map((elem,index) => {
                if(index === 0){
                  var splitedDate = elem.chatDate.split('T');
                  var curYMD = splitedDate[0].split('-');
                  year = curYMD[0];
                  month = curYMD[1];
                  date = curYMD[2];
                  var curHM = splitedDate[1].split(':');
                  hour = parseInt(curHM[0]);
                  min = parseInt(curHM[1]);

                  return(
                  <>
                    <DayInfoMessage year={year} month={month} date={date}/>
                    <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                      isGrouped={false} hour={curHM[0]} min={curHM[1]}/>
                  </>
                  );
                }else{
                  var splitedDate = null;
                  if(elem.chatDate)
                    splitedDate = elem.chatDate.split('T');
                  else
                    splitedDate = elem.time.split('T');
                  
                  var curYMD = splitedDate[0].split('-');
                  var curHM = splitedDate[1].split(':');

                  if(year === curYMD[0] && month===curYMD[1] && date===curYMD[2]){
                    if(parseInt(curHM[0]) === hour && parseInt(curHM[1]) === min){
                      return(
                        <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                          isGrouped={true}/>
                      );
                    }else{
                      hour = parseInt(curHM[0]);
                      min = parseInt(curHM[1]);

                      return(
                        <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                          isGrouped={false} hour={curHM[0]} min={curHM[1]}/>
                      );
                    }

                  }else{
                    year = curYMD[0];
                    month= curYMD[1];
                    date=curYMD[2];
                    return(
                      <>
                        <DayInfoMessage year={year} month={month} date={date} />
                        <Message nickname={elem.nickname} image={elem.image} content={elem.message} isUserSent={user.email === elem.email} srcLang={srcLang} dstLang={destLang} 
                          isGrouped={false} hour={curHM[0]} min={curHM[1]}/>
                      </>
                      );
                  }
                }
              })    
            }
            <div ref={messagesEndRef}></div>
          </Box>
            <InputContainer groupIdx={groupIdx} email={user.email} stompClient={stompClient}/>
        </Box>
      </Box>
    );

}

export default Chat;