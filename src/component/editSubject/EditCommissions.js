import React,  { useEffect, useState }from 'react';
import { Form, Container, Row, Col, Card, Nav, Accordion } from 'react-bootstrap';
import SubjectAPI from '../../Api/SubjectAPI';
import ScheduleEditAccordion from './ScheduleEditAccordion';

const EditCommissions = (props) => {

   const subjectApi = new SubjectAPI();
   const [commissions, setCommissions] = useState([]);

   const [name, setName] = useState();
   const [year, setYear] = useState();
   const [semester, setSemester] = useState();

   const handleSubmit = () => { 
   }

   // to avoid undefined selectedCommission when rendering
   const emptyCommission = {
      name: '',
      schedules: [],
      semester: '',
      year: 0
   }
   const [selectedCommission, setSelectedCommission] = useState(emptyCommission);
   
   useEffect( () => {
      subjectApi.getCommissionsBySubjectId(props.match.params.idSubject).then( (resp) => {
         setCommissions(resp.data);
         setSelectedCommission(resp.data[0])
      }).catch( (e) => {
         console.log(e);
      })
   }, []);

   const updateSchedule = () => { }

   return (
         <Container>
            <Row>
               <Col xs={12}>
                  <h3>Editar Comisiones de "nombre materia TODO"</h3>
                  <Card>
                     <Card.Header>
                        <Nav variant="tabs">
                           { commissions.map( (commission) => {
                              return <Nav.Item key={commission.id}>
                                       <Nav.Link onClick={ () => setSelectedCommission(commission)}>
                                          {commission.name}
                                       </Nav.Link>
                                     </Nav.Item>
                           })}
                        </Nav>
                     </Card.Header>
                     <Card.Body>
                        <Form>
                           <Row>
                              <Col xs={6}>
                                    {commissions === undefined ? <p>Cargando...</p> :
                                          <div>
                                          <Form.Group>
                                             <Form.Label>Nombre comisión</Form.Label>
                                             <Form.Control type="text"
                                                         value={selectedCommission.name}
                                                         onChange={ (e) => setName(e.target.value)} 
                                                         required />   
                                          </Form.Group>
                                          <Form.Group>
                                             <Form.Label>Año</Form.Label>   
                                             <Form.Control type="number" 
                                                         value={selectedCommission.year}
                                                         onChange={ (e) => setYear(e.target.value)}
                                                         required />
                                          </Form.Group>
                                          <Form.Group>
                                             <Form.Label>Semestre</Form.Label>
                                             <Form.Control as="select"
                                                         value={selectedCommission.semester}
                                                         onChange={ (e) => setSemester(e.target.value)} >
                                                <option>Primer cuatrimestre</option>
                                                <option>Segundo cuatrimestre</option>
                                                <option>Anual</option>
                                             </Form.Control>
                                          </Form.Group>    
                                       </div>
                                       }
                              </Col>
                              <Col xs={6}>
                                 <ScheduleEditAccordion schedules={selectedCommission.schedules} />
                              </Col>
                           </Row>
                        </Form>
                     </Card.Body>
                  </Card> 
               </Col>
            </Row>
            
         </Container>
)
}

export default EditCommissions;