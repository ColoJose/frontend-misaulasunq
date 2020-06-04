import React, { useState }from 'react';
import { ListGroup, Accordion, Form, Card, Button } from 'react-bootstrap';

const days = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const optionDays = days.map( (day) => <option>{day}</option>)
const hours = Object.freeze([
    "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
    "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"
]);

let optionsHours = 
            hours.map( (hs) => <option key={hs.toString()}>{hs}</option>);

 const ScheduleEditItem = ({scheduleGiven}) => {
    
    const optionsHoursAux = optionsHours.unshift(scheduleGiven.startTime);

    const [startTime,setStartTime] = useState(scheduleGiven.startTime);
    const [endTime,setEndTime] = useState(scheduleGiven.endTime);
    const [day, setDay] = useState(scheduleGiven.day);
    const [classroom,setClassroom] = useState(scheduleGiven.classroom.number);

    const schedule = {
        startTime,
        endTime,
        classroom: {number:classroom,imageUrl:"foo"},
        day,
    };

    const sendData = () => { console.log(schedule) }

    const setStartTimeAux = (startTime) => { scheduleGiven.startTime = startTime; }
    const setEndTimeAux = (endTime) => { scheduleGiven.endTime = endTime; setEndTime(endTime); }
    const setDayAux = (day) => { scheduleGiven.day = day; setDay(day) }
    const setCllassroomAux = (classroom) => { scheduleGiven.classroom.number = classroom; setClassroom(classroom); }
    return (
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link">
                            Horarios
                        </Accordion.Toggle>
                    </Card.Header>
                    <Card.Body>
                        <Accordion.Collapse>
                            <Form onChange={ () => sendData() } data-toggle="validator" role="form">
                            <Form.Group>
                                <Form.Label>Hora comienzo</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}>
                                        {optionsHours}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Hora fin</Form.Label>
                                <Form.Control 
                                    as="select"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}>
                                        {optionsHours}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Dia</Form.Label>
                                <Form.Control 
                                    as="select"
                                    value={day}
                                    onChange={ (e) => setDay(e.target.value)}>
                                        {optionDays}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Aula</Form.Label>
                                <input className="form-control"
                                    value={scheduleGiven.classroom.number}
                                    onChange={ (e) => setClassroom(e.target.value)}
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