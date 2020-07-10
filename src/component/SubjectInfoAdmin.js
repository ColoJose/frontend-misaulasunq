import React, { useState } from 'react';
import { Button, ListGroup, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import EditGeneralInfo from '../component/editSubject/EditGeneralInfo';
import history from '../utils/history';
//react icons
import { MdModeEdit } from 'react-icons/md';
//Css
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
            <Popover.Title className="h3 font-weight-bold">¿Qué va a editar?</Popover.Title>
            <Popover.Content onClick={ () => handlePopoverClick() }>Editar información general</Popover.Content>
            <Popover.Content onClick={ () => goEditCommissions() }>Editar comisiones</Popover.Content>
        </Popover>
    );

    const goEditCommissions = () => { history.push(`/admin/edit-commissions/${id}/${subject.name}`); }

    const idEditButton= `id-edit-button-${id}`;

    return (
        <>
            <ListGroup.Item className="px-3 py-2">
                <Row className="d-flex align-items-center">
                    <Col xs={11}>
                        <p><b>Nombre:</b> {subject.name}</p>
                        <p><b>Carrera:</b> {subject.degrees[0].name}</p> {/* semi hardcoeado */}
                    </Col>
                    <Col xs={1}>
                        <OverlayTrigger trigger="click" 
                                        placement="right" 
                                        overlay={editPopover}>
                            <Button id={idEditButton}
                                    variant="light"
                                    className="p-1"
                                    onClick={ () => handleEditButtons(idEditButton)}>
                                <MdModeEdit className="branding-red-icon" size='1.75em'/>
                            </Button>
                        </OverlayTrigger>
                    </Col>
                    {/* <Col sm="2" onClick={ () => selectSubjectTo(id,"delete")}>
                        <img src={info} alt="info icon"/>
                    </Col>*/}{/* Deshabilitado por no funcioanr*/}
                </Row>
            </ListGroup.Item>

            <EditGeneralInfo subject={subject}
                             show={showGeneralInfoModal} 
                             hide={hideGeneralInfoModal}
                             selectSubjectTo={selectSubjectTo}
                             handleEditButtons={handleEditButtons}
                             idEditButton={idEditButton}/>
        </>
    )
}