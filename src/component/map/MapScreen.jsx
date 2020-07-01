import React, {useReducer} from 'react';
// Resources
import Map from './Map';
// Semantic UI
import { Dimmer, Loader } from 'semantic-ui-react';
// css
import './MapScreen.css';

function MapScreen({classRoomNumber}){

  const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),{loading: true});
  const handleReady = () => setState({loading: false});

    return (
        <>
          <Dimmer active={state.loading} inverted>
              <Loader indeterminate>Cargando Mapa</Loader>
          </Dimmer>
          <Map classroom={classRoomNumber}
               mapReady={handleReady}/>
        </>
    );
}

export default MapScreen; 
