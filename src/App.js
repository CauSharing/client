import React, {useState} from "react";
import './App.css';
import { Route , BrowserRouter as Router, Switch} from 'react-router-dom';
import AuthRoute from './util/AuthRoute';
import LogIn from './pages/LogIn';
import SignUp from "./pages/SignUp";
import DiaryList from "./pages/DiaryList";
import NotFound from "./pages/NotFound";

function App(){
    const [userToken, setUserToken] = useState(null);

    return(
        <>
            <Router>
                <Switch>
                    <Route
                        exact path='/'
                        render={props => (
                            <LogIn
                                userToken = {userToken}
                                setUserToken = {setUserToken}
                                {...props} />
                        )}
                    />
                    <Route
                        path="/signUp"
                        render={()=><SignUp/>}
                        />
                    <Route
                        path="/home"
                        render={()=><DiaryList />}
                        />
{/*                     <AuthRoute */}
{/*                         authenticated={userToken!==null} */}
{/*                         path="/home" */}
{/*                         render={props => <DiaryList userToken={userToken} {...props}/>} */}
{/*                         /> */}
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
