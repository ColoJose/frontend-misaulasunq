import React,  { useEffect, useState }from 'react';
import { Form, Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';
import SubjectAPI from '../../Api/SubjectAPI';
import ScheduleEditAccordion from './ScheduleEditAccordion';

const EditCommissions = (props) => {

   const { idSubject } = props.match.params;
   const subjectApi = new SubjectAPI();
   const [commissions, setCommissions] = useState([]);

   // to avoid undefined selectedCommission when rendering
   const emptyCommission = {
      name: '',
      schedules: [],
      semester: '',
      year: 0
   }
   const [selectedCommission, setSelectedCommission] = useState(emptyCommission);

   const [name, setName] = useState(selectedCommission.name);
   const [year, setYear] = useState(selectedCommission.year);
   const [semester, setSemester] = useState(selectedCommission.semester);
   
   useEffect( () => {
      subjectApi.getCommissionsBySubjectId(idSubject).then( (resp) => {
         setCommissions(resp.data);
         setSelectedCommission(resp.data[0])
      }).catch( (e) => {
         console.log(e);
      })
   }, []);

   const setNameAux = (name) => { selectedCommission.name = name; setName(name) }
   const setYearAux = (year) => { selectedCommission.year = year; setYear(year); console.log(selectedCommission.year) }
   const setSemesterAux = (semester) => { selectedCommission.semester = semester; setSemester(semester); console.log(selectedCommission.semester) }

   const updateSchedules = (schedules) => { 
      selectedCommission.schedules = schedules;
   }

   const updateCommission = () => {
      subjectApi.updateCommission(commissions, idSubject).then( (resp) => {
         alert(`La comisión ${selectedCommission.name} se actualizó correctamente`);
      }).catch((e) => console.log(e));
      // console.log(commissions);
      // console.log(idSubject);
   }

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
                                                           onChange={ (e) => setNameAux(e.target.value) } 
                                                           required />   
                                          </Form.Group>
                                          <Form.Group>
                                             <Form.Label>Año</Form.Label>   
                                             <Form.Control type="number" 
                                                           value={selectedCommission.year}
                                                           onChange={ (e) => setYearAux(e.target.value)}
                                                           required />
                                          </Form.Group>
                                          <Form.Group>
                                             <Form.Label>Semestre</Form.Label>
                                             <Form.Control as="select"
                                                           value={selectedCommission.semester}
                                                           onChange={ (e) => setSemesterAux(e.target.value) } >
                                                <option>Primer cuatrimestre</option>
                                                <option>Segundo cuatrimestre</option>
                                                <option>Anual</option>
                                             </Form.Control>
                                          </Form.Group>    
                                       </div>
                                    }
                                    <Button className="btn btn-danger" onClick={ () => updateCommission() }>Modificar comisión</Button>
                              </Col>
                              <Col xs={6}>
                                 <ScheduleEditAccordion schedules={selectedCommission.schedules}
                                                        updateSchedules={updateSchedules}/>
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