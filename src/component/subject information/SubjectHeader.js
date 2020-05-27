import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
// CSS
import './SubjectHeader.css';

function SubjectsHeader({subject}) {
    return (
        <>
            <Card.Header className="subject-Header-Card">
                <Accordion.Toggle as={Button} 
                                  variant="light" 
                                  block
                                  className="subject-Header-Button">
                    {subject.name}
                </Accordion.Toggle>    
            </Card.Header>
        </>
    );
}

export default SubjectsHeader;