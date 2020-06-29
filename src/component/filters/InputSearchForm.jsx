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
    
    return (
        <Form onSubmit={(e) => submitHandler(e, searchType)}>
            <Form.Label as="h6">{label}</Form.Label>
            <FormGroup>
                <Form.Row>
                    <Col xs={10}>
                        <Typeahead id="basic-typeahead-single"
                                   className="height-Custom"
                                   onInputChange={(e) => onInputChangeHandler(e)}
                                   onChange={(e) => handleChange(e)}
                                   options={suggestions}
                                   placeholder={placeHolder}
                                   required ={true}/>
                        {/* <Form.Control list={dataListId}
                                      className="height-Custom"
                                      type="text"
                                      required
                                      placeholder={placeHolder}
                                      onChange={(e) => onInputChangeHandler(e.target.value)}/> 
                            <datalist id={dataListId}>
                                {suggestions}
                            </datalist>*/}
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