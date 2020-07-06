import React from 'react';
import {Accordion, Row, Col, ListGroup} from 'react-bootstrap';
// react-icons
import { BsDot, BsGeoAlt } from 'react-icons/bs';
// Own Components
import MapScreen from "../map/MapScreen";
import GenericModal from '../massiveLoad/GenericModal';
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
                     className="d-flex align-items-center pl-4 mb-1">
                    <Col className="pr-0"
                         xs={9} sm={9} md={9} lg={10} xl={10}>
                        <BsDot/> {schedule.day} de {schedule.startTime} a {schedule.endTime} en aula {schedule.classroom.number}
                    </Col>
                    <Col className="px-3" 
                         xs={3} sm={3} md={3} lg={2} xl={2}>
                        <GenericModal children={<MapScreen classRoomNumber={schedule.classroom.number}/>} 
                                      title={`Ubicación del Aula ${schedule.classroom.number} en la UNQ`}
                                      buttonLabel={<BsGeoAlt size='1em'/>}
                                      buttonStyle="outline-branding-button"
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
                                   className="">
                            <ListGroup.Item className="p-2" style={{backgroundColor: "#f8f9fa6e"}}>
                                <h5>{commission.name}</h5>
                            </ListGroup.Item>
                            <ListGroup.Item className="py-2 px-3">
                                <h6 className="pl-2 pb-1">Horarios</h6>
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