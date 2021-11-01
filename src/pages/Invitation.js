import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import SideBar from "../components/SideBar";
import "./invitation.css";

function InvitationElem({email}){
    const [hideElem, setHideElem] = useState(false);

    const handleAcceptBtn = (e) => {
//         e.preventDefault();

        const data = {
            "sender": email
        };

        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.post('/api/accept',data, config)
            .then(res => {
                console.log(res);
                setHideElem(true);
            })
            .catch(err =>{
                console.log(err);
            });
    }
    const handleRefuseBtn = (e) => {
//         e.preventDefault();
        const data = {
            "sender": email
        };

        const token = localStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.delete('/api/reject', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data : {
                "sender": email
            }
        })
            .then(res => {
                console.log(res);
                setHideElem(true);
            })
            .catch(err =>{
                console.log(err);
            });
    }
    return(
        <div className={`invitation__elem ${hideElem? 'hidden': null}`}>
            <div className="invitation__elem__email">{email}</div>
            <button className="invitation__elem__acceptBtn" onClick={handleAcceptBtn}>Accept</button>
            <button className="invitation__elem__refuseBtn" onClick={handleRefuseBtn}>Refuse</button>
        </div>
    );
}

function Invitation({departmentList}){
    const token = localStorage.getItem("userToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [invitationList, setInvitationList] = useState([]);

    useEffect(() => {
        axios.get('/api/invitedList', config)
            .then(res => {
                var list = res.data.value.invitationList;
                let set = new Set();
                list.forEach((elem) => {
                    set.add(elem.invitePerson);
                });

                setInvitationList(Array.from(set));
            })

            .catch(err =>{
                console.log(err);
            });
    },[]);

    return(
        <div className="invitation">
            <SideBar departmentList={departmentList} clickedMenuId={"2"} />
            <div className="invitation__list">
                <div className="invitation__list__title">Invitation List</div>
                {
                    invitationList.map((email, index) => (
                        <InvitationElem email={email} />
                    ))
                }
            </div>
        </div>
    );
}

export default Invitation;