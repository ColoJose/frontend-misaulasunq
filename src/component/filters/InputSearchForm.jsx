import React from 'react';
// Bootstrap
import { FormGroup, Form, Col } from "react-bootstrap";
import SubmitButton from "./SubmitButton";

const InputSearchForm = ({label, submitHandler, placeHolder, onInputChangeHandler, suggestions, dataListId, searchType}) => {
    return (
        <Form onSubmit={(e) => submitHandler(e, searchType)}>
            <Form.Label as="h6">{label}</Form.Label>
            <FormGroup>
                <Form.Row>
                    <Col xs={10}>
                        <Form.Control list={dataListId}
                                      type="text"
                                      required
                                      placeholder={placeHolder}
                                      onChange={(e) => onInputChangeHandler(e.target.value)}/>
                        <datalist id={dataListId}>
                            {suggestions}
                        </datalist>
                    </Col>
                    <Col xs={2}>
                        <SubmitButton/>
                    </Col>
                </Form.Row>
            </FormGroup>
        </Form>
    );
}

export default InputSearchForm;