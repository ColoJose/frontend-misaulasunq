import React, {useState} from 'react';
import {Accordion, Row, Col, ListGroup} from 'react-bootstrap';
import MapModal from '../MapModal';
import './CommissionInfo.css';

function CommissionInfo({commissions}) {

    // show/hide commission dialog
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false)}
    const handleShow = () => { setShow(true) }

    let commissionDialogProps = {
        show: show,
        handleClose:handleClose,
    }

    const commissionsList = (commission) => {
        return commission.schedules.map( schedule =>{
            return( 
                <Row key={schedule.id.toString()} 
                     className="subject-Row">
                    <Col xs={10}>
                        {schedule.day} de {schedule.startTime} a {schedule.endTime} en aula {schedule.classroom.number}
                    </Col>
                    <Col xs={2}>
                        <MapModal classRoomNumber={schedule.classroom.number}/>
                    </Col>
                </Row>
            )
        })
    }

    return (
        <>
            {commissions.map( commission => {
                return (
                    <Accordion.Collapse key={commission.id.toString()}
                                        className="accordion-Collapse">
                        <ListGroup variant="flush" 
                                   className="list-Group">
                            <ListGroup.Item className="list-Item">
                                <h5>{commission.name}</h5>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-Item">
                                <h7 className="hours-Title">Horarios</h7>
                                {commissionsList(commission)}
                            </ListGroup.Item>
                        </ListGroup>
                    </Accordion.Collapse>
                )                
            })}
        </>
    );
}

export default CommissionInfo;