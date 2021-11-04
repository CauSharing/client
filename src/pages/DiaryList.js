import React, {useState} from "react";
import { Link } from 'react-router-dom';
import SideBar from "../components/SideBar";
import Matching from "../components/Matching";
import DiaryThumbnail from "../components/DiaryThumbnail";
import "./DiaryList.css";

import {diaries} from "./sampleDiary.json";

function DiaryList({departmentList}){
    console.log("render diarylist");
    let diaryList = [];
    diaries.map((diary, index) => (
        diaryList.push(<td><DiaryThumbnail
                                    diary={diary}
                                    diaryIdx={index}
                                    departmentList={departmentList}
                                /></td>)

    ));

    let rows = [];
    let cells= [];
     diaryList.forEach((row, i) => {
        if(i%4 !== 0){
            cells.push(row);
        }else{
            rows.push(cells);
            cells = [];
            cells.push(row);
        }
        if(i === diaryList.length - 1){
            rows.push(cells);
        }
     });

     let table = rows.map((d, i) => {
        return <tr>{d}</tr>;
     });

    return(
        <div className="diarylist">
            <SideBar departmentList={departmentList} clickedMenuId={"0"}/>
            <Matching departmentList={departmentList}/>
            <div className="diarylist__main">
                <button className="diarylist__addBtn">+ Add Friend</button>
                <table className="diarylist__list">
                    {table}
                </table>
            </div>
        </div>
    );
}

export default DiaryList;