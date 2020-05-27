import React from 'react';
import { Row, Col, ListGroup} from 'react-bootstrap';
// icons
import editIcon from '../../resources/edit-tools.png';
import deleteIcon from '../../resources/delete.png';

export default function ScheduleItem({schedule, deleteSchedule, modifySchedule}) {


    return (
        <ListGroup key={schedule.id}>
            <Row>
                <Col xs={4}>Desde {schedule.startTime} hasta 
                                  {schedule.endTime} </Col>
                <Col xs={3}>Día: {schedule.day}</Col>
                <Col xs={3}>Aula: {schedule.aula}</Col>
                <Col xs={1} onClick={ ()=> modifySchedule(schedule)} ><img alt="edit" src={editIcon}/></Col>
                <Col xs={1} onClick={ () => deleteSchedule(schedule.id)}><img alt="delete" src={deleteIcon}/></Col>
            </Row>
        </ListGroup>
    );
    
}