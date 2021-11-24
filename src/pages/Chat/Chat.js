import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link ,useParams, useLocation} from 'react-router-dom';
import axios from "axios";

import {Box} from '@mui/material';
import GroupSidebar from "../../components/GroupSidebar";
import Setting from './Setting';
import Message from './Message';
import {GroupContext} from "../../context/index";

import "./Chat.css";

const Chat = () => {
  const {state} = useContext(GroupContext);
  const [groupName, setGroupName] = useState(state.groupName);
  const [groupImg, setGroupImg] = useState(state.groupImg);
  const [groupUserList, setGroupUserList] = useState(state.groupUserList);

  const {groupIdx} = useParams();

  const [srcLang, setSrcLang] = useState("");
  const [destLang, setDestLang] = useState("");

  useEffect(async () => {
    await setGroupName(state.groupName);
    await setGroupImg(state.groupImg);
    await setGroupUserList(state.groupUserList);
  }, []);


    return(
      <Box sx={{display:"flex"}}>
        <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
        <Box sx={{width: "100%", paddingTop:"20px", display: "flex", flexDirection: "column", height: "100%"}}>
          <Box sx={{width: "100%", display: "flex", justifyContent: "end", position: "sticky", zIndex: "100",top:"0"}}>
            <Setting srcLang = {srcLang} setSrcLang={setSrcLang} destLang={destLang} setDestLang={setDestLang}/>
          </Box>
          <Box sx={{width: "100%", padding: "20px"}}>
            <Message user={{nickname: "mj", image: null}} content="hello world" isUserSent={false}/>
            <Message user={{nickname: "mj", image: null}} content="hello world" isUserSent={false}/>
            <Message user={{nickname: "mj", image: null}} content="hello world" isUserSent={false}/>
            <Message user={{nickname: "mj", image: null}} content="hello world" isUserSent={false}/>
            <Message user={{nickname: "mj", image: null}} content="hello world" isUserSent={false}/>
            <Message user={{nickname: "mj", image: null}} content="hello world" isUserSent={false}/>
            <Message user={{nickname: "mj", image: null}} content="hello world" isUserSent={false}/>
            <Message user={{nickname: "mj", image: null}} content="hello world" isUserSent={false}/>
            <Message user={{nickname: "mj", image: null}} content="hello world" isUserSent={false}/>
          </Box>
          <Box sx={{width: "100%", position: "sticky", bottom: "0", backgroundColor:"black",height: "100px", zIndex: "100"}}>
sdfsdf
          </Box>
        </Box>
      </Box>
    );

}

export default Chat;