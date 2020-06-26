
import React, { useReducer, useEffect } from 'react';
import { Popover, Badge, Card, ListGroup, Col, Row } from 'react-bootstrap';
import OverlapItem from './OverlapItem';
import SubjectAPI from '../../Api/SubjectAPI';

function OverlapList(){

    const subjectApi= new SubjectAPI();

    const [state, setState] = 
                        useReducer(
                            (state, newState) => 
                                    ({...state, ...newState}),
                                    {
                                        overlappingSubjects: [],
                                        currentPage: 0, 
                                        pageSize: 5,
                                        nextSizeContent:0
                                    }
                            );

    useEffect( () => {
        getOverlappingSubject()
    }, [])

    const getOverlappingSubject = () => {
        subjectApi.getOverlappingSubjects(state.currentPage,state.pageSize)
                    .then( 
                        (resp) => {
                            setState(
                                {
                                    overlappingSubjects: resp.data.content,
                                    currentPage: resp.data.pageable.pageNumber, 
                                    nextSizeContent: resp.data.totalElements
                                });
                            })
                    .catch( (e) => {console.log(e);});
    }
    
    const getSubjectsList = () =>{
        return state.overlappingSubjects.map( (subject) => {
                    return <OverlapItem key={subject.id}
                                        subject={subject}/>
        });
    }

    return (
        <>
            <Card className="border">
                <Card.Header style={{backgroundColor: '#832d1c', fontWeight: '500', color:'#fff'}}>Materias Superpuestas</Card.Header>
                <Card.Body className="px-0 py-0">
                    <ListGroup variant="flush">
                        {getSubjectsList()}
                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )
}

export default OverlapList;