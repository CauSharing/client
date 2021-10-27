import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function GroupSidebar({diaryIdx}){
    let sample_img = "https://w.namu.la/s/117620dd0a76132d63bc33853346b23acd827bc8914a6390399d1e0916fccee10da3e77dee1ce9c10fe1f8d6ed50562f5d6d18f438193ac5c351e3e01c5521e32484b90ac606432bd306267c801a4bc9787c4bc4d5bb960dcabd13fb6f084f64426bc2677fb84562b66418658186563a";
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