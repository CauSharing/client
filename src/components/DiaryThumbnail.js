import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./DiaryThumbnail.css";

import GroupIcon from '@mui/icons-material/Group';

function DiaryThumbnail({groupName, groupImg, groupUserList, groupIdx}){
    // const [name, setName] = useState("");
    // const [major, setMajor] = useState("");
    // const [imgSrc,setImgSrc] = useState("#");

    // useEffect(() => {
    //     setName(diary.name);
    //     setMajor(diary.major);
    //     setImgSrc(diary.imgSrc);
    // },[name, major, imgSrc]);

    return(
        <Link
            to={{
                pathname: `home/diary/${groupIdx}`,
                state: {
                    groupIdx: groupIdx,
                }
            }}>
                <div className="diaryThumbnail">
                    <div className="diaryThumbnail__groupImg">
                    {
                        groupImg?
                        <img src={groupImg} alt={groupName}/>
                        :
                        <GroupIcon className="groupIcon" color="primary"/>
                    }
                    </div>
                    <div className="diaryThumbnail__name">{groupName}</div>
                    {/* <div className="diaryThumbnail__major">{major}</div> */}
                </div>
        </Link>

    );
}

export default DiaryThumbnail;