import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';
//Own Components
import Error from './Error';
import Loading from './Loading';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  
  const { loading, isAuthenticated } = useAuth0();

    if(!loading){
        if(isAuthenticated){
            return <Route path={path} component={Component} {...rest} />;
        } else {
            return <Error {...rest}
                          errorOccurred="¡No estas autorizado!"
                          errorDescription="Estas intentando acceder a una pagina sin autorizacion, seras redirigido en breve."
                          returnToHome={true}
                          waitTimeBeforeReturn={5000}/>;
        }
    } else {
        return <Loading inverted={true} className="text-muted font-weight-bold"/>;
    }
};

export default PrivateRoute;
