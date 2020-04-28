

import React, { useEffect, useState } from 'react';
import { ListGroup, Accordion, Card, Button } from 'react-bootstrap';
import CommissionInfo from './CommissionInfo';
import Axios from 'axios';

function SubjectsInfo({subjects}) {

    return (

        <div>
            {subjects !== undefined ? 
                        ( subjects.map( subject => {
                            return(
                            <Accordion key={subject.id.toString()}>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link">
                                            {subject.name}
                                        </Accordion.Toggle>    
                                    </Card.Header>
                                    <CommissionInfo commissions={subject.commissions}/>
                                </Card>
                            </Accordion>) }))
                            // <ListGroup key={subject.subjectCode}>
                            //         <ListGroup.Item>Materia: {subject.name}</ListGroup.Item>
                            //         <CommissionInfo commissions={subject.commissions} />
                            //       <ListGroup.Item>Aula: {subject.}</ListGroup.Item>
                            //     <ListGroup.Item>Comisión</ListGroup.Item>
                            //     <ListGroup.Item>Horario </ListGroup.Item>
                            //     <ListGroup.Item><img  src={MapIcon}/></ListGroup.Item> 
                            // </ListGroup>) }))
                        
                    : <p>Loading</p>}
        </div>
    )
}


export default SubjectsInfo;