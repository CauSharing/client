import React, {useState} from "react";
import NewWindow from 'react-new-window'



function DiaryList(){
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const Demo = () => (
      <NewWindow>
        <h1>Hi 👋</h1>
      </NewWindow>
    );

    const handleClick = () => {
        <Demo />
    };

    return(
        <div>
            <h3>This is diary list page!</h3>
            <button onClick={handleClick}>+</button>

        </div>
    );
}

export default DiaryList;