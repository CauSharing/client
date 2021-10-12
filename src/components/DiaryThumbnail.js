import React, {useState, useEffect} from 'react';
import "./DiaryThumbnail.css";

function DiaryThumbnail({diary}){
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [imgSrc,setImgSrc] = useState("#");

    useEffect(() => {
        setName(diary.name);
        setMajor(diary.major);
        setImgSrc(diary.imgSrc);
    },[name, major, imgSrc]);
    return(
        <div className="diaryThumbnail">
            <img src={imgSrc}/>
            <div className="diaryThumbnail__name">{name}</div>
            <div className="diaryThumbnail__major">{major}</div>
        </div>
    );
}

export default DiaryThumbnail;