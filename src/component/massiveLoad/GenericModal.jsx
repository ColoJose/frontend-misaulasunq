import React, {useReducer} from 'react';
// Bootstrap
import { Button, Modal } from "react-bootstrap";
// css
import './Modal.css';
import '../ButtonBranding.css';

function GenericModal({title, children, buttonLabel, style}){

  const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),{show: false});
  const handleClose = () => setState({show: false});
  const handleShow = () => setState({show: true});

  const showStyle = () => {
    return `${style}`;
  }

    return (
        <>
          <Button variant="outline-danger"
                  onClick={handleShow}
                  className={showStyle()}>
              {buttonLabel}
          </Button>

          <Modal show={state.show} 
                 onHide={handleClose}
                 size="xl"
                 aria-labelledby="contained-modal-title-vcenter"
                 centered>
            <Modal.Header closeButton>
              <Modal.Title>
                {title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              {children}
            </Modal.Body>
          </Modal>
        </>
    );
}

export default GenericModal; 
