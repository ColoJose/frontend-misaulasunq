

import React, {useState} from 'react';
import { Accordion, Card, Form, Button, Row, Col } from 'react-bootstrap';

const days = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const optionDays = days.map( (day) => <option>{day}</option>)
const hours = Object.freeze([
    "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
    "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"
]);

let optionsHours = 
            hours.map( (hs) => <option key={hs.toString()}>{hs}</option>);

 const ScheduleEditItem = ({schedule, updateSchedule}) => {
     

    const [startTime, setStartTime] = useState(schedule.startTime);
    const [endTime, setEndTime] = useState(schedule.endTime);
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
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link">
                    Horarios: {schedule.startTime} a {schedule.endTime}, día {schedule.day}
            </Accordion.Toggle>
        </Card.Header>
        <Card.Body>
            <Accordion.Collapse>
                <Form data-toggle="validator" role="form">  
                <Form.Group >
                    <Form.Label>Hora comienzo</Form.Label>
                    <Form.Control
                        as="select"
                        value={startTime}
                        onChange={(e) => setStartTimeAux(e.target.value) }>
                            <option>{startTime}</option>
                            {optionsHours}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hora fin</Form.Label>
                    <Form.Control
                        as="select"
                        value={endTime}
                        onChange={(e) => setEndTimeAux(e.target.value) }>
                            <option>{endTime}</option>
                            {optionsHours}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Dia</Form.Label>
                    <Form.Control 
                        as="select"
                        value={day}
                        onChange={ (e) => setDayAux(e.target.value) }>
                            <option selected>{day}</option>
                            {optionDays}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Aula</Form.Label>
                    <input className="form-control"
                        value={classroom}
                        onChange={ (e) => setClassroomAux(e.target.value) }
                        required
                        />
                </Form.Group>
            </Form>
            </Accordion.Collapse> 
        </Card.Body>
        </Card>
)
}

export default ScheduleEditItem;
