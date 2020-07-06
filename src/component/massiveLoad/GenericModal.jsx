import React, {useReducer} from 'react';
// Bootstrap
import { Button, Modal } from "react-bootstrap";
// css
import './Modal.css';
import '../ButtonBranding.css';

function GenericModal({title, children, buttonLabel, buttonStyle, bodyStyle, size, maxWidth=false}){

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

  const applyMaxWidthWithPX1 = () => {
    if(maxWidth){
      return "px-1 mw-100";
    }
    return "";
  }

    return (
        <>
          <Button variant="outline-danger"
                  onClick={handleShow}
                  className={showButtonStyle()}>
              {buttonLabel}
          </Button>

          <Modal className={applyMaxWidthWithPX1()}
                 dialogClassName={applyMaxWidthWithPX1()}
                 show={state.show} 
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
