import React from "react";
import { useParams } from "react-router-dom";
import GroupSidebar from "../../components/GroupSidebar";

import { ListSubheader, List, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";

function GroupSetting(){
    const {groupIdx} = useParams();
    return(
        <>
            <GroupSidebar diaryIdx={groupIdx} />
            <Box sx={{position: "absolute", left:"300px"}}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', fontFamily: 'Roboto Condensed'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                        Profile
                        </ListSubheader>
                    }>
                    <ListItemButton>
                        <ListItemIcon>
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
            </Box>
        </>
    );
}

export default GroupSetting;