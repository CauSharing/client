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
    const departmentList = [
        {id: 1, name: 'College of Liberal Arts', major: ['Korean Language and Literature','English Language and Literature', 'German Literature', 'French Literature', 'Russian Language and Literature', 'Japanese Language and Literature', 'Chinese Language and Literature', 'Philosophy', 'History']},
        {id: 2, name: 'College of Social Sciences', major:['Political Science and International Relations','Public Service','Psychology','Library and Information Science','Social Welfare','Media and Communication','Urban Planning and Real Estate', 'Sociology']},
        {id: 3, name: 'College of Education', major: ['Education', 'Early Childhood Education', 'English Education', 'Physical Education']},
        {id: 4, name: 'College of Natural Sciences', major:['Physics', 'Chemistry', 'Life Science', 'Mathematics']},
        {id: 5, name: 'College of Biotechnology and Natural Resources', major:['Biological Resources Engineering', 'Food Engineering', 'Systems Biotechnology']},
        {id: 6, name: 'College of Engineering', major:['Civil & Environmental Engineering, Urban Design and Study', 'Architecture & Building Science', 'Chemical Engineering and Materials Science', 'Mechanical Engineering', 'Energy Systems Engineering', 'Advanced Materials Engineering']},
        {id: 7, name: 'College of ICT Engineering', major:['Electrical and Electronics Engineering', 'Integrative Engineering']},
        {id: 8, name: 'College of Software', major:['Software', 'AI']},
        {id: 9, name: 'College of Business & Economics', major:['Business Management', 'Economics', 'Applied Statistics', 'Advertising and Public Relations', 'International Logistics', 'Knowledge & Business Administration', 'Industrial Security']},
        {id: 10, name: 'College of Medicine', major:['Medicine']},
        {id: 11, name: 'College of Pharmacy', major: ['Pharmacy']},
        {id: 12, name: 'Red Cross College of Nursing', major:['Nursing']},
        {id: 13, name: 'College of Art', major:['Performance Video Creation(Seoul)', 'Performance Video Creation(Anseong)', 'Art', 'Design', 'Music', 'Traditional Art', 'Global Arts']},
        {id: 14, name: 'College of Art and Technology', major:['Computer Art']},
        {id: 15, name: 'College of Sport Sciences', major:['Sports Science']},
    ];

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
                        render={()=><SignUp departmentList={departmentList}/>}
                        />
                    <Route
                        path="/home"
                        render={()=><DiaryList userToken={userToken} departmentList={departmentList}/>}
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
