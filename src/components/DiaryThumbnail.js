import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./DiaryThumbnail.css";

function DiaryThumbnail({diary, diaryIdx, departmentList, setMatchingSeen}){
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [imgSrc,setImgSrc] = useState("#");

    useEffect(() => {
        setName(diary.name);
        setMajor(diary.major);
        setImgSrc(diary.imgSrc);
    },[name, major, imgSrc]);

    return(
        <Link
            to={{
                pathname: `home/diary/${diaryIdx}`,
                state: {
                    departmentList: departmentList
                }
            }}>
                <div className="diaryThumbnail">
                    <img src={imgSrc} alt={name}/>
                    <div className="diaryThumbnail__name">{name}</div>
                    <div className="diaryThumbnail__major">{major}</div>
                </div>
        </Link>

    );
}

export default DiaryThumbnail;