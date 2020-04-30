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

    return (
        <>
            {commissions.map( commission => {
                return (
                    <>
                        <Accordion.Collapse className="container" 
                                            key={commission.id.toString()}
                                            style={{paddingLeft: "0px", paddingRight: "0px"}}>
                                            
                            <ListGroup variant="flush" 
                                       style={{width: "100%"}}>
                                
                                <ListGroup.Item style={{paddingTop: "3px", paddingBottom: "3px"}}>
                                    <h4>{commission.name}</h4>
                                </ListGroup.Item>

                                <ListGroup.Item style={{paddingTop: "3px", paddingBottom: "3px"}}>
                                    <h5 style={{paddingLeft: "6px", paddingBottom: "3px"}}>Horarios</h5>
                                    {commission.schedules.map( schedule =>{
                                        return( 
                                            <Row key={schedule.id.toString()} 
                                               style={{paddingLeft: "12px", marginBottom: "6px"}}>
                                                <Col xs={10}>
                                                    {schedule.day} de {schedule.startTime} a {schedule.endTime} en aula {schedule.classroom.number}
                                                </Col>
                                                <Col xs={2}>
                                                    <MapModal classRoomNumber={schedule.classroom.number}/>
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                </ListGroup.Item>

                            </ListGroup>

                        </Accordion.Collapse>
                    </>
                )                
            })}
        </>
    );
}

export default CommissionInfo;