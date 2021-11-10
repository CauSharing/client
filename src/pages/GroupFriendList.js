import React from "react";
import {useParams} from 'react-router-dom';
import GroupSidebar from "../components/GroupSidebar";

import "./GroupFriendList.css";

function GroupFriendList(){
    const {diaryIdx} = useParams();

    return(
        <>
            <GroupSidebar diaryIdx={diaryIdx}/>
            <div className="entireGroupFriendList">
                <div className="groupFriendList__title">Friend list</div>
            </div>
        </>
    )
}

export default GroupFriendList;