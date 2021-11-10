import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import GroupSidebar from "../components/GroupSidebar";
import BackBtn from "../components/BackBtn";

import moment from "moment";

import DiffMatchPatch from 'diff-match-patch';


import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import "./EditPost.css";

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

function OriginalLine({description, blankCnt}){
    let blankList = [];
    for(var i=0; i<blankCnt; i++)
        blankList.push(<div></div>);

    return(
        <div className="editPost__orgDescLine">
            <div>
                {description}
            </div>
            {
                blankList
            }
        </div>
    );
}
function EditLine({originalDesc, editDescriptionList}){
    const [editCompList, setEditCompList] = useState([]);

    useEffect(() => {
        var list = [];
        const dmp = new DiffMatchPatch();

        for(var i=0; i<editDescriptionList.length; i++){
            const diff = dmp.diff_main(originalDesc, editDescriptionList[i].desc);
            
            var l = [];
            for(var j=0; j<diff.length; j++){
                if(diff[j][0] === -1){
                    l.push(<span style={{backgroundColor: "#FE8F8F"}}>{diff[j][1]}</span>);
                }
                else if(diff[j][0] === 0){
                    l.push(<span>{diff[j][1]}</span>);
                }
                else {
                    l.push(<span style={{backgroundColor: "#B1E693"}}>{diff[j][1]}</span>);
                }
            }

            list.push({writer: editDescriptionList[i].writer, desc: l});
        }

        setEditCompList(list);
        
    }, []);


    return(
        <div  className="editPost__descLine">
            
            <input value={originalDesc}/>
            {
                editCompList.map(elem => 
                    <div>
                        <div style={{background:elem.writer.color}}>{elem.writer.name}</div>
                        <div>{elem.desc}</div>
                    </div>
                )
            }
        </div>
    );
}
function EditPost({}){
    const { diaryIdx, year, month, day, postIdx} = useParams();
    const dayName = moment(`${year}-${month}-${day}`).format('ddd');
    
    const [title, setTitle] = useState("");
    const [descriptionList, setDescriptionList] = useState([]);
    const [editDescriptionList, setEditDescriptionList] = useState([]);
    const [blankCntList, setBlankCntList] = useState([]);
    const [lineCnt, setLineCnt] = useState(0);

    const editData = [
        {postIdx: postIdx, lineIdx: 0,writer:{name: "minju", color: "#D3E4CD"}, desc: "Did you saw 'street woman fighter'? it's just so fun."},
        {postIdx: postIdx, lineIdx: 0,writer:{name: "nakyoung", color: "#FFDEFA"}, desc: "Did you see 'street woman fighter'? it's just so fun."},
        {postIdx: postIdx, lineIdx: 1,writer:{name: "jikwang", color: '#FCD2D1'}, desc: "you should really see this."},
    ];

    useEffect(() => {
        // postIdx에 해당하는 html글 불러오기
        setTitle("Street woman fighter");
        var el = document.createElement( 'html' );
        el.innerHTML = `<p><img src="https://myrecord.s3.ap-northeast-2.amazonaws.com/e191db4e-a079-43c1-a2f6-a5291857a17d.png" alt="alt text" contenteditable="false"><img class="ProseMirror-separator"><br class="ProseMirror-trailingBreak"></p><p>Did you saw 'street woman fighter'? it's just soooooo fun.</p><p>you should really see this.</p><p>I just love how girls show their great dancing skill.</p><p>I think all the dancers there are very professional and cool.</p>`;
        
        var ps = el.querySelectorAll("p");
        var list = [];

        ps.forEach(elem => {
            if(elem.innerText !== "")
                list.push(elem.innerText);
        });

        // edit에 해당하는 글 불러오기
        var editCntList = [];
        for(var i=0; i<editData.length; i++)
            editCntList.push(0);
        editData.forEach(x => {
            editCntList[x.lineIdx]++;
        })

        setDescriptionList(list);
        setBlankCntList(editCntList);
        setLineCnt(list.length);
    }, []);

    let descCompList = [];
    descriptionList.forEach((elem, index) =>
        descCompList.push(
            <OriginalLine description={elem} blankCnt={blankCntList[index]}/>
        )
    );

    let editDict = {};
    editData.forEach((elem, index) => {
        if(elem.lineIdx in editDict)
            editDict[elem.lineIdx].push(elem);
        else
            editDict[elem.lineIdx] = [elem];
    });

    // let editCompList = [];
    // for(var key in editDict){
    //     editCompList.push(<EditLine originalDesc={descriptionList[key]} editDescriptionList = {editDict[key]} /> );
    // }

    let totalList = [];
    for(var i=0; i<lineCnt; i++){
        totalList.push(
            <div className="editPost__main__section">
                {
                    descCompList[i]
                }
                {
                    // editCompList[i]
                    i in editDict?
                    <EditLine originalDesc={descriptionList[i]} editDescriptionList={editDict[i]}/>
                    :
                    <EditLine originalDesc={descriptionList[i]} editDescriptionList={[]}/>
                }
            </div>
        )
    }

    return(
        <>
            <GroupSidebar />
            <div className="editPost">
                <div className="editPost__backBtn">
                    <BackBtn isGoBack={true}/>
                </div>
                <div className="editPost__line">
                    <div className="editPost__dayName">
                        {`${year}/${month}/${day}/${dayName}`}
                    </div>
                    <ColorButton>Save</ColorButton>
                </div>
                <div className="editPost__main">
                    <div className="editPost__main__title">{title}</div>
                    <div className="editPost__main__line">
                        <div>Original</div>
                        <div>Edit</div>
                    </div>
                    <div className="editPost__main__Desc">
                        {
                            totalList
                        }
                    </div>
                </div>

            </div>

            
            
        </>
    );
}

export default EditPost;