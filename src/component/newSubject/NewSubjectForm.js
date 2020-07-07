import React, { useState } from 'react';
import {Card, Container, Col, Row, Button} from 'react-bootstrap';
import './NewSubjectForm.css';
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

    const subject = {};
    const subjectApi = new SubjectAPI();

    const [generalInfoSubject, setGeneralInfoSubject ] = useState(null);
    const [commissions, setCommissions] = useState([]);

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
        subjectApi.createNewSubject(subject).then( res => {
            newSubjectCreatedSuccess(res.data);
            document.getElementById("subjectCodeNewForm").style.border = "";
         }).catch(e => {
             handleErrorPostReq(e);
         })
    }

    const handleErrorPostReq = (e) => { 
        document.getElementById("subjectCodeNewForm").style.border = "1px solid red"
        toast.error("El código materia está repetido", generalError);
    }

    const handleErrors = () => { 
        document.getElementById("addedCommissionsSection").style.border = "1px solid red";
        toast.error("Debe agregar al menos una comisión",commissionError);
    }

    const newSubjectCreatedSuccess = (message) => { toast.success(message, newSubjectConfig) }

    return  (
        <>
            {/* <Button onClick={ () => history.push("/admin")}>Volver atrás</Button> */}
            <Card className="wrapper">
                <Card.Header>Formulario nueva materia</Card.Header>
                <Card.Body>
                    <Container fluid="md">
                        <Row>
                            <Col xs={6}>
                                <h2>Info general materia</h2>
                                <GeneralInfoForm 
                                    commissions={commissions}
                                    joinDataSubject={joinDataSubject}
                                    deleteCommission={deleteCommission} />
                            </Col>
                            <Col xs={6}>
                                <CommissionForm
                                    addCommission={addCommission} />
                            </Col>
                        </Row>
                    </Container>    
                </Card.Body>
            </Card>
        </>
    )
}

