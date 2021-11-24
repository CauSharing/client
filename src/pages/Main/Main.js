import React, {useState, useEffect} from "react";
import Menu from './Menu';
import HomeTabPanel from './HomeTabPanel';
import AboutUsTablePanel from "./AboutUsTablePanel";
import SignInTabPanel from "./SignInTabPanel";
import './Main.css';

import { Box} from '@mui/material';

function Main(){
  useEffect(() => {
    localStorage.clear();
}, [] );

  const [value, setValue] = useState('1');

  const handleChange = (e, newValue) => {
      setValue(newValue);
  };
    return(
      <Box sx={{height: "100vh", background: "linear-gradient(rgba(107, 190, 226, 0.2) 90%, #FFFFFF 10%)"}}>
        <Menu value={value} handleChange={handleChange}/>
        <HomeTabPanel value={value} index={'1'}/>
        <AboutUsTablePanel value={value} index={'2'} />
        <SignInTabPanel value={value} index={'3'} />
      </Box>
    );
}

export default Main;