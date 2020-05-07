import React from 'react';
import { Card, Col } from 'react-bootstrap';
import SubjectsAccordion from './SubjectsAccordion';
import NotFound from '../NotFound';

function SubjectsInfo({subjects, notFound, title}) {

    const subjectsResult = (subjects) => {
        return (<>{
                    subjects.map( 
                        subject => {
                            return <SubjectsAccordion key={subject.id.toString()} 
                                                      subject={subject}/>
                        }
                    )
                }</>);
    };

    if(notFound){
        return (
            <Col xs={{span: 5,offset: 3}}>
                <NotFound className="text-center"
                          label={"No se ha Encontrado Ninguna Materia."}/>
            </Col>
        );
    } else {
        return (
            <>
                <Card>
                    <Card.Header as="h5" 
                                 className="text-center">
                        {title}
                    </Card.Header>
                </Card>
                {subjectsResult(subjects)}
            </>
        );
    }
}

export default SubjectsInfo;