import React from 'react';
import {ListGroup, Row, Col} from 'react-bootstrap';
import infoIcon from '../../resources/signaling.png';
import editIcon from '../../resources/edit-tools.png';
import deleteIcon from '../../resources/delete.png';


export default function CommissionItem({commission, deleteCommission}) {

    return (
        <ListGroup.Item>
            <Row>
                <Col xs={8}>Nombre: {commission.name}</Col>
                <Col xs={2}><img alt="edit" src={editIcon}/></Col>
                <Col onClick={ () => deleteCommission(commission.id)} xs={2}><img alt="delete"src={deleteIcon}/></Col>
            </Row>
        </ListGroup.Item>
    );

}