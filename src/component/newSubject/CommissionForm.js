import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, ListGroup, Card, Row, Col} from 'react-bootstrap';
import './CommissionForm.css';
import ScheduleForm from './ScheduleForm';
import ScheduleItem from './ScheduleItem';
// css
import '../ButtonBranding.css';
import { List } from 'semantic-ui-react';

// note: sch as schedule

export default function CommissionForm({addCommission}) {
    // aux functions
    const allIds = () => { return schedules.map( (schedule) => schedule.id)};

    // modal new schedule logic
    const [showModalSchedule,setShowModalSchedule] = useState(false);
    const closeModalSchedule = () =>{ setShowModalSchedule(false); }
    const [scheduleIdTentative, setscheduleIdTentative] = useState(0);
    function openCloseModal(){
        setscheduleIdTentative(Math.floor(Math.random() * 1000)); // genero un id random para cada schedule
        setShowModalSchedule(true); 
    }

    // schedule logic
    const [schedules, setSchedules] = useState([]);
    const [schedulesShowList, setSchedulesShowList] = useState([]);
    const addSchedule = (newSchedule) => {
        setSchedules([...schedules,newSchedule]);
        setSchedulesShowList([...schedulesShowList,newSchedule]);
        // displayNoSchedulesAdded();
    };

    // VER
    const deleteSchedule = (id,componentId) => {
        let indexSchDelete = allIds().indexOf(id);
        schedules.splice(indexSchDelete,1);
        document.getElementById(componentId).style.display = "none";
        // displayNoSchedulesAdded();
    }

    const displayNoSchedulesAdded = () => {
        // if(schedules.length === 0) {
        //     document.getElementById("no-added-schedule-message").style.display = "block"
        // }else {
        //     document.getElementById("no-added-schedule-message").style.display = "none"
        // }
    }

    // commission logic
    const [name,setName] = useState('');
    const [year,setYear] = useState('2020');
    const [semester, setSemester] = useState('Primer cuatrimestre');
    
    const commission = {
        name,
        semester,
        year,
        schedules
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addCommission(commission,cleanUpCommission);
        return;
    }

    const cleanUpCommission = () => { 
        setName(" ");
        setYear("2020");
        setSemester("Primer cuatrimestre");
        setSchedules([]);
        hiddenlAllSchedulesList();
    }

    const hiddenlAllSchedulesList = () => {
        schedulesShowList.map( sch => {
            document.getElementById(`schedule-item-${sch.id}`).style.display = "none";
        });
    }

    const replaceEditedSchedule = (schedule) => { 
        let index = schedules.findIndex(sch => sch.id === schedule.id);
        schedules[index] = schedule;
    }

    return (
        <>
            <form data-toggle="validator" role="form" onSubmit={handleSubmit}>
                <Row>
                    <Col xs={8}><h2>Comisiones</h2></Col>    
                    <Col xs={4}><Button className="btn btn-danger color-button"  type="submit">Agregar commisión</Button></Col>    
                </Row>
                
                <Form.Group>
                    <Form.Label>Nombre comisión</Form.Label>
                    <Form.Control 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Año</Form.Label>
                    <Form.Control 
                        type="number"
                        min="2020"
                        max="2021"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Semestre</Form.Label>
                    <Form.Control 
                        as="select"
                        value={semester}
                        onChange={ (e) => setSemester(e.target.value)} >
                        <option>Primer</option>
                        <option>Segundo</option>
                        <option>Anual</option>
                    </Form.Control>
                </Form.Group>
            </form>

            {/* schedule section */}

            <h3>Schedules</h3>

            <Card id="addedSchedulesSection">
                <Row>
                    <Col xs={8}>
                        <Card.Header>Schedules agregados</Card.Header>
                    </Col>
                    <Col xs={4}>
                        <div className="add-schedule-button">
                            <Button className="btn btn-danger color-button" onClick={ () => openCloseModal()}>Agregar schedule</Button>
                        </div>
                    </Col>
                </Row>
                
                <ListGroup id="schedule-items">
                    { schedulesShowList.length === 0 ?
                        <ListGroup.Item>
                            <p>
                                No ha agregado schedules aún
                            </p>
                        </ListGroup.Item>
                        :
                        schedulesShowList.map( function(sch){
                            return <ScheduleItem scheduleItem={sch} 
                                                 deleteSchedule={deleteSchedule}
                                                 replaceEditedSchedule={replaceEditedSchedule} />;
                        })
                    }
                    { <ListGroup.Item id="no-added-schedule-message" style={{display:"none"}}>
                        <p>No ha agregado schedules aún</p>
                    </ListGroup.Item> }
                </ListGroup>
            </Card>
            <ScheduleForm show={showModalSchedule} 
                          onHide={closeModalSchedule}
                          addSchedule={addSchedule} 
                          scheduleIdTentative={scheduleIdTentative}/>
        </>
    );
}