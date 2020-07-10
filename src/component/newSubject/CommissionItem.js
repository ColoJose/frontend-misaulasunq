import React from 'react';
import { Button, ListGroup, Row, Col } from 'react-bootstrap';
//react icons
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';
// CSS
import "../Branding.css";

export default function CommissionItem({commission, deleteCommission}) {

    // TODO: Estaria bueno un info button que despliegue un modal o tooltip con la info
    return (
        <ListGroup.Item className="p-1">
            <Row className="px-3 d-flex align-items-center">
                <Col xs={8}>
                    <b>Nombre:</b> {commission.name}
                </Col>
                
                <Col xs={2} className="p-1">
                    <Button variant="light"
                            className="p-1"
                            hidden>
                        <MdModeEdit className="branding-red-icon" size='1.75em'/>
                    </Button>
                </Col>
                <Col xs={2}>
                    <Button variant="light"
                            className="p-1"
                            onClick={ () => deleteCommission(commission.id)}>
                        <MdDeleteForever className="branding-red-icon" size='1.75em'/>
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );

}