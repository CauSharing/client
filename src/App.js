import React, {useState} from "react";
import './App.css';
import { Route , BrowserRouter as Router, Switch} from 'react-router-dom';
import AuthRoute from './util/AuthRoute';
import {signIn} from "./util/auth";
import LogIn from './pages/LogIn';
import SignUp from "./pages/SignUp";
import DiaryList from "./pages/DiaryList";
import NotFound from "./pages/NotFound";

function App(){
    const [userToken, setUserToken] = useState(null);
    const authenticated = userToken != null;

    const login = ({email, password, setEmail, setPassword}) => setUserToken(signIn({email, password, setEmail, setPassword}));
    const logout = () => setUserToken(null);

    return(
        <>
            <Router>
                <Switch>
                    <Route exact path='/' render={props => (
                        <LogIn authenticated={authenticated} login={login} {...props} />
                        )}
                    />
                    <Route path="/signUp" render={()=><SignUp/>}/>
                    <AuthRoute
                        authenticated={authenticated}
                        path="/home"
                        render={props => <DiaryList {...props}/>}
                        />
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
