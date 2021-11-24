import React, { useRef, useEffect, useState } from 'react';
import { Link ,useParams, useLocation} from 'react-router-dom';
import axios from "axios";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {ArrowButton, MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar ,Conversation, Search, ConversationList, Sidebar} from '@chatscope/chat-ui-kit-react';

import GroupSidebar from "../../components/GroupSidebar";

import "./Chat.css";

const Chat = () => {
  const [groupName, setGroupName] = useState("");
  const [groupImg, setGroupImg] = useState("#");
  const [groupUserList,setGroupUserList] = useState([]);

    const inputRef = useRef();
    const [msgInputValue, setMsgInputValue] = useState("");
    const [messages, setMessages] = useState([]);

    const {groupIdx} = useParams();
    const location = useLocation();
  
    const handleSend = message => {
      setMessages([...messages, {
        message,
        direction: 'outgoing',
         payload: <Message.CustomContent>
                    <button>Translate</button>
                  </Message.CustomContent>
      }]);
      setMsgInputValue("");
      inputRef.current.focus();
    };

    useEffect(() => {
      setGroupName(location.state.groupName);
      setGroupImg(location.state.groupImg);
      setGroupUserList(location.state.groupUserList);
    }, []);

    return(
      <>
        <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
        <div style={{height: "600px", position: "relative"}} className="chatBox">
  
        <ArrowButton direction="left" />
          <MainContainer responsive>
          <Sidebar position="left" scrollable={false}>
                    <Search placeholder="Search..." />
                    <ConversationList>                                                     
                      <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                        <Avatar src={"#"} name="Lilly" status="available" />
                      </Conversation>
                      
                      <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                        <Avatar src={"#"} name="Joe" status="dnd" />
                      </Conversation>
                      
                      <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                        <Avatar src={"#"} name="Emily" status="available" />
                      </Conversation>
                      
                      <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                        <Avatar src={"#"} name="Kai" status="unavailable" />
                      </Conversation>
                                  
                      <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                        <Avatar src={"#"} name="Akane" status="eager" />
                      </Conversation>
                                          
                      <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                        <Avatar src={"#"} name="Eliot" status="away" />
                      </Conversation>
                                                          
                      <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active>
                        <Avatar src={"#"} name="Zoe" status="dnd" />
                      </Conversation>
                      
                      <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                        <Avatar src={"#"} name="Patrik" status="invisible" />
                      </Conversation>
                                                                               
                    </ConversationList>
                  </Sidebar>
            <ChatContainer>       
              <MessageList>
                {
                  messages.map((m, i) => 
                    <Message key={i} model={{
                      message: m.message,
                      payload: <Message.CustomContent>
                                  <button>Translate</button>
                               </Message.CustomContent>}}>
                      <Avatar src={"#"} name="Akane" />
                        
                    </Message>
                  )
                }
                </MessageList>
                <MessageList 
                  scrollBehavior="smooth">
                  {messages.map((m, i) => <Message key={i} model={m} />)}
                </MessageList>   
                <MessageInput 
                  placeholder="Type message here" 
                  onSend={handleSend} 
                  onChange={setMsgInputValue} 
                  value={msgInputValue} 
                  ref={inputRef} />
            </ChatContainer>
          </MainContainer>
        </div>
      </>
    );

}

export default Chat;