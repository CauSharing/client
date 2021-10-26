import React from "react";
import {Route, Redirect} from "react-router-dom";

function AuthRoute({path, render, component: Component, renderComp, ...rest }){
    const token = localStorage.getItem('userToken');

    return(
        <Route
            path={path}
            render={(props) =>
                token ?
                (
                    Component ?
                        <Component {...props} />
                        :
                        render(props)
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