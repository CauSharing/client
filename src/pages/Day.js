import React from "react";
import { useParams} from 'react-router-dom';
import GroupSidebar from "../components/GroupSidebar";
import PlusBtn from "../components/PlusBtn";
import BackBtn from "../components/BackBtn";
import "./Day.css";

function Day({}){
    const {diaryIdx, year, month, day} = useParams();
    console.log(year, month, day);
    return(
        <>
            <GroupSidebar diaryIdx={diaryIdx}/>
            <div className="day">
                <BackBtn />
                <PlusBtn />
            </div>
        </>
    );
}

export default Day;