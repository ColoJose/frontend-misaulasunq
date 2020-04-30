import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

function SubjectsHeader({subject}) {
    return (
        <>
            <Card.Header as="h5" 
                         style={{padding: "0px"}}>
                <Accordion.Toggle as={Button} 
                                  variant="light" 
                                  block>
                    {subject.name}
                </Accordion.Toggle>    
            </Card.Header>
        </>
    )
}

export default SubjectsHeader;