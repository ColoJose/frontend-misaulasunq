import React from 'react';
// Bootstrap
import { FormGroup, Form, Col } from "react-bootstrap";
// Own Components
import SubmitSearchButton from "./SubmitSearchButton";
import Select from 'react-select';

const BetweenHoursSearchForm = ({label, submitHandler, startValue, setStartValue, endValue, setEndValue, optionsHours, searchType}) => {

    return (
        <Form onSubmit={(e) => submitHandler(e, searchType)}>
            <Form.Label as="h6">{label}</Form.Label>
            <FormGroup>
                <Form.Row>
                    <Col xs={4}>
                        <Select className="basic-single"
                                classNamePrefix="select"
                                maxMenuHeight={150}
                                defaultValue={optionsHours[0]}
                                name="Desde"
                                options={optionsHours}
                                onChange = { (e) => setStartValue(e.value)}/>
                    </Col>
                    <Col xs={2}/>
                    <Col xs={4}>
                        <Select className="basic-single"
                                classNamePrefix="select"
                                maxMenuHeight={150}
                                defaultValue={optionsHours[0]}
                                name="Hasta"
                                options={optionsHours}
                                onChange = { (e) => setEndValue(e.value)}/>
                    </Col>
                    <Col xs={2}>
                        <SubmitSearchButton/>
                    </Col>
                </Form.Row>
            </FormGroup>
        </Form>
    );
}

export default BetweenHoursSearchForm;