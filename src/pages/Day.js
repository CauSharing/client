import React  , {useState}from "react";
import {useParams} from 'react-router-dom';
import moment from "moment";
import GroupSidebar from "../components/GroupSidebar";
import PlusBtn from "../components/PlusBtn";
import BackBtn from "../components/BackBtn";
import "./Day.css";

function AddPost({setShowAddPost, year, month, day, dayName}){
    return(
        <div className="addPost">
            <BackBtn setShowContents={setShowAddPost}/>
            <div className="addPost__line">
                <div className="addPost__date">{`${year}/${month}/${day}/${dayName}`}</div>
                <button className="addPost__saveBtn">Save</button>
            </div>
            <form className="addPost__form">
                <div className="addPost__form__line">
                    <input placeholder="Title"/>
                    <button></button>
                </div>
                <input />
            </form>
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

function Post({title, description}){
    return(
        <div className="day__post">
            <div className="day__post__line">
                <div className="day__post__title">{title}</div>
                <button className="day__post__editBtn">Edit</button>
            </div>
            <div className="day__post__desc">{description}</div>
        </div>
    );
}

function Comment({name, description, color}){
    const nameStyle = {
        background: color
    };
    return(
        <div className="day__comment">
            <div className="day__comment__name" style={nameStyle}>{name}</div>
            <div className="day__comment__desc">{description}</div>
        </div>
    );
}
function Day({}){
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
                                    <BackBtn />
                                    <PlusBtn setShowContents={setShowAddPost}/>
                                </div>
                                <div className="day__date">
                                    {`${year}/${month}/${day}/${dayName}`}
                                </div>
                                <FriendList friendList={friendList}/>
                                <Post title="Street Woman Fighter" description="Did you see 'street woman fighter'? it's just soooooo fun. you should really see this.
                                    I just love how girls show their great dancing skill. I think all the dancers there are very professional and cool."/>
                                <Comment name="Minju" color={friendList[0].color} description="I already saw it. I'm a big fan of Honey J in HolyBang. She's amazing"/>
                                <Comment name="Nakyoung" color={friendList[1].color} description="Actually, I think No:ze is the best. "/>
                            </div>
            }

        </div>
    );
}

export default Day;