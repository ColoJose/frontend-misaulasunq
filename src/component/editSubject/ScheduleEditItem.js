

import React, {useState} from 'react';
import { Accordion, Card, Form, Button } from 'react-bootstrap';

const days = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const optionDays = days.map( (day) => <option>{day}</option>)
const hours = Object.freeze([
    "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
    "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"
]);

let optionsHours = 
            hours.map( (hs) => <option key={hs.toString()}>{hs}</option>);

 const ScheduleEditItem = ({schedule}) => {
     

    const [startTime, setStartTime] = useState(schedule.startTime);

    const setStartTimeAux = (startTime) => { schedule.startTime = startTime;  }
    const setEndTime = (endTime) => { schedule.endTime = endTime}
    const setDay = (day) => { schedule.day = day }
    const setClassroom = (classroom) => { schedule.classroom.number = classroom }

    const sendData = () => { }

    return (
        <Card>
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link">
                Horarios
            </Accordion.Toggle>
        </Card.Header>
        <Card.Body>
            <Accordion.Collapse>
                <Form data-toggle="validator" role="form" onChange={ () => sendData() }>
                <Form.Group >
                    <Form.Label>Hora comienzo</Form.Label>
                    <Form.Control
                        as="select"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value) }>
                            <option>{startTime}</option>
                            {optionsHours}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hora fin</Form.Label>
                    <Form.Control
                        as="select"
                        value={schedule.endTime}
                        onChange={(e) => setEndTime(e.target.value) }>
                            <option>{schedule.endTime}</option>
                            {optionsHours}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Dia</Form.Label>
                    <Form.Control 
                        as="select"
                        value={schedule.day}
                        onChange={ (e) => setDay(e.target.value) }>
                            <option selected>{schedule.day}</option>
                            {optionDays}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Aula</Form.Label>
                    <input className="form-control"
                        value={schedule.classroom.number}
                        onChange={ (e) => setClassroom(e.target.value) }
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
