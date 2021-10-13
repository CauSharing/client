import React from "react";
import {Route, Redirect} from "react-router-dom";

function AuthRoute({userToken, component: Component, ...rest}){
    return(
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem('userToken')?(
                    <Component {...props} />
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