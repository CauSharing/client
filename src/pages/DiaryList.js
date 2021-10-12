import React, {useState, useEffect} from "react";
import SideBar from "../components/SideBar";
import Matching from "../components/Matching";
import "./DiaryList.css";

function DiaryList({userToken, departmentList, diaryList}){
    console.log(userToken);
    const [matchingSeen, setMatchingSeen] = useState(false);

    return(
        <div className="diarylist">
            <SideBar departmentList={departmentList} setMatchingSeen={setMatchingSeen}/>
            {
                matchingSeen? <Matching
                                    matchingSeen={matchingSeen}
                                    setMatchingSeen={setMatchingSeen}
                                    departmentList={departmentList}/> : null
            }
            {
                diaryList.map((diary, index) => (
                   <button>Diary {index+1}</button>
                ))
            }
            <h3>This is diary list page!</h3>

        </div>
    );
}

export default DiaryList;