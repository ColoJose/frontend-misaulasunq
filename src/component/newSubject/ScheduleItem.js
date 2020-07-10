import React, {useState} from 'react';
import { Button, Row, Col, ListGroup} from 'react-bootstrap';
import ScheduleFormEdit from './ScheduleFormEdit';
//react icons
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';
// CSS
import "../Branding.css";

export default function ScheduleItem(props) {

    const {classroomOptions,scheduleItem, deleteSchedule, replaceEditedSchedule} = props;

    // modal edit schedule logic
    const [showModalScheduleEdit,setShowModalScheduleEdit] = useState(false);
    const closeModalScheduleEdit = () =>{ setShowModalScheduleEdit(false) };
    const [renderModalSchEdit, setRenderModalSchEdit] = useState(false);

    const modifyItemSchedule = (schedule) => {
        scheduleItem.startTime = schedule.startTime;
        scheduleItem.endTime   = schedule.endTime;
        scheduleItem.day = schedule.day;
        scheduleItem.classroom.number = schedule.classroom.number;
        
        // Metodo del padre para reemplazar el schedule editado en la lista de schedule de la comision
        replaceEditedSchedule(schedule); 
        
        setShowModalScheduleEdit(false);
    }

    const deleteScheduleAux = () => { 
        // setRenderModalSchEdit(false); // VER de borrar si es necesario
        deleteSchedule(scheduleItem.id);
    }

    const editSchedule = () => {
        setRenderModalSchEdit(true); // VER de borrar si es necesario
        setShowModalScheduleEdit(true); // VER de borrar si es necesario
    }

    const componentId = `schedule-item-${scheduleItem.id}`
    
    return (
        <ListGroup key={scheduleItem.id}
                   id={componentId}>
            <Row className="px-3 d-flex align-items-center">
                <Col xs={4}>
                    <b>Desde:</b> {scheduleItem.startTime} 
                    <br/>
                    <b>Hasta:</b> {scheduleItem.endTime} 
                </Col>
                <Col xs={3}>
                    <b>Día:</b> {scheduleItem.day}
                </Col>
                
                <Col xs={3}>
                    <b>Aula:</b> {scheduleItem.classroom.number}
                </Col>
                
                <Col xs={1} className="p-1">
                    <Button variant="light"
                            className="p-1"
                            onClick={ () => editSchedule()}>
                        <MdModeEdit className="branding-red-icon" size='1.75em'/>
                    </Button>
                </Col>
                
                <Col xs={1} className="p-1">
                    <Button variant="light"
                            className="p-1"
                            onClick={ () => deleteScheduleAux()}>
                        <MdDeleteForever className="branding-red-icon" size='1.75em'/>
                    </Button>
                </Col>
                {
                    renderModalSchEdit ?
                        <ScheduleFormEdit classroomOptions={classroomOptions}
                                        scheduleToEdit={scheduleItem}
                                        showEdit={showModalScheduleEdit}
                                        onHideEdit={closeModalScheduleEdit}
                                        modifyItemSchedule={modifyItemSchedule}/>
                    :
                        null
                }
                
            </Row>
        </ListGroup>
    );
    
}