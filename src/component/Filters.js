import "./Filters.css"
import React from 'react';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import next from "../resources/next.png"

const Filters = props => (
    <div>
        
            <Form>
                <h5>Filtrar por horario</h5>        
                <FormGroup>
                    <Form.Label>Desde</Form.Label> {/* TODO: validaciones que no den conjunto vacío */}
                    <Form.Control as="select" custom value="Elegir">
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                    </Form.Control>

                    <Form.Label>Hasta</Form.Label>
                    <Form.Control as="select" custom value="Elegir">
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                    </Form.Control>
                    <input type="image" src={next}/>
                </FormGroup>
            </Form>

            <Form>
                <h5>Filtrar por Nro de aula</h5>
                <FormGroup>
                    <Form.Control type="text" placeholder="Ingrese número de aula"/>
                </FormGroup>
                <input type="image" src={next}/>
            </Form>

            <Form>
                <h5>Filtrar por Nro de comisión</h5>
                <FormGroup>
                    <Form.Control type="text" placeholder="Ingrese número de comisión"/>
                </FormGroup>
                <input type="image" src={next}/>
            </Form>    
            
        
    </div>
);



export default Filters;