import React  , {useState, useRef, useEffect}from "react";
import {useParams} from 'react-router-dom';
import moment from "moment";
import GroupSidebar from "../components/GroupSidebar";
import PlusBtn from "../components/PlusBtn";
import BackBtn from "../components/BackBtn";
import PinkPlus from "../icons/pink-plus.png";
import "./Day.css";

function AddPost({setShowAddPost, year, month, day, dayName}){
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview,setPreview] = useState(null);
  const fileRef= useRef();

  useEffect(() => {
    if(file !== '') //처음 파일 등록하지 않았을 때를 방지
      setPreview(<img className='img_preview' src={previewURL}></img>);
    return () => {
    }
  }, [previewURL]);

  const handleFileOnChange = (event) => {//파일 불러오기
      event.preventDefault();
      let file = event.target.files[0];
      let reader = new FileReader();

      reader.onloadend = (e) => {
        setFile(file);
        setPreviewURL(reader.result);
      }
      if(file)
        reader.readAsDataURL(file);
    }

  const handleFileButtonClick = (e) => {//버튼 대신 클릭하기
      e.preventDefault();
      fileRef.current.click(); // file 불러오는 버튼을 대신 클릭함
    }

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
                    <input ref = {fileRef} hidden = {true} id = "file" type='file' onChange={handleFileOnChange}></input>
                    <button className="addPictureBtn" onClick={handleFileButtonClick}>
                        <img src={PinkPlus}/>
                        Add picture
                    </button>
                </div>
                <textarea  className="addPost__form__desc" placeholder="Description"/>
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
                                    <BackBtn isGoBack={true}/>
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