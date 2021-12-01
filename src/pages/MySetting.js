import React , {useState} from "react";

import SideBar from "../components/SideBar";
import BackBtn from "../components/BackBtn";

import {Box, Typography} from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';

import "./MySetting.css";

function MySetting({departmentList}){
    const [open, setOpen] = useState(true);
    // const [user, setUser] = useState(null);

    const handleEditProfileBtn = (e) => {
        e.preventDefault();
        window.location.replace(window.location.href+"/edit-profile");
    }

    return(
        <Box sx={{ display:"flex"}}>
            <SideBar departmentList={departmentList} clickedMenuId={"3"}/>
            <Box  sx={{width: "100%", padding: "20px"}}>
                <BackBtn nextLoc={"/home"}/>
                <Box sx={{marginTop: "20px", paddingBottom: "10px", borderBottom: "1px solid #7c7c7c", width: "90%"}}>
                    <Typography variant="h4">Setting</Typography>
                </Box>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', fontFamily: 'Roboto Condensed'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    >
                    <ListItemButton onClick={handleEditProfileBtn}>
                        <ListItemIcon>
                            <EditIcon />
                        {/* <PersonOutlineIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="Edit profile" />
                    </ListItemButton>
                </List>
            </Box>
        </Box>
    );
}

export default MySetting;