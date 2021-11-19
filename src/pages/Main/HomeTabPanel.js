import React from "react";
import Info from './Info';

function HomeTabPanel({value, index}){
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
        >
        {value === index && (
          <Info />
        )}
      </div>
    );
}

export default HomeTabPanel;