import React, {useState, useRef, useEffect} from "react";
import {useParams} from 'react-router-dom';
import moment from "moment";
import GroupSidebar from "../components/GroupSidebar";
import axios from "axios";
import PlusBtn from "../components/PlusBtn";
import BackBtn from "../components/BackBtn";
import PinkPlus from "../icons/pink-plus.png";
import "./Day.css";

import MyEditor from "../components/Editor";
import EditPost from "./EditPost";

import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// import AddIcon from '@mui/icons-material/Add';

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
    fontSize: '15px',
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
    fontSize: '15px',
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
        <div className="day__commentBox__newComment">
            <img src={imgSrc}/>
            <input placeholder="Add Comment"/>
            {/* <button>+</button> */}
            <AddReplyButton >+</AddReplyButton>
        </div>
    );
}


function AddPost({setShowAddPost, year, month, day, dayName}){
    return(
        <div className="addPost">
            <BackBtn setShowContents={setShowAddPost}/>
            <div className="addPost__line">
                <div className="addPost__date">{`${year}/${month}/${day}/${dayName}`}</div>
                <ColorButton>Save</ColorButton>
            </div>
           <MyEditor initialValue={"write"} isViewer={false}/>

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

function Comment({name, description, color, imgSrc}){
//     const nameStyle = {
//         background: color
//     };
    const [seeReply, setSeeReply] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setSeeReply(!seeReply);
    }
    return(
        <div className="day__comment">
            <div className="day__comment__section">
                <div className="day__comment__left">
                    <img src={imgSrc}/>
                    <div className="day__comment__name" >{name}</div>
        {/*             <div className="day__comment__name" style={nameStyle}>{name}</div> */}
                    <div className="day__comment__desc">{description}</div>
                </div>
                {/* <button onClick={handleClick}>{seeReply? "Hide Reply":"See Reply"}</button> */}
                <ReplyButton variant="outlined" size="small" onClick={handleClick}>{seeReply? "Hide Reply":"See Reply"}</ReplyButton>
            </div>

            {
                seeReply?
                    <div className="day__comment__replyBox">
                        <NewComment imgSrc={"#"} />
                    </div>
                    :
                    null
            }
        </div>
    );
}

function Day({}){
    let sample_img = "https://w.namu.la/s/adb56b09aef6d27319fe0fed21df3cf9e282fe7964308413845ab53649de0ac7e4003aa7abb7b2fe51b934bfc22b68d7183381a532e6ffca6849ad42672b4fc580161f61963aefaa808acaa4c788504ec2212a4a827718b8451f23098f8f24d7fa2d12cb721787c3cd3e098b609a9555";
    const {diaryIdx, year, month, day} = useParams();
    const dayName = moment(`${year}-${month}-${day}`).format('ddd');
    console.log(year, month, day);

    const [showAddPost, setShowAddPost] = useState(false);

    // sample friends
    const friendList = [
        {id: 0, name: "Minju", color: "#FFA897"},
        {id: 1, name: "Nakyoung", color: "#B6E8FD"},
        {id: 2, name: "Jikyang", color: "#FEBBFF"}
    ];

    return(

        <div className="entireDay">
            <GroupSidebar diaryIdx={diaryIdx}/>
            {
            showAddPost ?
                <AddPost setShowAddPost={setShowAddPost} year={year} month={month} day={day} dayName={dayName}/>
                :
                <div className="day">
                                <div className="day__btns">
                                    <BackBtn nextLoc={`/home/diary/${diaryIdx}`}/>
                                </div>
                                <div className="day__date">
                                    {`${year}/${month}/${day}/${dayName}`}
                                </div>
                                <div className="day__line">
                                    <FriendList friendList={friendList}/>
                                    <PlusBtn setShowContents={setShowAddPost} desc={"+ Add Post"}/>
                                </div>
                                <Post 
                                    title="Street Woman Fighter" 
                                    description="Did you see 'street woman fighter'? it's just soooooo fun. you should really see this.
                                    I just love how girls show their great dancing skill. I think all the dancers there are very professional and cool."
                                    postIdx={0}
                                    />

                                <div className="day__commentBox">
                                    <div className="day__commentBox__title">
                                        <div>Comment</div>
                                        <div>2</div>
                                    </div>
                                    <NewComment imgSrc={sample_img}/>
                                    <Comment name="Minju" color={friendList[0].color} description="I already saw it. I'm a big fan of Honey J in HolyBang. She's amazing" imgSrc={"https://blog.kakaocdn.net/dn/bcZT99/btreTHNIHGx/xy6W9nH6xePSZgk4nK9OH1/img.jpg"}/>
                                    <Comment name="Nakyoung" color={friendList[1].color} description="Actually, I think No:ze is the best. " imgSrc={"https://menu.mt.co.kr/moneyweek/thumb/2021/08/29/06/2021082909088076498_1.jpg"}/>
                                </div>

                            </div>
            }

        </div>
    );
}

export default Day;