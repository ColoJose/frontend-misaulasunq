import React, {useReducer} from 'react';
// Bootstrap
import { Button, Modal } from "react-bootstrap";
// Resources
import Map from './Map';
// react-icons
import { BsGeoAlt } from 'react-icons/bs';
// Semantic UI
import { Dimmer, Loader } from 'semantic-ui-react';
// css
import './MapModal.css';

function MapModal({classRoomNumber}){

  const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),{show: false, loading: true});
  const handleReady = () => setState({loading: false});
  const handleClose = () => setState({show: false, loading: true});
  const handleShow = () => setState({show: true});

    // const [show, setShow] = useState(false);
    // const [loading, setLoading] = useState(true);

    // const handleReady = () => setLoading(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    //TODO: Evaluar si se separa en componetes mas pequeños
    return (
        <>
          <Button variant="outline-danger"
                  onClick={handleShow}>
              <BsGeoAlt size='1em'/>
          </Button>

          <Modal show={state.show} 
                 onHide={handleClose}
                 size="xl"
                 aria-labelledby="contained-modal-title-vcenter"
                 centered>
            <Modal.Header closeButton>
              <Modal.Title>
                Ubicación del Aula {classRoomNumber} en la UNQ
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <Dimmer active={state.loading} inverted>
                  <Loader indeterminate>Cargando Mapa</Loader>
              </Dimmer>
              <Map classroom={classRoomNumber}
                   mapReady={handleReady} 
              />
            </Modal.Body>
          </Modal>
        </>
    );
}

export default MapModal; 
