import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./SideBar.css";

function GroupSidebar({diaryIdx}){
    let sample_img = "https://w.namu.la/s/f21af41d2334b16f5da4c187b6f38ee910673da611ac33ec15be826208cdce02afcb2cd7096414957ef6be53537b75547e8e279ad3400029da948e04b955fd33c7a382087a9a6e265553a7eb4e992dc8b11d3007a678a2d90cdf991e057c57e3";
    const [clickedMenu, setIsClickedMenu] = useState("0");

//     useEffect(() => {
//         setIsClickedMenu(0);
//     });

    const handleClick = (e) => {
        setIsClickedMenu(e.target.value);
    }

    return(
        <>
            <div className="sidebar">
                <img src={sample_img} className="sidebar__profileImg"/>
                <div className="sidebar__name">No:Ze</div>
                <Link to={`/home/diary/${diaryIdx}`}>
                    <button className={ clickedMenu === "0" ? "clicked" : "notClicked"} value={0} onClick={handleClick}>
                        Home
                    </button>
                </Link>
                <Link to={`/home/diary/${diaryIdx}/chat`}>
                    <button className={clickedMenu === "1" ? "clicked" : "notClicked"} value={1} onClick={handleClick}>
                        Chat
                    </button>
                </Link>
                <Link to={`/home/diary/${diaryIdx}/notice`}>
                    <button className={clickedMenu === "2" ? "clicked" : "notClicked"} value={2} onClick={handleClick}>
                        Notice
                    </button>
                </Link>
                <Link to={`/home/diary/${diaryIdx}/setting`}>
                    <button className={clickedMenu === "3" ? "clicked" : "notClicked"} value={3} onClick={handleClick}>
                        Setting
                    </button>
                </Link>
            </div>
        </>
    );
}

export default GroupSidebar;