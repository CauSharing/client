import React from "react";
import {Route, Redirect} from "react-router-dom";

function AuthRoute({authenticated, component: Component, render, ...rest}){
    return(
        <Route
            {...rest}
            render={(props) =>
                authenticated ? (
                    render ?(
                        console.log("render props"),
                        render(props)
                    ) : (
                        console.log("show Component"),
                        <Component {...props} />
                    )
                ) : (
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