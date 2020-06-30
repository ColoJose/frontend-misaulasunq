import React from 'react';
// Bootstrap
import { FormGroup, Form, Col } from "react-bootstrap";
// Own Components
import SubmitSearchButton from "./SubmitSearchButton";
import "./SelectOptions.css";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const InputSearchForm = ({label, submitHandler, placeHolder, onInputChangeHandler, suggestions, dataListId, searchType}) => {
    
    const handleChange = (event) => {
        let value = '';
        if(Array.isArray(event) && event.length){
            value = event[0];
        }
        onInputChangeHandler(value);
    }
    
    const renderLabel = () => {
        if(label){
            return <Form.Label as="h6">{label}</Form.Label>;
        }
    }

    return (
        <Form onSubmit={(e) => submitHandler(e, searchType)}>
            {renderLabel()}
            <FormGroup className="my-1">
                <Form.Row>
                    <Col xs={10}>
                        <Typeahead id="basic-typeahead-single"
                                   className="height-Custom"
                                   onInputChange={(e) => onInputChangeHandler(e)}
                                   onChange={(e) => handleChange(e)}
                                   options={suggestions}
                                   placeholder={placeHolder}
                                   inputProps= {{required: true}}
                                   maxResults={8}/>
                    </Col>
                    <Col xs={2}>
                        <SubmitSearchButton/>
                    </Col>
                </Form.Row>
            </FormGroup>
        </Form>
    );
}

export default InputSearchForm;