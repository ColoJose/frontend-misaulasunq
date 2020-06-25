import React, {useReducer} from 'react';
// Bootstrap
import { Button, Modal } from "react-bootstrap";
// css
import './Modal.css';
import '../ButtonBranding.css';

function GenericModal({title, children, buttonLabel, buttonStyle, bodyStyle, size}){

  const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),{show: false});
  const handleClose = () => setState({show: false});
  const handleShow = () => setState({show: true});

  const showButtonStyle = () => {
    if(buttonStyle){
      return `${buttonStyle}`;
    }
    return '';
  }

  const showBodyStyle = () => {
    if(bodyStyle){
      return `${bodyStyle}`;
    }
    return '';
  }

  const getSize = () => {
    return size;
  }

    return (
        <>
          <Button variant="outline-danger"
                  onClick={handleShow}
                  className={showButtonStyle()}>
              {buttonLabel}
          </Button>

          <Modal show={state.show} 
                 onHide={handleClose}
                 size={getSize()}
                 aria-labelledby="contained-modal-title-vcenter"
                 centered>
            <Modal.Header closeButton>
              <Modal.Title>
                {title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={showBodyStyle()}>
              {children}
            </Modal.Body>
          </Modal>
        </>
    );
}

export default GenericModal; 
