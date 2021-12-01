import React, {useState, useContext, useRef} from 'react';
import { Link , withRouter} from 'react-router-dom';
import "./DiaryThumbnail.css";

import GroupIcon from '@mui/icons-material/Group';
import { Box, Card, CardActionArea, CardMedia, CardActions, CardContent, Button, Typography,Slide  } from '@mui/material';
import SampleImg from "../icons/nature-gdbaa175c1_640.png";


function DiaryThumbnail({groupName, groupImg, groupUserList, groupIdx}){
    const [showFriends, setShowFriends] = useState(false);
    const [showGroupInfo, setShowGroupInfo] = useState(true);

    const handleSeeBtn = (e) => {
        e.preventDefault();
        if(showFriends){
            setShowFriends(false);
            setShowGroupInfo(true);
        }else{
            setShowFriends(true);
            setShowGroupInfo(false);
        }
        
    }

    const handleClick = (e) => {
        // e.preventDefault();
        localStorage.setItem('curGroup',JSON.stringify({
                groupName:groupName, 
                groupImg: groupImg, 
                groupUserList: groupUserList, 
                groupIdx:groupIdx
            }));
    }

    const cardRef=useRef(null);
    // console.log("diary thumbnail: ", typeof(groupName), groupImg, groupUserList, groupIdx);
    return(
        <Card 
            sx={{ 
                width: 200, 
                margin: 1,
                // height:300, 
                display: "flex", 
                flexDirection: "column", 
                alignItems:"center",
                borderRadius: 0,
                borderBottom: 1,
                borderColor: '#D2D2D2' ,
                '&:hover':{
                    borderBottom: 1,
                    borderColor: "#3181C6"
                }}}
            ref={cardRef}>
            <Link
                to={{
                    pathname: `home/diary/${groupIdx}`
                }}
                style={{ textDecoration: 'none', width: 200 }}
                onClick={handleClick}>
                {
                    showGroupInfo &&
                    <Slide 
                    direction="left"
                    in={showGroupInfo}>

                        <CardActionArea sx={{
                            paddingLeft: 2,
                            paddingRight: 2, 
                            paddingTop:1,
                            paddingBottom:1,
                            display: "flex", 
                            flexDirection: "column", 

                            height:250,
                        }}>
        
                            <CardMedia
                                component="img"
                                sx={{borderRadius:"50%", width:160, height: 160}}
                                image={SampleImg}
                                alt="sample image"
                                />
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" sx={{fontFamily: "Roboto Condensed", fontSize: 24}}>
                                {groupName}
                                </Typography>        
                            </CardContent>      
                        </CardActionArea>
                            
                    </Slide> 
                }
                {
                    showFriends &&
                    <Slide direction="left" in={showFriends}>
                    <CardActionArea sx={{
                        paddingLeft: 2,
                        paddingRight: 2, 
                        paddingTop:1,
                        paddingBottom:1,
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems:"left",
                        justifyContent:"left",
                        alignItems:"flex-start",
                        justifyContent:"flex-start",
                        height:250,
                    }}>
                        <CardContent 
                            sx={{overflow: 'hidden'}}>
                                <Typography gutterBottom variant="h4" component="div" sx={{fontFamily: "Roboto Condensed", fontSize: 24,
                            marginBottom: 1.5}}>
                                With
                                </Typography>     
                        <div className="cardContent__friendList">
                        {
                            groupUserList.map(user =>    
                            <Typography gutterBottom variant="h4" component="div" sx={{fontFamily: "Roboto Condensed", fontSize: 15,
                            }}>
                            {user.nickname}
                            </Typography> )
                        }     
                        </div>
                        </CardContent>
                    </CardActionArea>
                    
                </Slide>
                }
            </Link>
            <CardActions>
                <Button 
                    sx={{fontSize: 13, fontFamily: "Roboto Condensed", display:"flex", justifyContent:"center", alignItems:"center"}}
                    onClick={handleSeeBtn}>
                    {
                        showGroupInfo?
                        "See Friends"
                        :
                        "See Group info"
                    }
                </Button>
            </CardActions>
        </Card>

    );
}

export default DiaryThumbnail;