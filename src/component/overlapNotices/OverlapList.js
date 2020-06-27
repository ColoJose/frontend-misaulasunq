
import React, { useReducer, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import OverlapItem from './OverlapItem';
import SubjectAPI from '../../Api/SubjectAPI';
import Pagination from '../Pagination';

function OverlapList(){

    const PAGE_SIZE = Object.freeze(5);
    const subjectApi= new SubjectAPI();

    const [state, setState] = 
        useReducer(
            (state, newState) => 
                ({...state, ...newState}),
                {
                    overlappingSubjects: [],
                    pageNumber: 0, 
                    totalPages: 0,
                    firstPage: "true", 
                    lastPage: "false"
                }
        );

    useEffect( () => {
        getOverlappingSubject(state.pageNumber)
    }, [])

    const getOverlappingSubject = (pageNumber) => {
        subjectApi.getOverlappingSubjects(pageNumber,PAGE_SIZE)
                    .then( (resp) => {
                            setState(
                                {
                                    overlappingSubjects: resp.data.content,
                                    pageNumber: resp.data.pageable.pageNumber, 
                                    totalPages: resp.data.totalPages,
                                    firstPage: resp.data.first,
                                    lastPage: resp.data.last
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
                <Card.Footer>
                        <ListGroup>
                            <Pagination pageNumber={state.pageNumber}
                                        totalPages={state.totalPages}
                                        firstPage={state.firstPage}
                                        lastPage={state.lastPage}
                                        nextPageFunction={getOverlappingSubject} />
                        </ListGroup>
                    </Card.Footer> 
            </Card>
        </>
    )
}

export default OverlapList;