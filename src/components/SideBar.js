import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import Matching from "../components/Matching";
import "./SideBar.css";

function SideBar({departmentList, user, clickedMenuId}){
    let sample_img = "https://w.namu.la/s/117620dd0a76132d63bc33853346b23acd827bc8914a6390399d1e0916fccee10da3e77dee1ce9c10fe1f8d6ed50562f5d6d18f438193ac5c351e3e01c5521e32484b90ac606432bd306267c801a4bc9787c4bc4d5bb960dcabd13fb6f084f64426bc2677fb84562b66418658186563a";
    const [clickedMenu, setIsClickedMenu] = useState(clickedMenuId);
    const [matchingSeen, setMatchingSeen] = useState(false);
    console.log("render sidebar");
    console.log(matchingSeen);

    const handleMatchingSeen = useCallback(
        (e) => {
            setMatchingSeen(!matchingSeen);
            if(matchingSeen)
                setIsClickedMenu("0");
            else
                setIsClickedMenu(e.target.value);
        },
        [matchingSeen]
    );

    const handleClick = (e) => {
        setIsClickedMenu(e.target.value);
        if(matchingSeen && e.target.value != "1")
        {
            setMatchingSeen(!matchingSeen);
        }
    }


//     const handleMenuClick = (e) => {
//         e.preventDefault();
//         setCurMenu(e.target.value);
//     }

    return(
        <>
            <div className="sidebar">
                <img src={sample_img} className="sidebar__profileImg"/>
                <div className="sidebar__name">No:Ze</div>
                <Link to="/home">
                    <button value={0} className={ clickedMenu === "0" ? "clicked" : "notClicked"} onClick={handleClick}>
                        Home
                    </button>
                </Link>
                <button onClick={handleMatchingSeen} value={1} className={ clickedMenu === "1" ? "clicked" : "notClicked"}>
                    Add Friends
                </button>
                <Link to={`/invitation`}>
                    <button value={2}  className={clickedMenu === "2" ? "clicked" : "notClicked"} onClick={handleClick}>
                        Invitation
                    </button>
                </Link>
                <Link to="/setting">
                    <button value={3} className={ clickedMenu === "3" ? "clicked" : "notClicked"} onClick={handleClick}>
                        Setting
                    </button>
                </Link>
                <Link to="/"><div className="sidebar__logout">Logout</div></Link>
            </div>
            <Matching matchingSeen={matchingSeen} departmentList={departmentList} setMatchingSeen={handleMatchingSeen}/>

        </>
    );
}

export default SideBar;