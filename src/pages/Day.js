import React from "react";
import { useParams} from 'react-router-dom';
import GroupSidebar from "../components/GroupSidebar";
import PlusBtn from "../components/PlusBtn";
import "./Day.css";

function Day({}){
    const {diaryIdx, year, month, day} = useParams();
    console.log(year, month, day);
    return(
        <>
            <GroupSidebar diaryIdx={diaryIdx}/>
            <div className="day">
                <PlusBtn />
            </div>
        </>
    );
}

export default Day;