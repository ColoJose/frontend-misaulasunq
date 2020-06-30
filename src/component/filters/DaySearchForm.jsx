import React from 'react';
// Bootstrap
import { FormGroup, Form, Col } from "react-bootstrap";
// Own Components
import SubmitSearchButton from "./SubmitSearchButton";
import Select from 'react-select';

const DaySearchForm = ({label, submitHandler, onInputChangeHandler, selectOptions, searchType}) => {
    
    const options = (e) => {
        onInputChangeHandler(e.value);
    }

    const renderLabel = () => {
        if(label){
            return <Form.Label as="h6">{label}</Form.Label>;
        }
    }

    return(
        <Form onSubmit={(e) => submitHandler(e, searchType)}>
            {renderLabel()}
            <FormGroup className="my-1"> 
                <Form.Row>
                    <Col xs={10}>
                        <Select className="basic-single"
                                classNamePrefix="select"
                                maxMenuHeight={150}
                                defaultValue={selectOptions[0]}
                                name="Dia"
                                options={selectOptions}
                                onChange = { (e) => options(e)}/>
                    </Col>    
                    <Col xs={2}>
                        <SubmitSearchButton/>
                    </Col>
                </Form.Row>
            </FormGroup>
        </Form>
    );
}

export default DaySearchForm;