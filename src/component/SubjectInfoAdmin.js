
import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import edit from '../resources/edit-tools.png';
import info from '../resources/signaling.png'

export default function SubjectInfoAdmin({subject}) {

    return (
        <>
            <ListGroup.Item>
                <Row>
                    <Col sm="8">
                        <p>Nombre: {subject.name}</p>
                        <p>{subject.degrees[0].name}</p> {/* semi hardcoedado */ }
                    </Col>
                    <Col sm="2"><img src={edit} alt="edit icon"/></Col>
                    <Col sm="2"><img src={info} alt="info icon"/></Col>
                </Row>
            </ListGroup.Item>
        </>
    )

}