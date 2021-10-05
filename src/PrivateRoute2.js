import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'
import jwt from "jwt-decode"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)  
  useEffect(() => {
    let token = localStorage.getItem("token");
        if(token) {
            let tokenExpiration = jwt(token).exp;
            let dateNow = new Date();

            if(tokenExpiration < dateNow.getTime()/1000) {
                localStorage.clear();
                setIsAuthenticated(false)
            }else{
                setIsAuthenticated(true)
            }
        } else {
          localStorage.clear();
          setIsAuthenticated(false)
        }
    // eslint-disable-next-line
  })

  if(isAuthenticated === null){
    return <></>
  }

  return (
    <Route {...rest} render={props =>
      isAuthenticated ? (
        <Redirect to='/dashboard'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};

export default PrivateRoute;