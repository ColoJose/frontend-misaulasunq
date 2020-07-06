import React,  { useEffect, useState }from 'react';
import { Form, Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';
import SubjectAPI from '../../Api/SubjectAPI';
import ScheduleEditAccordion from './ScheduleEditAccordion';
import history from '../../utils/history';
import {toast} from 'react-toastify';
import { editConfig } from '../../utils/toast-config';
import ScheduleFormEdit from './ScheduleFormEdit';
// css
import '../ButtonBranding.css';

const EditCommissions = (props) => {

   const { idSubject, subjectName } = props.match.params;
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
   const changedCommissions = new Set();

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
   const setYearAux = (year) => { selectedCommission.year = year; setYear(year); }
   const setSemesterAux = (semester) => { selectedCommission.semester = semester; setSemester(semester); }

   const updateSchedules = (schedules) => { 
      selectedCommission.schedules = schedules;
   }

   const updateCommission = () => {
      subjectApi.updateCommission(commissions, idSubject).then( (resp) => {
         toast.success(`Se actualizaron correctamente: ${changedCommissions}`, editConfig);
      }).catch((e) => console.log(e));
   }

   // new schedule 
   const [showModalSchedule,setShowModalSchedule] = useState(false);
   const closeModalSchedule = () =>{ setShowModalSchedule(false); }

   const goBack = () => {
      history.push('/admin');
   }

   const handleAddCommission = (schedule) => {
      selectedCommission.schedules.push(schedule)
   }

   const handleAddNewSchedule = () => {
      setShowModalSchedule(true);
   }

   const addSchedule = (schedule) => {
      selectedCommission.schedules.push(schedule);
   }

   const addChangedCommission = () => {
      changedCommissions.add(`${selectedCommission.name}, `)
      console.log(changedCommissions);
   }

   return (
         <Container>
            <Row>
               <Col xs={4}>
                  <h3 >Editar Comisiones de materia {subjectName}</h3>
               </Col>
               <Col xs={5}></Col>
               <Col xs={3}>
                  <Button onClick={ () => goBack() } 
                          className="color-button"
                          style={{marginLeft:"80px", marginBottom:"5px"}}>Volver al panel admin</Button>
               </Col>
            </Row>
            <Row>
               <Col xs={12}>
                  
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
                        <Form onChange={ () => addChangedCommission()}>
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
                                                           min="2020"
                                                           max="2021" 
                                                           value={selectedCommission.year}
                                                           onChange={ (e) => setYearAux(e.target.value)}
                                                           required />
                                          </Form.Group>
                                          <Form.Group>
                                             <Form.Label>Semestre</Form.Label>
                                             <Form.Control as="select"
                                                           value={selectedCommission.semester}
                                                           onChange={ (e) => setSemesterAux(e.target.value) } >
                                                <option>Primer</option>
                                                <option>Segundo</option>
                                                <option>Anual</option>
                                             </Form.Control>
                                          </Form.Group>    
                                       </div>
                                    }
                                    <Row>
                                       <Col xs={4}>
                                          <Button className="color-button" onClick={ () => updateCommission() }>Guardar cambios</Button>
                                       </Col>
                                       <Col xs={5}
                                            >
                                          <Button className="color-button"
                                                  style={{marginLeft:"-28px"}}
                                                  onClick={ () => handleAddCommission()}>Agregar otra comisión</Button>
                                       </Col>
                                       <Col xs={3}></Col>
                                    </Row>                                                                     
                              </Col>
                              <Col xs={6}>
                                 <ScheduleEditAccordion schedules={selectedCommission.schedules}
                                                        updateSchedules={updateSchedules}/>
                                 <Button className="color-button"
                                         style={{textAlign:"right", marginTop:"10px"}}
                                         onClick={ () => handleAddNewSchedule()}>Agregar otro horario a la {selectedCommission.name}</Button>                                                        
                              </Col>
                           </Row>
                        </Form>
                     </Card.Body>
                  </Card> 
               </Col>
            </Row>
            <ScheduleFormEdit show={showModalSchedule}
                              onHide={closeModalSchedule}
                              addSchedule={addSchedule}
            />

         </Container>
)
}

export default EditCommissions;