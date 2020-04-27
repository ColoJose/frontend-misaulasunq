import React, {useEffect} from 'react';
import {Accordion, Card, Button, ListGroup} from 'react-bootstrap';
import LocationIcon from '../resources/locationIcon.png'
import './CommissionInfo.css';

function CommissionInfo({commissions}) {

    return (
        <>
            {commissions.map( commission => {
                return (<Accordion.Collapse className="container" key={commission.id.toString()}>
                            <ListGroup horizontal>
                                <ListGroup.Item>{commission.name}</ListGroup.Item>    
                                <ListGroup.Item><img src={LocationIcon}/></ListGroup.Item>
                                
                                <Button variant="outline-danger">Más info</Button>
                            </ListGroup>
                        </Accordion.Collapse >)
                
            })}
        </>
    );
}

export default CommissionInfo;