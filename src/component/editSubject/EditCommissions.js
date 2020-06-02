import React,  { useEffect, useState }from 'react';
import { Form, Container, Row, Col, Card, Nav } from 'react-bootstrap';
import SubjectAPI from '../../Api/SubjectAPI';

const EditCommissions = (props) => {

   const subjectApi = new SubjectAPI();
   const [commissions, setCommissions] = useState([]);
   
   const [selectedCommission, setSelectedCommission] = useState(commissions[0]);

   const [name, setName] = useState();
   const [year, setYear] = useState();
   const [semester, setSemester] = useState();


   const handleSubmit = () => { 
   }

   const commissionEdited = {}


   useEffect( () => {
      subjectApi.getCommissionsBySubjectId(props.match.params.idSubject).then( (resp) => {
         setCommissions(resp.data);
      }).catch( (e) => {
         console.log(e);
      })
   }, []);

    return (
         <Container>
            <Row>
               <Col xs={12}>
                  <h3>Comisiones</h3>
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
                  </Card> 
               </Col>
            </Row>
            <Form>
               <Row>
                  {/* <Form> */}
                     <Col xs={6}>
                           {commissions === undefined && 
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
                                    <Form.Control type="select"
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
                        <h1>wey yaa</h1>
                     </Col>
               </Row>
            </Form>
         </Container>
)
}

export default EditCommissions;