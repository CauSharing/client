import React from "react";

function AboutUsTablePanel({value, index}){
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
        >
        {value === index && (
          <div>About us</div>
        )}
      </div>
    );
}

export default AboutUsTablePanel;