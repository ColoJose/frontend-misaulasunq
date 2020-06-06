
import React, { useState } from 'react';
import { ListGroup, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import edit from '../resources/edit-tools.png';
import info from '../resources/delete.png'
import EditGeneralInfo from '../component/editSubject/EditGeneralInfo';
import history from '../utils/history';

export default function SubjectInfoAdmin({subject,selectSubjectTo}) {
    const { id } = subject;

    // show edit modals generalInfo and commissions
    const [showGeneralInfoModal, setShowGeneralInfoModal] = useState(false);

    const hideGeneralInfoModal = () => { setShowGeneralInfoModal(false) };

    const editPopover = (
            <Popover id="popover-basic">
              <Popover.Title as="h3">¿Qué va a editar?</Popover.Title>
              <Popover.Content onClick={ () => setShowGeneralInfoModal(true) }>Editar info general</Popover.Content>
              <Popover.Content onClick={ () => goEditCommissions() }>Editar comisiones</Popover.Content>
            </Popover>
    );

    const goEditCommissions = () => { 
        history.push(`/admin/edit-commissions/${id}`); 
    }

    return (
        <>
            <ListGroup.Item>
                <Row>
                    <Col sm="8">
                        <p>Nombre: {subject.name}</p>
                        <p>Carrera: {subject.degrees[0].name}</p> {/* semi hardcoeado */}
                    </Col>
                    <Col sm="2">
                        <OverlayTrigger trigger="click" placement="right" overlay={editPopover}>
                            <img src={edit} alt="edit icon"/>
                        </OverlayTrigger>
                    </Col>
                    <Col sm="2" onClick={ () => selectSubjectTo(id,"delete")}>
                        <img src={info} alt="info icon"/>
                        </Col>
                </Row>
            </ListGroup.Item>

            <EditGeneralInfo 
                subject={subject}
                show={showGeneralInfoModal} 
                hide={hideGeneralInfoModal}
                selectSubjectTo={selectSubjectTo} />
        </>
    )

}