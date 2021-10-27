import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import Matching from "../components/Matching";
import "./SideBar.css";

function SideBar({departmentList, user}){
    let sample_img = "https://w.namu.la/s/117620dd0a76132d63bc33853346b23acd827bc8914a6390399d1e0916fccee10da3e77dee1ce9c10fe1f8d6ed50562f5d6d18f438193ac5c351e3e01c5521e32484b90ac606432bd306267c801a4bc9787c4bc4d5bb960dcabd13fb6f084f64426bc2677fb84562b66418658186563a";
//     const [curMenu, setCurMenu] = useState(1);
    const [matchingSeen, setMatchingSeen] = useState(false);
    console.log("render sidebar");
    console.log(matchingSeen);

    const handleMatchingSeen = useCallback(
        () => {
            setMatchingSeen(!matchingSeen);
        },
        [matchingSeen]
    );

    const handleClick = (e) => {
        e.preventDefault();
        setMatchingSeen(!matchingSeen);
//         console.log(matchingSeen);
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
                <Link to="/home"><button className={"sidebar__menu"} value={1}>Home</button></Link>
                <button onClick={handleMatchingSeen} className={"sidebar__menu"} value={2}>Add Friends</button>
                <Link to="/setting"><button className={"sidebar__menu"} value={3}>Setting</button></Link>
                <Link to="/"><div className="sidebar__logout">Logout</div></Link>
            </div>
            <Matching matchingSeen={matchingSeen} departmentList={departmentList} setMatchingSeen={handleMatchingSeen}/>

        </>
    );
}

export default SideBar;