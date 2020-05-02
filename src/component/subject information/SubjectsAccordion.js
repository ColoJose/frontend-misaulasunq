import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import CommissionInfo from '../commission/CommissionInfo';
import SubjectsHeader from './SubjectHeader';

const SubjectsAccordion = ({subject}) => {

    return (
        <Accordion defaultActiveKey 
                   key={subject.id.toString()}>
            <Card>
                <SubjectsHeader subject={subject}/>
                <CommissionInfo commissions={subject.commissions}/>
            </Card>
        </Accordion>
    )
}

export default SubjectsAccordion;