import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./SideBar.css";


function SideBar({clickedMenuId}){
    const [user, setUser] = useState(null);
    const [clickedMenu, setIsClickedMenu] = useState(clickedMenuId);

    const handleClick = (e) => {
        e.preventDefault();
        setIsClickedMenu(e.target.value);
    }

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user')));
    }, []);

    return(
        <>
            <div className="sidebar">
                <img src={user? user.image : '#'} className="sidebar__profileImg"/>
                <div className="sidebar__name">{user? user.nickname : "undefined"}</div>
                <Link to="/home">
                    <button value={0} className={ clickedMenu === "0" ? "clicked" : "notClicked"} onClick={handleClick}>
                        Home
                    </button>
                </Link>
                <Link to={`/invitation`}>
                    <button value={2}  className={clickedMenu === "2" ? "clicked" : "notClicked"} onClick={handleClick}>
                        Invitation list
                    </button>
                </Link>
                <Link to="/setting">
                    <button value={3} className={ clickedMenu === "3" ? "clicked" : "notClicked"} onClick={handleClick}>
                        Setting
                    </button>
                </Link>
                <Link to="/"><div className="sidebar__logout">Logout</div></Link>
            </div>
        </>
    );
}

export default SideBar;