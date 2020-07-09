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

export default function CommissionForm({ classroomOptions, addCommission }) {

    // modal new schedule state
    const [showModalSchedule,setShowModalSchedule] = useState(false);
    const [scheduleIdTentative, setscheduleIdTentative] = useState(0);

    // schedule state
    const [schedules, setSchedules] = useState([]);

    // commission state
    const [name,setName] = useState('');
    const [year,setYear] = useState('2020');
    const [semester, setSemester] = useState('Primer cuatrimestre');

    const commission = {name,semester,year,schedules};
    
    // aux functions
    const allIds = () => { 
        return schedules.map( (schedule) => schedule.id)
    };

    // modal New schedule methods
    function openCloseModal(){
        setscheduleIdTentative(Math.floor(Math.random() * 1000)); // genero un id random para cada schedule
        setShowModalSchedule(true); 
    }
    const closeModalSchedule = () =>{ setShowModalSchedule(false); };

    // schedule methods
    const addSchedule = (newSchedule) => {
        setSchedules([...schedules,newSchedule]);
    };

    const deleteSchedule = (id) => {
        let indexSchDelete = allIds().indexOf(id);
        var schedulesAfterDelete = schedules;
        schedulesAfterDelete.splice(indexSchDelete,1);
        
        if(schedulesAfterDelete.length === 0){
            setSchedules([]);
        } else {
            var newArray = Object.assign([],schedulesAfterDelete)
            setSchedules(newArray);
        }
    }

    // comission methods
    const cleanUpCommission = () => { 
        setName(" ");
        setYear("2020");
        setSemester("Primer cuatrimestre");
        setSchedules([]);
    }

    //Parece estar bien
    const replaceEditedSchedule = (schedule) => { 
        let index = schedules.findIndex(sch => sch.id === schedule.id);
        schedules[index] = schedule;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addCommission(commission,cleanUpCommission);
        // return;
    }

    const renderScheduleList = () =>{
        if(schedules.length === 0){
            return ( 
                <ListGroup.Item>
                    <p>No ha agregado schedules aún</p>
                </ListGroup.Item>
            );
        } else {
            return (
                schedules.map( function(sch){
                    return <ScheduleItem key={sch.id}
                                         classroomOptions={classroomOptions}
                                         scheduleItem={sch} 
                                         deleteSchedule={deleteSchedule}
                                         replaceEditedSchedule={replaceEditedSchedule}/>;
                })
            );
        }
    }

    return (
        <>
            <form id="commission-form" data-toggle="validator" role="form" onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12}><h2>Comisiones</h2></Col>    
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
                <Card.Header>
                    <Row>
                        <Col xs={8}>
                            Schedules agregados
                        </Col>
                        <Col xs={4}>
                            <div className="add-schedule-button">
                                <Button className="btn btn-danger color-button" onClick={ () => openCloseModal()}>Agregar schedule</Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
                
                <ListGroup id="schedule-items">
                    {renderScheduleList()}
                </ListGroup>
            </Card>
            <ScheduleForm classroomOptions={classroomOptions}
                          show={showModalSchedule} 
                          onHide={closeModalSchedule}
                          addSchedule={addSchedule} 
                          scheduleIdTentative={scheduleIdTentative}/>
            <Row>
                <Col xs={12}>
                    <Button type="submit"
                            form="commission-form" 
                            className="btn btn-danger color-button">
                    Agregar Comisión
                    </Button>
                </Col>    
            </Row>
        </>
    );
}