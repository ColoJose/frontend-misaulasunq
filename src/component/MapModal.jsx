import React ,{useState} from 'react';
//Bootstrap
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Map from './Map';

function MapModal(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //TODO: Evaluar si se separa en componetes mas pequeños
    return (
        <>
          <Button variant="primary" 
                  onClick={handleShow}>
            Ver en Mapa
          </Button>

          <Modal show={show} 
                 onHide={handleClose}
                 size="xl"
                 aria-labelledby="contained-modal-title-vcenter"
                 centered>
            <Modal.Header closeButton>
              <Modal.Title>Ubicación del Aula {"CyT-1"} en la UNQ</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <Map classroom={"CyT-1"}/>
            </Modal.Body>
          </Modal>
        </>
    );
}

export default MapModal; 
