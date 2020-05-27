import React, { useState } from 'react';
import {Card, Container, Col, Row} from 'react-bootstrap';
import './NewSubjectForm.css';
import GeneralInfoForm from './GeneralInfoForm';
import CommissionForm from './CommissionForm';
import SubjectAPI from '../../Api/SubjectAPI';
import SubjectCreatedSuccessModal from './SubjectCreatedSuccessModal';

export default function NewSubjectForm() {

    const subject = { };
    const subjectApi = new SubjectAPI();

    // modal subject created successfull -> TODO
    const [showModalCreatesSuccess, setShowModalCreatesSuccess] = useState(true);
    const [messageReply,setMessageReply] = useState('');
    const handleClose = () => setShowModalCreatesSuccess(false);

    const [generalInfoSubject, setGeneralInfoSubject ] = useState(null);
    const [commissions, setCommissions] = useState([]);

    const addCommission = (commission) => {
        setCommissions(commissions.concat([commission]));
    }

    const joinDataSubject = (generalInfoSubject) => {
        setGeneralInfoSubject(generalInfoSubject);
        subject.name = generalInfoSubject.name;
        subject.subjectCode = generalInfoSubject.subjectCode;
        subject.commissions = commissions;
        subject.degreeId = generalInfoSubject.degreeId;
        createNewSubject();
    }

    const createNewSubject = () => {
        subjectApi.createNewSubject(subject).then( res => {
            showModalCreatedSuccess(res.data);
        }).catch(e => {
            console.log(e);
        })

    }

    const showModalCreatedSuccess = (data) =>{
        // setMessageReply(data);                   // TODO
        // setShowModalCreatesSuccess(true);        
        // setTimeout( () => setShowModalCreatesSuccess(false),2000);
        alert(data);
    }

    return  (
        
        <Card className="wrapper">
            <Card.Header>Formulario nueva materia</Card.Header>
            <Card.Body>
                <Container fluid="md">
                    <Row>
                        <Col xs={6}>
                            <h2>Info general materia</h2>
                            <GeneralInfoForm 
                                commissions={commissions}
                                joinDataSubject={joinDataSubject}/>
                        </Col>
                        <Col xs={6}>
                            
                            <CommissionForm
                                addCommission={addCommission} />
                        </Col>
                    </Row>
                </Container>    
            </Card.Body>
            <SubjectCreatedSuccessModal 
                // show={true}
                // message={messageReply}
            />
        </Card>
    )
}

