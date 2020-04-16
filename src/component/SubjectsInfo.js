

import React from 'react';
import { ListGroup } from 'react-bootstrap';
import MapIcon from '../resources/mapIcon.png'; /// agregar icono

const SubjectsInfo = props => (
    <div>
        <ListGroup horizontal>
            <ListGroup.Item>Materia:</ListGroup.Item>
            <ListGroup.Item>Comisión:</ListGroup.Item>
            <ListGroup.Item>Horario: </ListGroup.Item>
            <ListGroup.Item><img  src={MapIcon}/></ListGroup.Item>
        </ListGroup>
    </div>
)

export default SubjectsInfo;