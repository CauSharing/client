import React, {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import GroupSidebar from "../components/GroupSidebar";
import BackBtn from "../components/BackBtn";

import moment from "moment";

import DiffMatchPatch from 'diff-match-patch';

import { Button, Box, TextField , Typography} from '@mui/material';
import { styled } from '@mui/material/styles';

import axios from 'axios';

const ColorButton = styled(Button)({
    width: '126px',
    height: '41px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '18px',
    padding: '10px',
    lineHeight: 1.5,
    color: 'white',
    backgroundColor: '#3181C6',
    borderColor: '#0063cc',
    fontFamily: 'Roboto Condensed',
    '&:hover': {
      backgroundColor: '#4892d2',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#4892d2',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

// function OriginalLine({description, blankCnt}){
//     let blankList = [];
//     for(var i=0; i<blankCnt; i++)
//         blankList.push( <Box sx={{width:"100%", height:"18px", padding:"13px 5px", display:"flex", alignItems:"center"}}></Box>);

//     return(
//         <Box className="editPost__orgDescLine" sx={{  width:"50%", borderBottom:"1px dotted #8c8c8c", fontSize:"18px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         borderRight: "1px solid #8c8c8c"}}>
//             <Box sx={{width:"100%", height:"18px", padding:"13px 5px", display:"flex", alignItems:"center"}}>
//                 {description}
//             </Box>
//             {
//                 blankList
//             }
//         </Box>
//     );
// }

// function EditLine({originalDesc, editDescriptionList, postId, line, nickname}){
//     const [editCompList, setEditCompList] = useState([]);
//     const [editedData, setEditedData] = useState(originalDesc);

//     useEffect(() => {
//         var list = [];
//         const dmp = new DiffMatchPatch();

//         for(var i=0; i<editDescriptionList.length; i++){
//             const diff = dmp.diff_main(originalDesc, editDescriptionList[i].desc);
            
//             var l = [];
//             for(var j=0; j<diff.length; j++){
//                 if(diff[j][0] === -1){
//                     l.push(<span style={{backgroundColor: "#FE8F8F", textDecoration: "line-through"}}>{diff[j][1]}</span>);
//                 }
//                 else if(diff[j][0] === 0){
//                     l.push(<span>{diff[j][1]}</span>);
//                 }
//                 else {
//                     l.push(<span style={{backgroundColor: "#B1E693"}}>{diff[j][1]}</span>);
//                 }
//             }

//             list.push({writer: editDescriptionList[i].writer, desc: l});
//         }

//         setEditCompList(list);
        
//     }, []);

//     const handleClick = async (e) => {
//         const data = {
//             "editedDataList": [
//                 {
//                     "content" : editedData,
//                     "editedDataId" : 0,
//                     "line" : line,
//                     "writer" : nickname
//                 }
//             ],
//             "postId": postId
//         };

//         const token = localStorage.getItem("userToken");
//         const config = {
//             headers: { Authorization: `Bearer ${token}` }
//         };
//         const instance = axios.create({
//             timeout: 30000,
//           });

//         await instance.post(`/api/sharpening`,data, config)
//         .then(res => {
//             console.log(res);
//         })
//         .catch(err => {
//             console.log(err);
//             alert("error");
//         });   

//     }

//     return(
//         <Box  className="editPost__descLine" sx={{width:"50%", borderBottom:"1px dotted #8c8c8c", fontSize:"18px" }}>
//             <Box sx={{width:"100%", height:"18px", padding:"13px 5px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
//                 <TextField variant="standard" onChange={(e) => setEditedData(e.target.value)} defaultValue={originalDesc} style={{width:"100%", fontSize:"18px"}} inputStyle ={{width: '100%', fontSize:"18px"}}/>
//                 <Button variant="outlined" onClick={handleClick}>Submit</Button>
//             </Box>
//             {
//                 editCompList.map(elem => 
//                     <Box sx={{width:"100%", height:"18px", padding:"13px 5px", display:"flex", alignItems:"center", }}>
//                         <Box sx={{backgroundColor:elem.writer.color, width:"80px", padding:"5px", display:"flex",justifyContent:"center",
//                             alignItems:"center", borderRadius:"5px" }}>
//                             {elem.writer.name}
//                         </Box>
//                         <div>{elem.desc}</div>
//                     </Box>
//                 )
//             }
//         </Box>
//     );
// }
// function EditPost({}){
//     const {state} = useContext(GroupContext);
//     const [groupName, setGroupName] = useState(state.groupName);
//     const [groupImg, setGroupImg] = useState(state.groupImg);
//     const [groupUserList, setGroupUserList] = useState(state.groupUserList);

//     const { groupIdx, year, month, day, postIdx} = useParams();
//     const dayName = moment(`${year}-${month}-${day}`).format('ddd');
    
//     const [title, setTitle] = useState("");
//     const [descriptionList, setDescriptionList] = useState([]);
//     const [editDescriptionList, setEditDescriptionList] = useState([]);
//     const [blankCntList, setBlankCntList] = useState([]);
//     const [lineCnt, setLineCnt] = useState(0);

//     const [totalList, setTotalList] = useState([]);

//     const user = JSON.parse(window.localStorage.getItem('user'));
//     const userNickname = user.nickname;

//     const [loading, setLoading] = useState(false);

//     // const editData = [
//     //     {postIdx: postIdx, lineIdx: 0,writer:{name: "minju", color: "#D3E4CD"}, desc: "Did you saw 'street woman fighter'? it's just so fun."},
//     //     {postIdx: postIdx, lineIdx: 0,writer:{name: "nakyoung", color: "#FFDEFA"}, desc: "Did you see 'street woman fighter'? it's just so fun."},
//     //     {postIdx: postIdx, lineIdx: 1,writer:{name: "jikwang", color: '#FCD2D1'}, desc: "you should really see this."},
//     // ];

//     useEffect( async () => {

//         await setLoading(true);

//         const token = localStorage.getItem("userToken");
//         const config = {
//             headers: { Authorization: `Bearer ${token}` }
//         };
//         const instance = axios.create({
//             timeout: 300000,
//           });

//         var list = [];

//         await instance.get(`/api/post?postId=${postIdx}`,config)
//         .then(res => {
//             console.log(res);
//             if(res.data.result){
//                 setTitle(res.data.value.title);

//                 var el = document.createElement( 'html' );
//                 el.innerHTML = res.data.value.content;
//                 var ps = el.querySelectorAll("p");
                
        
//                 ps.forEach(elem => {
//                     if(elem.innerText !== "")
//                         list.push(elem.innerText);
//                 });
    
//                 setDescriptionList(list);
//             }

//         })
//         .catch(err => {
//             console.log(err);
//         });   


//         await instance.get(`/api/sharpening/${postIdx}`,config)
//         .then(res => {
//             console.log(res);
//             if(res.data.result){

//                 var editCntList = [];
//                 for(var i=0; i<list.length; i++)
//                     editCntList.push(0);

//                 if(res.data.value === null){
//                     setBlankCntList(editCntList);
//                     setLineCnt(list.length);     
                    
//                     let descCompList = [];
//                     descriptionList.forEach((elem, index) =>
//                         descCompList.push(
//                             <OriginalLine description={elem} blankCnt={blankCntList[index]}/>
//                         )
//                     );

//                     for(var i=0; i<lineCnt; i++){
//                         setTotalList([
//                             ...totalList,
//                             <Box sx={{  display: "flex", alignItems:"center"}}>
//                                 {
//                                     descCompList[i]
//                                 }
//                                 {
//                                     <EditLine originalDesc={descriptionList[i]} editDescriptionList={[]} postId={postIdx} line={i} writer={userNickname}/>
//                                 }
//                             </Box>
//                         ])}
//                 }
//                 else{
//                     var editData = res.data.editedDataList;                         
//                     editData.forEach(x => {
//                         editCntList[x.lineIdx]++;
//                     })

//                     setBlankCntList(editCntList);
//                     setLineCnt(list.length);
    
    
//                     let descCompList = [];
//                     descriptionList.forEach((elem, index) =>
//                         descCompList.push(
//                             <OriginalLine description={elem} blankCnt={blankCntList[index]}/>
//                         )
//                     );
                
//                     let editDict = {};
//                     editData.forEach((elem, index) => {
//                         if(elem.lineIdx in editDict)
//                             editDict[elem.lineIdx].push(elem);
//                         else
//                             editDict[elem.lineIdx] = [elem];
//                     });
            
//                     for(var i=0; i<lineCnt; i++){
//                         setTotalList([
//                             ...totalList,
//                             <Box sx={{  display: "flex", alignItems:"center"}}>
//                                 {
//                                     descCompList[i]
//                                 }
//                                 {
//                                     i in editDict?
//                                     <EditLine originalDesc={descriptionList[i]} editDescriptionList={editDict[i]} postId={postIdx} line={i} writer={userNickname}/>
//                                     :
//                                     <EditLine originalDesc={descriptionList[i]} editDescriptionList={[]} postId={postIdx} line={i} writer={userNickname}/>
//                                 }
//                             </Box>
//                         ])
//                     }
//                 }

            
//             }

//         })
//         .catch(err => {
//             alert("error");
//         });      

//         await setGroupName(state.groupName);
//         await setGroupImg(state.groupImg);
//         await setGroupUserList(state.groupUserList);

// await setLoading(false);
//     }, []);


//     return(
//         <Box sx={{width:"100%", display:"flex"}}>
//             <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
//             {
//                 loading?
//                 <div>loading</div>
//                 :
//                 <Box sx={{width:"100%", padding:"20px"}}>
//                 <BackBtn nextLoc={`/home/diary/${groupIdx}/${year}-${month}-${day}`}/>
//                 <Box 
                    
//                     sx={{  display: "flex",
//                            justifyContent: "space-between",
//                            alignItems: "center",
//                             width:"100%",
//                             margin:"20px 0px",}}>
//                     <Typography variant="h5">
//                         {`${year}/${month}/${day}/${dayName}`}
//                     </Typography>
//                     <ColorButton>Save</ColorButton>
//                 </Box>
//                 <Box  sx={{width:"100%"}}>
//                     <Typography variant="h4" >{title}</Typography>
//                     <Box
//                         sx={{  display: "flex", alignItems:"center", width:"100%", margin:"20px 0px"}}>
//                         <Typography variant="subtitle1" sx={{width:"50%", color:"#3181c6", padding: "0px 5px"}}>Original</Typography>
//                         <Typography variant="subtitle1" sx={{width:"50%", color:"#3181c6", padding: "0px 5px"}}>Edit</Typography>
//                     </Box>
//                     <Box  sx={{  width: "100%",}}>
//                         {
//                             totalList
//                         }
//                     </Box>
//                 </Box>

//             </Box>
// }
            
            
//         </Box>
//     );
// }

function OriginalContent({content}){
    return(
        <Box sx={{width: "50%"}}>
            {content}
        </Box>
    );
}

function EditedContent({writer, content, originalContent}){
    const [coloredContent, setColoredContent]=useState([]);
    useEffect(() => {
        const dmp = new DiffMatchPatch();
        const diff = dmp.diff_main(originalContent, content);
            
        var l = [];
        for(var j=0; j<diff.length; j++){
            if(diff[j][0] === -1){
                l.push(<span style={{backgroundColor: "#FE8F8F", textDecoration: "line-through"}}>{diff[j][1]}</span>);
            }
            else if(diff[j][0] === 0){
                l.push(<span>{diff[j][1]}</span>);
            }
            else {
                l.push(<span style={{backgroundColor: "#B1E693"}}>{diff[j][1]}</span>);
            }
        }
        setColoredContent(l);
        
    }, []);
    return(
        <Box sx={{width: "50%", display:"flex", alignItems: "center", borderLeft: "1px solid #C0C0C0"}}>
            <Typography variant="body1" sx={{minWidth: "40px", padding: "5px"}}>{writer}</Typography>
            <Typography variant="body1">{coloredContent}</Typography>
        </Box>
    );
}

function Block({originalContent, editedDataList, line, userNickname, postId, setTitle, setOriginalList, setEditedList}){
    const [newEditedData, setNewEditedData] = useState(originalContent);
    const handleClick = async (e) => {
        const data = {
            editedDataList: [
                {
                    content : newEditedData,
                    editedDataId : 0,
                    line : line,
                    writer : userNickname
                }
            ],
            postId: parseInt(postId)
        };

        // console.log(data);

        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
            });

        await instance.post(`/api/sharpening`,data, config)
        .then(res => {
            console.log(data, res);
        })
        .catch(err => {
            console.log(err);
            alert("error");
        });   
        await instance.get(`/api/post?postId=${postId}`,config)
        .then(res => {
            console.log(res);
            if(res.data.result){
                var list = [];

                setTitle(res.data.value.title);

                var el = document.createElement( 'html' );
                el.innerHTML = res.data.value.content;
                var ps = el.querySelectorAll("p");
                
                ps.forEach((elem, index) => {
                    if(elem.innerText !== "")
                        list.push(elem.innerText);
                });
                console.log(list);
                setOriginalList(list);
            }

        })
        .catch(err => {
            console.log(err);
        });   

        await instance.get(`/api/sharpening/${postId}`,config)
        .then(res => {
            console.log(res);
            if(res.data.result){
                if(res.data.value !== null){
                    setEditedList(res.data.value.editedDataList);
                }
            }
            else{
                new Error();
            }
            
        })
        .catch(err => {
            console.log(err);
            alert("error");
        })
    }
    return(
        <Box sx={{width: "100%", borderBottom: "1px solid #C0C0C0"}}>
            <Box sx={{width:"100%", display: "flex", alignItems:"center"}}>
                <OriginalContent content={originalContent} />
                <Box sx={{width: "50%", display:"flex", alignItems:"center"}}>
                    <TextField 
                        variant="standard" 
                        onChange={(e) => setNewEditedData(e.target.value)} 
                        defaultValue={originalContent} 
                        multiline
                        style={{width:"90%", fontSize:"18px", borderLeft: "1px solid #C0C0C0"}} 
                        inputStyle ={{width: '90%', fontSize:"18px"}}/>
                    <Button variant="outlined" onClick={handleClick}>Submit</Button>
                </Box>
            </Box>
            {
                editedDataList.length > 0 ?
                editedDataList.map(elem => 
                    <Box sx={{width: "100%", display:"flex"}}>
                        <Box sx={{width: "50%"}}></Box>
                        <EditedContent writer={elem.writer} content={elem.content} originalContent={originalContent}/>
                    </Box>)
                :
                null
            }
        </Box>
    );
}
function EditPost({}){
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState("");
    const [groupUserList, setGroupUserList] = useState([]);

    const { groupIdx, year, month, day, postIdx} = useParams();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const userNickname = user.nickname;

    const dayName = moment(`${year}-${month}-${day}`).format('ddd');

    const [title, setTitle] = useState("");
    const [originalList, setOriginalList] = useState([]);
    const [editedList, setEditedList] = useState([]);
    // const [totalList, setTotalList] = useState([]);

    // const [loading, setLoading] = useState(false);


    useEffect( async () => {
        var groupInfo = JSON.parse(localStorage.getItem('curGroup'));
        setGroupName(groupInfo.groupName);
        setGroupImg(groupInfo.groupImg);
        setGroupUserList(groupInfo.groupUserList);
        
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const instance = axios.create({
            timeout: 30000,
          });

        await instance.get(`/api/post?postId=${postIdx}`,config)
        .then(res => {
            console.log(res);
            if(res.data.result){
                var list = [];

                setTitle(res.data.value.title);

                var el = document.createElement( 'html' );
                el.innerHTML = res.data.value.content;
                var ps = el.querySelectorAll("p");
                
                ps.forEach((elem, index) => {
                    if(elem.innerText !== "")
                        list.push(elem.innerText);
                });
                console.log(list);
                setOriginalList(list);
            }

        })
        .catch(err => {
            console.log(err);
        });   

        await instance.get(`/api/sharpening/${postIdx}`,config)
        .then(res => {
            console.log(res);
            if(res.data.result){
                if(res.data.value !== null){
                    setEditedList(res.data.value.editedDataList);
                }
            }
            else{
                new Error();
            }
            
        })
        .catch(err => {
            console.log(err);
            alert("error");
        })

    }, []);

    return(
        <Box sx={{width:"100%", display:"flex"}}>
            <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            <Box sx={{width:"100%", padding:"20px"}}>
                <BackBtn nextLoc={`/home/diary/${groupIdx}/${year}-${month}-${day}`}/>
                <Box 
                    sx={{  display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                            width:"100%",
                            margin:"20px 0px",}}>
                    <Typography variant="h5">
                        {`${year}/${month}/${day}/${dayName}`}
                    </Typography>
                    <ColorButton>Save</ColorButton>
                </Box>
                <Box  sx={{width:"100%"}}>
                    <Typography variant="h5" >{title}</Typography>
                    <Box
                        sx={{  display: "flex", alignItems:"center", width:"100%", margin:"20px 0px"}}>
                        <Typography variant="subtitle1" sx={{width:"50%", color:"#3181c6", padding: "0px 5px"}}>Original</Typography>
                        <Typography variant="subtitle1" sx={{width:"50%", color:"#3181c6", padding: "0px 5px"}}>Edit</Typography>
                    </Box>
                    <Box  sx={{  width: "100%"}}>
                    {                    
                        originalList.map((elem, index) => {
                            return <Block 
                                        originalContent={elem} 
                                        editedDataList={editedList.filter(data =>index === data.line)} 
                                        line={index} 
                                        userNickname={userNickname} 
                                        postId={postIdx}
                                        setTitle={setTitle}
                                        setOriginalList = {setOriginalList}
                                        setEditedList={setEditedList}/>;
                        })
                    }
                    </Box>
                 </Box>
            </Box>
        </Box>
    );
}
export default EditPost;