import React, {Component}  from "react";
import './App.css';
import { Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from "./pages/SignUp";

class App extends Component{
  render(){
    return (
        <>
          <Route exact path='/' component={LogIn} />
          <Route path="/signUp" component={SignUp}/>
        </>
    );
  }
}

export default App;
