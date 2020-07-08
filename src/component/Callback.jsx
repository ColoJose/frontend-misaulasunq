import history from '../utils/history';
// react
import React from 'react';
//Auth0
import { useAuth0 } from '../react-auth0-spa';
//Own Components
import Error from './Error';
import Loading from './Loading';

const Callback = (...props) =>{ 

    const { isAuthenticated, loading } = useAuth0();
    
    if(!loading){
        if(isAuthenticated){
            return <>{history.push("/admin")}</>;
        } else {
            if(window.location.search.includes("error=")){
                const urlParams = new URLSearchParams(window.location.search);
                const error = urlParams.get("error");
                const errorDescription = urlParams.get("error_description");

                return <Error errorOccurred={error} description={errorDescription} {...props}/>;
            }

            return <>{history.push("/")}</>;
        }
    } else {
        return <Loading inverted={true} className="text-muted font-weight-bold"/>;
    }
}

export default Callback;