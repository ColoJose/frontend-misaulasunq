import React, {useReducer} from 'react';
// Bootstrap
import { Button, Modal, Form } from "react-bootstrap";
// css
import "../ButtonBranding.css";
import UploaderAPI from "../../Api/UploaderAPI";

//TODO: API, Validacion de tipo de archivo, spinner de carga, bloqueo de botones
function MassiveLoadModal(){

  const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),{show: false, loading: true});
  const handleReady = () => setState({loading: false});
  const handleClose = () => setState({show: false, loading: true});
  const handleShow = () => setState({show: true});


    const submitHandler = (event) => {
        event.preventDefault();
        let files = event.target[0].files;
        const uploaderApi= new UploaderAPI();

        if(files && files.length === 1){
            uploaderApi.uploadFile(files[0])
                    .then((response) => {
                        console.log('Archivo recibido');            
                    }).catch((response) => {
                        console.log('Archivo no procesado');            
                    });
        } else {
            console.log('Hay que seleccionar archivo');
        }
        
    }

    return (
        <>
          <Button className="color-button"
                  variant="danger"
                  onClick={handleShow}>
            Carga Masiva              
          </Button>

          <Modal show={state.show} 
                 onHide={handleClose}
                 size="xl"
                 aria-labelledby="contained-modal-title-vcenter"
                 centered>
            <Modal.Header closeButton>
              <Modal.Title>
                Carga masiva de Horarios
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <Form onSubmit={submitHandler}>
                    <Form.File id="exampleFormControlFile1" 
                               label="Elija un archivo para subir" 
                               accept=".csv"/>
                    <Button type="submit"
                            className="color-button"
                            variant="danger">
                            Cargar
                    </Button>
                </Form>
            </Modal.Body>
          </Modal>
        </>
    );
}

export default MassiveLoadModal; 