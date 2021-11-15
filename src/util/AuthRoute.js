import React , {useState,useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import jwt_decode from "jwt-decode";

function AuthRoute({path, render, component: Component, renderComp, ...rest }){
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        var token = localStorage.getItem('userToken');
        if(token){
            var { exp } = jwt_decode(token);
            var expirationTime = (exp * 1000) - 60000;

            if(Date.now() >= expirationTime){
                localStorage.clear();
                setIsExpired(true);
            }
        }
        else{
            setIsExpired(true);
        }
    }, []);

    return(
        <Route
            path={path}
            render={(props) =>
                isExpired?
                (
                    alert("Your session has expired. Please sign-in again."),
                    <Redirect
                        to={{pathname: "/", state: {from: props.location} }}
                        />
                )
                :
                (
                    Component ?
                        <Component {...props} />
                        :
                        render(props)
                )
            }
        />
    );
 }

export default AuthRoute;