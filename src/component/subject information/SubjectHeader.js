import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
// CSS
import './SubjectHeader.css';

function SubjectsHeader({subject}) {
    return (
        <>
            <Card.Header className="p-0">
                <Accordion.Toggle as={Button} 
                                  variant="light" 
                                  block
                                  className="subject-Header-Button p-1">
                    {subject.name}
                </Accordion.Toggle>    
            </Card.Header>
        </>
    );
}

export default SubjectsHeader;