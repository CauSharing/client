import React, {useState} from "react";
import { Link } from 'react-router-dom';
import SideBar from "../components/SideBar";
import Matching from "../components/Matching";
import DiaryThumbnail from "../components/DiaryThumbnail";
import "./DiaryList.css";

import {diaries} from "./sampleDiary.json";

function DiaryList({departmentList}){
    console.log("render diarylist");
    const [matchingSeen, setMatchingSeen] = useState(false);

    return(
        <div className="diarylist">
            <SideBar departmentList={departmentList} setMatchingSeen={setMatchingSeen} />
            {
                matchingSeen? <Matching
                                    matchingSeen={matchingSeen}
                                    setMatchingSeen={setMatchingSeen}
                                    departmentList={departmentList}/> : null
            }
            <div className="diarylist__list">
            {
                diaries.map((diary, index) => (
                   <Link to={`home/diary/${index}`} style={{ textDecoration: 'none' }}><DiaryThumbnail diary={diary} /></Link>
                ))
            }
            </div>
        </div>
    );
}

export default DiaryList;