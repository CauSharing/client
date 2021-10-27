import React, {useState} from "react";
import { Link } from 'react-router-dom';
import SideBar from "../components/SideBar";
import Matching from "../components/Matching";
import DiaryThumbnail from "../components/DiaryThumbnail";
import "./DiaryList.css";

import {diaries} from "./sampleDiary.json";

function DiaryList({departmentList}){
    console.log("render diarylist");

    return(
        <div className="diarylist">
            <SideBar departmentList={departmentList} />
            <Matching departmentList={departmentList}/>
            <div className="diarylist__list">
            {
                diaries.map((diary, index) => (
                   <DiaryThumbnail
                        diary={diary}
                        diaryIdx={index}
                        />
                ))
            }
            </div>
        </div>
    );
}

export default DiaryList;