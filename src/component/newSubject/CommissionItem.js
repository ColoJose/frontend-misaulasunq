import React from 'react';
import {ListGroup, Row, Col} from 'react-bootstrap';
import infoIcon from '../../resources/signaling.png';
import editIcon from '../../resources/edit-tools.png';
import deleteIcon from '../../resources/delete.png';


export default function CommissionItem({commission}) {

    return (
        <ListGroup.Item>
            <Row>
                <Col xs={9}>Nombre: {commission.name}</Col>
                <Col xs={1}><img alt="info" src={infoIcon}/></Col>
                <Col xs={1}><img alt="edit" src={editIcon}/></Col>
                <Col xs={1}><img alt="delete"src={deleteIcon}/></Col>
                
            </Row>
        </ListGroup.Item>
    );

}