import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
// import Matching from "../components/Matching";
import "./SideBar.css";

function SideBar({departmentList, user, clickedMenuId}){
    let sample_img = "https://w.namu.la/s/adb56b09aef6d27319fe0fed21df3cf9e282fe7964308413845ab53649de0ac7e4003aa7abb7b2fe51b934bfc22b68d7183381a532e6ffca6849ad42672b4fc580161f61963aefaa808acaa4c788504ec2212a4a827718b8451f23098f8f24d7fa2d12cb721787c3cd3e098b609a9555";
    const [clickedMenu, setIsClickedMenu] = useState(clickedMenuId);
//     const [matchingSeen, setMatchingSeen] = useState(false);
    console.log("render sidebar");
//     console.log(matchingSeen);

//     const handleMatchingSeen = useCallback(
//         (e) => {
//             setMatchingSeen(!matchingSeen);
//             if(matchingSeen)
//                 setIsClickedMenu("0");
//             else
//                 setIsClickedMenu(e.target.value);
//         },
//         [matchingSeen]
//     );

    const handleClick = (e) => {
        setIsClickedMenu(e.target.value);
//         if(matchingSeen && e.target.value != "1")
//         {
//             setMatchingSeen(!matchingSeen);
//         }
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
{/*                 <button onClick={handleMatchingSeen} value={1} className={ clickedMenu === "1" ? "clicked" : "notClicked"}> */}
{/*                     Add Friends */}
{/*                 </button> */}
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
{/*             <Matching matchingSeen={matchingSeen} departmentList={departmentList} setMatchingSeen={handleMatchingSeen}/> */}

        </>
    );
}

export default SideBar;