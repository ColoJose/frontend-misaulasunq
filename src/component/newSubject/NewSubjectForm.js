import React, { useState, useEffect } from 'react';
import {Card, Container, Col, Row, Button} from 'react-bootstrap';
import './NewSubjectForm.css';
import "../HeaderBranding.css";
import GeneralInfoForm from './GeneralInfoForm';
import CommissionForm from './CommissionForm';
import SubjectAPI from '../../Api/SubjectAPI';
// toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { newSubjectConfig, commissionError, generalError } from '../../utils/toast-config';
// validator
import { isValidCommission, isValidSubject } from '../../utils/formValidator';
import history from '../../utils/history';


export default function NewSubjectForm() {
    const emptyOptionsList = [<option key={"Seleccionar"} value={"Seleccionar"} label={"Seleccionar"}>Seleccionar</option>];

    const subject = {};
    
    const [generalInfoSubject, setGeneralInfoSubject ] = useState(null);
    const [commissions, setCommissions] = useState([]);
    const [degreeOptions,setDegreeOptions] = useState([]);
    const [classroomsOptions, setClassroomsOptions] = useState(emptyOptionsList);

    useEffect( () => {
        const subjectApi = new SubjectAPI();
        subjectApi.getAllDegrees()
            .then( 
                (resp) => {
                    setDegreeOptions(makeDegreeOptions(resp.data));
            }).catch( 
                (e) => {
                    console.log(e); 
            });

        subjectApi.getAllClassrooms()
            .then( 
                (resp) => {
                    setClassroomsOptions(makeOptions(resp.data));
            }).catch( 
                (e) => console.log(e) 
            );

    },[]);

    const makeOptions = (options) =>{
        var optionsToReturn = emptyOptionsList;
        options.forEach(
            (option) => optionsToReturn.push(<option key={option} value={option} label={option}>{option}</option>)
        );
        return optionsToReturn;
    }

    const makeDegreeOptions = (options) =>{
        var optionsToReturn = [];
        options.forEach(
            (option) => optionsToReturn.push(<option key={option.id} value={option.id} label={option.name}>{option.name}</option>)
        );
        return optionsToReturn;
    }

    const addCommission = (commission,cleanUpCommission) => {
        
        if(isValidCommission(commission)) {
            document.getElementById("addedCommissionsSection").style.border = "";
            setCommissions(commissions.concat([commission]));
            cleanUpCommission();
        }else {
            schedulePart().style.border = "1px solid red";
            toast.error("Debe agregar un schedule a la comision", generalError)
        }
    }

    const deleteCommission = (id) => {
        var index = commissions.findIndex( com => com.id === id);
        commissions.splice(index,1);
        setCommissions([...commissions]);
    }

    const schedulePart = () => { return document.getElementById("addedSchedulesSection") }
    
    const joinDataSubject = (generalInfoSubject) => {
        setGeneralInfoSubject(generalInfoSubject);
        subject.name = generalInfoSubject.name;
        subject.subjectCode = generalInfoSubject.subjectCode;
        subject.commissions = commissions;
        subject.degreeId = generalInfoSubject.degreeId;
        createNewSubject();
    }

    // si la materia tiene al menos una comisión procede a la llamada al back q crea la materia
    const createNewSubject = () => {

        if( isValidSubject(subject)) {
            createNewSubjectRequest();
        } else {
            handleErrors();
        }
    }

    const createNewSubjectRequest = () => {
        const subjectApi = new SubjectAPI();
        subjectApi.createNewSubject(subject).then( res => {
            newSubjectCreatedSuccess(res.data);
            document.getElementById("subjectCodeNewForm").style.border = "";
         }).catch(e => {
             handleErrorPostReq(e);
         })
    }

    const handleErrorPostReq = (e) => { 
        let errorMessage = "Ocurrió un error inesperado. Por favor intente nuevamente o comuníquese con un administrador.";
        if(e.response.status === 400 && e.response.data === "Clave Duplicada"){
            errorMessage = "El código materia está repetido.";
            document.getElementById("subjectCodeNewForm").style.border = "1px solid red";
        }
        toast.error(errorMessage, generalError);
    }

    const handleErrors = () => { 
        document.getElementById("addedCommissionsSection").style.border = "1px solid red";
        toast.error("Debe agregar al menos una comisión",commissionError);
    }

    const newSubjectCreatedSuccess = (message) => { toast.success(message, newSubjectConfig) }

    return  (
        <Container className="pt-1">
            <Row className="pl-3 my-2">
               <b className="h4">
                  Carga de Materia
               </b>
            </Row>
            <Row className="mt-2 px-3">
                <Card className="wrapper">
                    <Card.Header className="h6 header-branding">
                        Formulario de Alta
                    </Card.Header>
                    <Card.Body>
                        <Container fluid>
                            <Row>
                                <Col xs={6}>
                                    <h3>Información General</h3>
                                    <GeneralInfoForm degreeOptions={degreeOptions}
                                                     commissions={commissions}
                                                     joinDataSubject={joinDataSubject}
                                                     deleteCommission={deleteCommission} />
                                </Col>
                                <Col xs={6}>
                                    <CommissionForm classroomOptions={classroomsOptions}
                                                    addCommission={addCommission} />
                                </Col>
                            </Row>
                        </Container>    
                    </Card.Body>
                    <Card.Footer className="pt-2 pb-1">
                        <Button onClick={ () => history.push("/admin")}
                                className="color-button"
                                style={{marginBottom:"5px"}}>Cancelar</Button>
                    </Card.Footer>
                </Card>
            </Row>
        </Container>
    )
}

