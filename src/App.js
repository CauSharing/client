import React, {useState, useEffect} from "react";
import './App.css';
import { Route , BrowserRouter as Router, Switch, Redirect, withRouter} from 'react-router-dom';
import AuthRoute from './util/AuthRoute';
import Main from './pages/Main/Main';
import SignUp from "./pages/SignUp";
import DiaryList from "./pages/DiaryList/DiaryList";
import Diary from "./pages/Diary/Diary";
import Day from "./pages/Day";
import Invitation from "./pages/Invitation";
import EditPost from "./pages/EditPost";
import MySetting from "./pages/MySetting";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import GroupSetting from "./pages/GroupSetting/GroupSetting";
import Chat from "./pages/Chat/Chat";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {Provider} from "./context/index";

const lightTheme = createTheme({
    typography:{
        fontFamily: 'Roboto Condensed'
    },
    palette:{
        type: 'light',
        primary: {
            main: '#0148A0',
        },
        secondary:{
            main: '#646464',
            light: '#E9E9E9',
        }
    }
})

function App(){
    console.log("render app");

    const departmentList = [
        {id: "1", name: 'College of Liberal Arts', major: ['Korean Language and Literature','English Language and Literature', 'German Literature', 'French Literature', 'Russian Language and Literature', 'Japanese Language and Literature', 'Chinese Language and Literature', 'Philosophy', 'History']},
        {id: "2", name: 'College of Social Sciences', major:['Political Science and International Relations','Public Service','Psychology','Library and Information Science','Social Welfare','Media and Communication','Urban Planning and Real Estate', 'Sociology']},
        {id: "3", name: 'College of Education', major: ['Education', 'Early Childhood Education', 'English Education', 'Physical Education']},
        {id: "4", name: 'College of Natural Sciences', major:['Physics', 'Chemistry', 'Life Science', 'Mathematics']},
        {id: "5", name: 'College of Biotechnology and Natural Resources', major:['Biological Resources Engineering', 'Food Engineering', 'Systems Biotechnology']},
        {id: "6", name: 'College of Engineering', major:['Civil & Environmental Engineering, Urban Design and Study', 'Architecture & Building Science', 'Chemical Engineering and Materials Science', 'Mechanical Engineering', 'Energy Systems Engineering', 'Advanced Materials Engineering']},
        {id: "7", name: 'College of ICT Engineering', major:['Electrical and Electronics Engineering', 'Integrative Engineering']},
        {id: "8", name: 'College of Software', major:['Software', 'AI']},
        {id: "9", name: 'College of Business & Economics', major:['Business Management', 'Economics', 'Applied Statistics', 'Advertising and Public Relations', 'International Logistics', 'Knowledge & Business Administration', 'Industrial Security']},
        {id: "10", name: 'College of Medicine', major:['Medicine']},
        {id: "11", name: 'College of Pharmacy', major: ['Pharmacy']},
        {id: "12", name: 'Red Cross College of Nursing', major:['Nursing']},
        {id: "13", name: 'College of Art', major:['Performance Video Creation(Seoul)', 'Performance Video Creation(Anseong)', 'Art', 'Design', 'Music', 'Traditional Art', 'Global Arts']},
        {id: "14", name: 'College of Art and Technology', major:['Computer Art']},
        {id: "15", name: 'College of Sport Sciences', major:['Sports Science']},
    ];

    return(
        <>
            <Provider>
            <ThemeProvider theme={lightTheme}>
            <Router>
                <Switch>
                    <Route
                        exact path='/'
                        render={props => (
                            <Main {...props} />
                        )}
                    />
                    {/* <Route
                        exact path="/login"
                        render={(props)=><LogIn setUser={setUser} {...props} />}
                    /> */}
                    <Route
                        exact path="/signUp"
                        render={(props)=><SignUp departmentList={departmentList} {...props}/>}
                        />
                    <AuthRoute
                        exact path="/home"
                        render={(props) => <DiaryList 
                                                departmentList={departmentList}
                                                {...props}/> }
                        />
                    <AuthRoute
                        exact path="/home/diary/:groupIdx"
                        render={(props) => <Diary {...props}/>}
                        />
                    <AuthRoute
                        exact path="/home/diary/:groupIdx/setting"
                        render={(props) => <GroupSetting {...props}/>}
                        />
                    <AuthRoute
                        exact path="/home/diary/:groupIdx/:year-:month-:day"
                        render={(props) => <Day {...props} />}
                        />
                    <AuthRoute
                        exact path="/invitation"
                        render={(props) => <Invitation departmentList={departmentList}/>}
                        />
                    <AuthRoute
                        exact path='/home/diary/:groupIdx/chat'
                        render={(props) => <Chat {...props}/> }
                        />
                    <AuthRoute
                        exact path="/home/diary/:groupIdx/:year-:month-:day/:postIdx/edit"
                        render={(props) => <EditPost />}
                        />
                    <AuthRoute
                        exact path="/setting"
                        render={(props) => <MySetting departmentList={departmentList}/> }
                        />
                    <AuthRoute
                        exact path="/setting/edit-profile"
                        render={(props) => <EditProfile departmentList={departmentList} />}
                        />
                    <Route component={NotFound}/>
                </Switch>
            </Router>
            </ThemeProvider>
            </Provider>
        </>
    );
}

export default App;
