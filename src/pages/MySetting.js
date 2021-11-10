import React , {useState} from "react";

import SideBar from "../components/SideBar";
import BackBtn from "../components/BackBtn";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import "./MySetting.css";

function MySetting({departmentList}){
    const [open, setOpen] = useState(true);

    const handleClick = () => {
      setOpen(!open);
    };

    const handleEditProfileBtn = (e) => {
        e.preventDefault();
        window.location.replace(window.location.href+"/edit-profile");
    }

    return(
        <>
            <SideBar departmentList={departmentList} clickedMenuId={"3"}/>
            <div className="entireMySetting">
                <div className="mySetting__btn">
                    <BackBtn nextLoc={"/home"}/>
                </div>
                <div className="mySetting__title">Setting</div>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', fontFamily: 'Roboto Condensed'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                        Profile
                        </ListSubheader>
                    }>
                    <ListItemButton onClick={handleEditProfileBtn}>
                        <ListItemIcon>
                        <PersonOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit profile" />
                    </ListItemButton>
                    {/* <ListItemButton>
                        <ListItemIcon>
                        <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                            <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                        </List>
                    </Collapse> */}
                </List>
            </div>
        </>
    );
}

export default MySetting;