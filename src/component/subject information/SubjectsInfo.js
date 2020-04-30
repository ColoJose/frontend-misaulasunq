import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import CommissionInfo from '../commission/CommissionInfo';
import SubjectsHeader from './SubjectHeader';

function SubjectsInfo({subjects}) {
    //TODO: Tiene que ser una pantalla de de carga y/o sin resultados pero en el componente padre
    if(subjects !== undefined){
        return (
            <>
                {
                    subjects.map( 
                        subject => {
                            return(
                                <Accordion defaultActiveKey 
                                           key={subject.id.toString()}>
                                    <Card>
                                        <SubjectsHeader subject={subject}/>
                                        <CommissionInfo commissions={subject.commissions}/>
                                    </Card>
                                </Accordion>
                            )
                        }
                    )
                }
            </>
        );
    } else {
        return (<p>Loading</p>);
    }
    
}

export default SubjectsInfo;