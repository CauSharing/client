import React from "react";
import './App.css';
import { Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from "./pages/SignUp";

function App(){

    return(
        <div className="App">
            <Route exact path='/' component={LogIn} />
            <Route path="/signUp" render={()=><SignUp/>}/>
        </div>
    );
}

export default App;
