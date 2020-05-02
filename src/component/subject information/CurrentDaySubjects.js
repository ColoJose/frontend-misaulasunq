import React from 'react';
import { Card } from 'react-bootstrap';
import SubjectAPI from "../../Api/SubjectAPI";
import SubjectsAccordion from './SubjectsAccordion';


class CurrentDaySubjects extends React.Component {

    constructor(props){
        super(props);
        this.state = { subjects: null}
    }

    componentDidMount() {
        const subjectApi = new SubjectAPI();
        subjectApi.getCurrentDaySubjects()
                .then( resp =>{
                    this.setState({subjects: resp.data});
                }).catch(e => {
                    console.log(e)
                })
        console.log(this.state.subjects);
    }

    render () {
            let component;
            if(this.state.subjects){
                component = <>
                    <Card>
                            <Card.Header>Materias del día</Card.Header>
                    </Card>
                    {this.state.subjects.map(subject => {
                        return <SubjectsAccordion subject={subject} />
                    })}
                </>
            } else {
                return <h3>loading...</h3>
            }

            return <div>{component}</div>

    }
}

export default CurrentDaySubjects;