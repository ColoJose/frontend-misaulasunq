import history from '../utils/history';
// react
import React from 'react';
// Bootstrap
import { Button, Container, Row, Col } from 'react-bootstrap';
// React-Icons
import { MdError } from "react-icons/md";
// css
import "./Branding.css";
import "./ButtonBranding.css";

const Error = ({errorOccurred, errorDescription, returnToHome=false, waitTimeBeforeReturn=0, ...props}) =>{ 
    
    const goToHome = () => {
        // history.push("/");
        history.goBack();
    }

    const renderMessage = (errorOcurred, errorDescription) =>{
        if(errorOcurred && errorDescription){
            return(
                <>
                    <Col className="my-3 font-weight-bold h4" xs={12}>
                        {errorOcurred}
                    </Col>
                    <Col className="my-1 font-weight-bolder text-muted h6" xs={12}>
                        {errorDescription}
                    </Col>
                </>);
        } else {
            return(
                <>
                    <Col className="my-3 font-weight-bold h4" xs={12}>
                        ¡Tuvimos un problema!
                    </Col>
                    <Col className="my-1 font-weight-bolder text-muted h6" xs={12}>
                        Ha Ocurrido Un Error al procesar la peticion.
                    </Col>
                    <Col className="my-1 font-weight-bolder text-muted h6" xs={12}>
                        Limpie el historial de navegacion y reintente, si el problema persiste comuniquese con un administrador.
                    </Col>
                </>);
        }
    }
    
    if(returnToHome){
        setTimeout(goToHome, waitTimeBeforeReturn);
    }

    return (
        <Container fluid
                   className="h-100 w-100 d-flex justify-content-center align-items-center text-center flex-fill"
                   style={{backgroundColor:"#e2e3de"}}>
            <Row>
                <Col className="my-0" xs={12}>
                    <MdError className="branding-red-icon" size="10rem"/>
                </Col>
                {renderMessage(errorOccurred, errorDescription)}
                <Col className="my-3" xs={12}>
                    <Button className="color-button"
                            onClick={goToHome}
                            hidden={returnToHome}>
                        Volver
                    </Button>
                </Col>
            </Row>
        </Container>);
}

export default Error;