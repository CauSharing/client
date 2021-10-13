import React from "react";
import {Route, Redirect} from "react-router-dom";
import DiaryList from "../pages/DiaryList";

function AuthRoute({component: Component, renderComp, ...rest }){
    const token = localStorage.getItem('userToken');

    return(
        <Route
            render={(props) =>
                token?
                (
// {/*                     <DiaryList {...props} /> */}
                    Component ? <Component {...props} /> : renderComp

                )
                :
                (
                    console.log("인증 필요: 로그인 페이지로 돌아갑니다"),
                    <Redirect
                        to={{pathname: "/", state: {from: props.location} }}
                        />
                )

            }
        />
    );
 }

export default AuthRoute;