
import React, { useState } from 'react';
import { ListGroup, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import edit from '../resources/edit-tools.png';
import info from '../resources/delete.png'
import EditGeneralInfo from '../component/editSubject/EditGeneralInfo';
import history from '../utils/history';
import './SubjectInfoAdmin.css';

export default function SubjectInfoAdmin({subject, selectSubjectTo, handleEditButtons}) {
    const { id } = subject;

    // show edit modals generalInfo and commissions
    const [showGeneralInfoModal, setShowGeneralInfoModal] = useState(false);

    const hideGeneralInfoModal = () => { setShowGeneralInfoModal(false) };

    const handlePopoverClick = () => {
        document.getElementById(popoverId).style.visibility = "hidden";
        setShowGeneralInfoModal(true);
    }

    const popoverId = `popover-${id}`;

    const editPopover = (
        <Popover id={popoverId}>
            <Popover.Title as="h3">¿Qué va a editar?</Popover.Title>
            <Popover.Content onClick={ () => handlePopoverClick() }>Editar info general</Popover.Content>
            <Popover.Content onClick={ () => goEditCommissions() }>Editar comisiones</Popover.Content>
        </Popover>
    );

    const goEditCommissions = () => { history.push(`/admin/edit-commissions/${id}`); }

    const idEditButton= `id-edit-button-${id}`;

    return (
        <>
            <ListGroup.Item>
                <Row>
                    <Col sm="8">
                        <p>Nombre: {subject.name}</p>
                        <p>Carrera: {subject.degrees[0].name}</p> {/* semi hardcoeado */}
                    </Col>
                    <Col sm="2">
                        <OverlayTrigger trigger="click" 
                                        placement="right" 
                                        overlay={editPopover}
                                        >
                            <button id={idEditButton} className="button-edit"
                                    onClick={ () => handleEditButtons(idEditButton)}>
                                        <img src={edit} alt="edit icon"/>
                            </button>
                        </OverlayTrigger>
                    </Col>
                    {/* <Col sm="2" onClick={ () => selectSubjectTo(id,"delete")}>
                        <img src={info} alt="info icon"/>
                    </Col>*/}{/* Deshabilitado por no funcioanr*/}
                </Row>
            </ListGroup.Item>

            <EditGeneralInfo 
                subject={subject}
                show={showGeneralInfoModal} 
                hide={hideGeneralInfoModal}
                selectSubjectTo={selectSubjectTo}
                handleEditButtons={handleEditButtons}
                idEditButton={idEditButton} />
        </>
    )

}