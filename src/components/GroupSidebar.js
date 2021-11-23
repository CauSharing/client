import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./SideBar.css";

import Logo from '../icons/CxC_logo.png';

function GroupSidebar({diaryIdx}){
    const [user, setUser] = useState(null);
    const [curMenu, setCurMenu] = useState("0");

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user')));

        if(window.location.pathname === `/home/diary/${diaryIdx}`)
            setCurMenu("0");
        else if(window.location.pathname === `/home/diary/${diaryIdx}/chat`)
            setCurMenu("1");
        else if(window.location.pathname === `/home/diary/${diaryIdx}/notice`)
            setCurMenu("2");
        else if(window.location.pathname === `/home/diary/${diaryIdx}/setting`)
            setCurMenu("3");
    }, []);


    return(
        <>
            <div className="sidebar">
                {
                    // user image가 있으면 user image가 뜨도록 고치기
                    <img src={Logo} className="sidebar__profileImg" />
                }
                <div className="sidebar__name">{user ? user.nickname : "undefined" }</div>
                <Link to={`/home/diary/${diaryIdx}`}>
                    <button className={ curMenu === "0" ? "clicked" : "notClicked"} value={"0"} >
                        Home
                    </button>
                </Link>
                <Link to={`/home/diary/${diaryIdx}/chat`}>
                    <button className={curMenu === "1" ? "clicked" : "notClicked"} value={"1"}>
                        Chat
                    </button>
                </Link>
                <Link to={`/home/diary/${diaryIdx}/notice`}>
                    <button className={curMenu === "2" ? "clicked" : "notClicked"} value={"2"}>
                        Notice
                    </button>
                </Link>
                <Link to={`/home/diary/${diaryIdx}/setting`}>
                    <button className={curMenu === "3" ? "clicked" : "notClicked"} value={"3"} >
                        Setting
                    </button>
                </Link>
            </div>
        </>
    );
}

export default GroupSidebar;