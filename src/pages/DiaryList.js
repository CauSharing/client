import React, {useState} from "react";
import Matching from "./Matching";
function DiaryList({userToken, departmentList}){
    console.log(userToken);

    const [matchingSeen, setMatchingSeen] = useState(false);

    const handleClick = () => {
//         window.open('/matching', '','top=150, left= 400, width=800, height=500, location=no,toolbar=no,titlebar=no, resizable=no,scrollbars=no'
//             );
           setMatchingSeen(true);
    };

    return(
        <div>
            <h3>This is diary list page!</h3>
            <button onClick={handleClick}>+</button>
            {
                matchingSeen? <Matching
                                    setMatchingSeen={setMatchingSeen}
                                    departmentList={departmentList}/> : null
            }
        </div>
    );
}

export default DiaryList;