import React, {useEffect} from "react";
import { Link ,useParams, useLocation} from 'react-router-dom';
import SideBar from "../components/SideBar";

function Diary({}){
    console.log("render diary");
    const {diaryIdx} = useParams();
    const location = useLocation();
    console.log(location.state);
    return(
        <>
            <h1>Diary {diaryIdx}</h1>
            <SideBar departmentList={location.state.departmentList}/>
        </>

    );
}

export default Diary;