import React, {useState} from 'react';
import { Accordion, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { hours, days } from "../../Constants/Config";

const optionDays = days.map( (day) => <option key={day} value={day} label={day}>{day}</option>);
let optionsHours = hours.map( (hs) => <option key={hs} value={hs} label={hs}>{hs}</option>);

 const ScheduleEditItem = ({schedule, updateSchedule}) => {
     
    //El Slice es para evitar el excedente de segundos
    const [startTime, setStartTime] = useState(schedule.startTime.slice(0, 5));
    const [endTime, setEndTime] = useState(schedule.endTime.slice(0, 5));
    const [day, setDay] = useState(schedule.day);
    const [classroom, setClassroom] = useState(schedule.classroom.number);

    const setStartTimeAux = (startTime) => { 
        setStartTime(startTime);
        updateSchedule(schedule.id, "startTime", startTime);  
    }

    const setEndTimeAux = (endTime) => { 
        setEndTime(endTime);
        updateSchedule(schedule.id,"endTime",endTime);
    }

    const setDayAux = (day) => { 
        setDay(day);
        updateSchedule(schedule.id,"day",day);
    }

    const setClassroomAux = (classroom) => {
        setClassroom(classroom);
        updateSchedule(schedule.id,"classroom",classroom);
    }

    return (
        <Card>
            <Card.Header className="p-0">
                <Accordion.Toggle as={Button} 
                                  variant="light"
                                  block
                                  className="subject-Header-Button p-1">
                    Horario: {startTime} a {endTime}, día {schedule.day}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse>
                <Card.Body>
                    <Form data-toggle="validator">  
                        <Row>
                            <Col xs={6}>
                                <Form.Group >
                                    <Form.Label>Hora de comienzo</Form.Label>
                                    <Form.Control as="select"
                                                  value={startTime}
                                                  onChange={(e) => setStartTimeAux(e.target.value) }>
                                        {optionsHours}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Hora de fin</Form.Label>
                                    <Form.Control as="select"
                                                  value={endTime}
                                                  onChange={(e) => setEndTimeAux(e.target.value) }>
                                        {optionsHours}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Día</Form.Label>
                                    <Form.Control as="select"
                                                  value={day}
                                                  onChange={ (e) => setDayAux(e.target.value) }>
                                        {optionDays}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Aula</Form.Label>
                                    <input className="form-control"
                                           value={classroom}
                                           onChange={ (e) => setClassroomAux(e.target.value) }
                                           required/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Accordion.Collapse> 
        </Card>
    );
}

export default ScheduleEditItem;
