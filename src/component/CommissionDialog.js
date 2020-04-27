import React from 'react';
import {Modal} from 'react-bootstrap';

function CommissionDialog(props) {

    const { show, handleClose, commission } = props;
    
    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{commission.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Horarios</h3>
                    {commission.schedules.map( schedule =>{
                        return( <p key={schedule.id.toString()}>  {schedule.day} de {schedule.startTime} a {schedule.endTime} en aula {schedule.classroom.number}</p>)
                    })}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CommissionDialog;