import React,  {useState} from 'react';
import { Row, Col, ListGroup} from 'react-bootstrap';
import ScheduleFormEdit from './ScheduleFormEdit';
// icons
import editIcon from '../../resources/edit-tools.png';
import deleteIcon from '../../resources/delete.png';

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
            <Row>
                <Col xs={3}>Desde {scheduleItem.startTime} hasta 
                                  {scheduleItem.endTime} </Col>
                <Col xs={3}>Día: {scheduleItem.day}</Col>
                <Col xs={3}>Aula: {scheduleItem.classroom.number}</Col>
                <Col xs={1} onClick={ () => editSchedule()}><img alt="edit" src={editIcon}/></Col>
                <Col xs={1} onClick={ () => deleteScheduleAux()}><img alt="delete" src={deleteIcon}/></Col>

                {renderModalSchEdit ?
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