import React, {useReducer} from 'react';
// Bootstrap
import { Button, Alert, Form } from "react-bootstrap";
// toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadConfig } from '../../utils/toast-config';
// css
import "../ButtonBranding.css";
import UploaderAPI from "../../Api/UploaderAPI";
import {parseError} from "../../utils/CodeErrorParser";

function MassiveLoad(){

    const validExtensions = [".xls",".xlsx"];
    const defaultLabel = "Elija un archivo para subir";

    const [state, setState] = useReducer(
        (state, newState) => (
            {...state, ...newState}),
            {loading: true, label:defaultLabel, noFileSelected: false, valid: false,errorMessage:"Seleccione"});

    const submitHandler = (event) => {
        event.preventDefault();
        let files = event.target[0].files;
        const uploaderApi= new UploaderAPI();

        if(isValidExtension(files)){
            uploaderApi.uploadFile(files[0])
                    .then((response) => {
                        toast.success("Archivo Procesado.", uploadConfig);         
                    }).catch((response) => {
                        toast.error(parseError(response.response), uploadConfig);
                    });
        }
    }

    const setLabel = (event) => {
        if(event.currentTarget.files[0]){
            applyBorderStyle(false);
            setState({label:event.currentTarget.files[0].name,noFileSelected:false});
        } else {
            setState({label:defaultLabel,noFileSelected:false});
        }
    }

    const isValidExtension = (files) => {
        if(!files || files.length === 0){
            applyBorderStyle(true);
            setState({
                noFileSelected:true,
                errorMessage: "Debe Seleccionar Un Archivo"
            });
            // toast.error("Debe Seleccionar Un Archivo", uploadConfig);
            return false;
        }

        let isValid = false;
        for (let index = 0; index < validExtensions.length; index++) {
            isValid = isValid || state.label.toLowerCase().includes(validExtensions[index]);// !== 1;
        }

        if(!isValid){
            applyBorderStyle(true);
            setState({
                noFileSelected:true,
                errorMessage: "La Extension del archivo no es valida."
            });
            // toast.error("La Extension del archivo no es valida.", uploadConfig);
            return false;
        } 
        return true;        
    }

    const applyBorderStyle = (error) => {
        var inputFileLabel = document.getElementsByClassName("custom-file-label");
        if(error){
            inputFileLabel[0].style.border = "1px solid red";
        } else {
            inputFileLabel[0].style.border = "1px solid #ced4da";
        }
    }

    const noFileError = () =>{
        if(state.noFileSelected){
            return <small style={{color:"red"}}>{state.errorMessage}</small>;
        } 
        return <></>;
    }

    return (
        <>
            <Alert variant="info">
                <Alert.Heading className="text-center">¡Recordatorio!</Alert.Heading>
                <hr />
                <p className="justify-content-start">
                    - El Archivo a Importar debe ser de extensión <b>.xls</b>(Microsoft Excel 97-2003) o <b>.xlsx</b>(Microsoft Excel 2007).<br/>
                    - Es necesario que la Carrera y las Aulas a cargar estén dadas de altas.<br/>
                    - El proceso de carga <b>NO</b> modifica horarios <b>NI</b> comisiones ya cargadas.<br/>
                    - El tamaño máximo de archivo permitido: <b>25MB</b>.<br/>
                </p>
            </Alert>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-1">
                    <Form.File id="uploadFileInput"
                            custom={true}
                            label={state.label} 
                            data-browse="Buscar"
                            accept=".xls,.xlsx"
                            onChange={setLabel}
                            />
                </Form.Group>
                {noFileError()}
                <Button type="submit"
                        className="color-button mt-2 text-center"
                        variant="danger"
                        block>
                    Cargar
                </Button>
            </Form>
        </>
    );
}

export default MassiveLoad; 