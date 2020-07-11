import React, { useState } from 'react';
import {Button, Form, ListGroup, Card, Row, Col} from 'react-bootstrap';
import './CommissionForm.css';
import ScheduleForm from './ScheduleForm';
import ScheduleItem from './ScheduleItem';
// css
import '../ButtonBranding.css';

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
        document.getElementById("addedSchedulesSection").style.border = "";
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
    }

    const getMinYear = () => {
        return (new Date()).getFullYear().toString();
    }

    const getMaxYear = () => {
        return ((new Date()).getFullYear() + 1).toString();
    }

    const renderScheduleList = () =>{
        if(schedules.length === 0){
            return ( 
                <ListGroup.Item className="text-muted">
                    No ha agregado schedules aún
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
            <h3>Comisiones</h3>
            <form id="commission-form"
                  className="col-11"
                  data-toggle="validator" 
                  onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group className="col-12">
                        <Form.Label>Nombre comisión</Form.Label>
                        <Form.Control value={name}
                                      onChange={(e) => setName(e.target.value)} 
                                      required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="col-12">
                        <Form.Label>Año</Form.Label>
                        <Form.Control type="number"
                                      min={getMinYear()}
                                      max={getMaxYear()}
                                      value={year}
                                      onChange={(e) => setYear(e.target.value)}
                                      required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="col-12">
                        <Form.Label>Semestre</Form.Label>
                        <Form.Control as="select"
                                      value={semester}
                                      onChange={ (e) => setSemester(e.target.value)} >
                            <option>Primer</option>
                            <option>Segundo</option>
                            <option>Anual</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            </form>

            <h4 className="mt-1 mb-2">Schedules</h4>
            <div className="col-11">
                <Card id="addedSchedulesSection" >
                    <Card.Header className="py-2">
                        <Row className="d-flex align-items-center">
                            <Col xs={8} className="font-weight-bolder">
                                Schedules agregados
                            </Col>
                            <Col xs={4} className="pr-3 d-flex justify-content-end">
                                <Button className="btn btn-danger color-button" 
                                        onClick={ () => openCloseModal()} 
                                        size="sm">
                                    Agregar schedule
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    
                    <ListGroup id="schedule-items">
                        {renderScheduleList()}
                    </ListGroup>
                </Card>
            </div>
            <ScheduleForm classroomOptions={classroomOptions}
                          show={showModalSchedule} 
                          onHide={closeModalSchedule}
                          addSchedule={addSchedule} 
                          scheduleIdTentative={scheduleIdTentative}/>
            <Row className="mt-3">
                <Col xs={12} className="d-flex justify-content-center">
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