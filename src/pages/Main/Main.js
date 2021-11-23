import React, {useState, useEffect} from "react";
import Menu from './Menu';
import HomeTabPanel from './HomeTabPanel';
import AboutUsTablePanel from "./AboutUsTablePanel";
import SignInTabPanel from "./SignInTabPanel";
import './Main.css';

function Main(){
  useEffect(() => {
    localStorage.clear();
}, [] );

  const [value, setValue] = useState('1');

  const handleChange = (e, newValue) => {
      setValue(newValue);
  };
    return(
      <>
        <Menu value={value} handleChange={handleChange}/>
        <HomeTabPanel value={value} index={'1'}/>
        <AboutUsTablePanel value={value} index={'2'} />
        <SignInTabPanel value={value} index={'3'} />
      </>
    );
}

export default Main;