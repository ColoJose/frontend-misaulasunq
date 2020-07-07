import React,  {useState} from 'react';
import { Row, Col, ListGroup} from 'react-bootstrap';
import ScheduleFormEdit from './ScheduleFormEdit';
// icons
import editIcon from '../../resources/edit-tools.png';
import deleteIcon from '../../resources/delete.png';

export default function ScheduleItem(props) {

    const {scheduleItem, deleteSchedule, replaceEditedSchedule} = props;

    // modal edit schedule logic
    const [showModalScheduleEdit,setShowModalScheduleEdit] = useState(false);
    const closeModalScheduleEdit = () =>{ setShowModalScheduleEdit(false) };
    const [renderModalSchEdit, setRenderModalSchEdit] = useState(false);

    const modifyItemSchedule = (schedule) => {
        scheduleItem.startTime = schedule.startTime;
        scheduleItem.endTime   = schedule.endTime;
        scheduleItem.day = schedule.day;
        scheduleItem.classroom.number = scheduleItem.classroom.number;
        replaceEditedSchedule(schedule);
        setShowModalScheduleEdit(false);
    }

    const deleteScheduleAux = () => { 
        setRenderModalSchEdit(false); 
        deleteSchedule(scheduleItem.id)
        console.log("fst");
    }

    const editSchedule = () => {
        setRenderModalSchEdit(true);
        setShowModalScheduleEdit(true);
        console.log(renderModalSchEdit);
    }
    
    return (
        <ListGroup key={scheduleItem.id}>
            <Row>
                <Col xs={3}>Desde {scheduleItem.startTime} hasta 
                                  {scheduleItem.endTime} </Col>
                <Col xs={3}>Día: {scheduleItem.day}</Col>
                <Col xs={3}>Aula: {scheduleItem.classroom.number}</Col>
                <Col xs={1} onClick={ () => editSchedule()}><img alt="edit" src={editIcon}/></Col>
                <Col xs={1} onClick={ () => deleteScheduleAux()}><img alt="delete" src={deleteIcon}/></Col>

                {renderModalSchEdit ?
                    <ScheduleFormEdit scheduleToEdit={scheduleItem}
                                      showEdit={showModalScheduleEdit}
                                      onHideEdit={closeModalScheduleEdit}
                                      modifyItemSchedule={modifyItemSchedule}
                                      />
                    :
                    null
                }
                
            </Row>
        </ListGroup>
    );
    
}