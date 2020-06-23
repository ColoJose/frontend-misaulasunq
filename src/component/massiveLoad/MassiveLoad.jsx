import React, {useReducer} from 'react';
// Bootstrap
import { Button, Modal, Form } from "react-bootstrap";
// css
import "../ButtonBranding.css";
import "./MassiveLoad.css";
import UploaderAPI from "../../Api/UploaderAPI";

//TODO: API, Validacion de tipo de archivo, spinner de carga, bloqueo de botones
function MassiveLoad(){

  const defaultLabel = "Elija un archivo para subir";

  const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),{show: false, loading: true, label:defaultLabel});

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

    const setLabel = (event) => {
      //event.preventDefault();
      setState({label:event.currentTarget.files[0].name})
  }

    return (
        <>
            <Form onSubmit={submitHandler}>
                <Form.File id="uploadFileInput"
                            custom={true}
                            label={state.label} 
                            data-browse="Examinar"
                            accept=".xls,.xlsx"
                            onChange={setLabel}
                            />
                <Button type="submit"
                        className="color-button"
                        variant="danger">
                        Cargar
                </Button>
            </Form>
        </>
    );
}

export default MassiveLoad; 