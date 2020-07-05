import React from 'react';
import {Accordion, Row, Col, ListGroup} from 'react-bootstrap';
// react-icons
import { BsDot, BsGeoAlt } from 'react-icons/bs';
// Own Components
import MapScreen from "../map/MapScreen";
import GenericModal from '../massiveLoad/GenericModal';
// CSS
import './CommissionInfo.css';
// Constants 
import { daysForSorting } from '../../Constants/Config';

function CommissionInfo({commissions}) {

    const sortSchedules = (schedules) => {
        return schedules.sort(scheduleComparatorByDayFunction);
    }

    const scheduleComparatorByDayFunction = (scheduleOne, scheduleTwo) => {
        return daysForSorting.indexOf(scheduleOne.day.toUpperCase()) - daysForSorting.indexOf(scheduleTwo.day.toUpperCase());
    }

    const commissionsList = (commission) => {
        return sortSchedules(commission.schedules).map( (schedule) => {
            return( 
                <Row key={schedule.id.toString()} 
                     className="subject-Row">
                    <Col xs={10}>
                        <BsDot/> {schedule.day} de {schedule.startTime} a {schedule.endTime} en aula {schedule.classroom.number}
                    </Col>
                    <Col xs={2}>
                        <GenericModal children={<MapScreen classRoomNumber={schedule.classroom.number}/>} 
                                      title={`Ubicación del Aula ${schedule.classroom.number} en la UNQ`}
                                      buttonLabel={<BsGeoAlt size='1em'/>}
                                      buttonStyle="outline-branding-button"
                                      //bodyStyle="text-center"
                                      size="xl"
                                      maxWidth
                                      />
                    </Col>
                </Row>
            );
        })
    };

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
                                <h6 className="hours-Title">Horarios</h6>
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