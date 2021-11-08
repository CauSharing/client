import React, {useState} from "react";
import { Link } from 'react-router-dom';
import SideBar from "../components/SideBar";
import Matching from "../components/Matching";
import DiaryThumbnail from "../components/DiaryThumbnail";
import "./DiaryList.css";

import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import {diaries} from "./sampleDiary.json";

const ColorButton = styled(Button)({
    width: '126px',
    height: '41px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '18px',
    padding: '10px',
    lineHeight: 1.5,
    backgroundColor: '#3181C6',
    borderColor: '#0063cc',
    fontFamily: 'Roboto Condensed',
    marginLeft: '20px',
    marginBottom: '20px',
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

function DiaryList({departmentList}){
    console.log("render diarylist");
    const [showAddFriend, setShowAddFriend] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setShowAddFriend(true);
    }

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
            {
                showAddFriend?
                <Matching departmentList={departmentList} setShowAddFriend={setShowAddFriend}/>
                :
                <div className="diarylist__main">
                    <ColorButton variant="contained" className="diarylist__addBtn" onClick={handleClick}>+ Add Friend</ColorButton>
                    <table className="diarylist__list">
                        {table}
                    </table>
                </div>
            }

        </div>
    );
}

export default DiaryList;