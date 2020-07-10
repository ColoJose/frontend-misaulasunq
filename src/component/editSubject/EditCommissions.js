import React,  { useEffect, useState }from 'react';
import { Form, Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';
import SubjectAPI from '../../Api/SubjectAPI';
import ScheduleEditAccordion from './ScheduleEditAccordion';
import history from '../../utils/history';
import {toast} from 'react-toastify';
import { editConfig } from '../../utils/toast-config';
import ScheduleFormEdit from './ScheduleFormEdit';
import ReactDOM from 'react-dom';
// css
import "../Branding.css";
import "../ButtonBranding.css";
import "../HeaderBranding.css";

const EditCommissions = (props) => {
    const emptyOptionsList = [<option key={"Seleccionar"} value={"Seleccionar"} label={"Seleccionar"}>Seleccionar</option>];
    // to avoid undefined selectedCommission when rendering
    const emptyCommission = {
        id: 0,
        name: '',
        schedules: [],
        semester: '',
        year: 0
    }

    const { idSubject, subjectName } = props.match.params;
    const [commissions, setCommissions] = useState([]);
    const [selectedCommission, setSelectedCommission] = useState(emptyCommission);
    const [name, setName] = useState(selectedCommission.name);
    const [year, setYear] = useState(selectedCommission.year);
    const [semester, setSemester] = useState(selectedCommission.semester);
    const [classroomsOptions, setClassroomsOptions] = useState(emptyOptionsList);

    useEffect( () => {
        const subjectApi = new SubjectAPI();
        subjectApi.getCommissionsBySubjectId(idSubject)
            .then( 
                (resp) => {
                    setCommissions(resp.data);
                    setSelectedCommission(resp.data[0])
            }).catch( (e) => {
                console.log(e);
            });
        subjectApi.getAllClassrooms()
            .then( 
                (resp) => {
                    setClassroomsOptions(makeOptions(resp.data));
            }).catch( 
                (e) => console.log(e) 
            );
    }, []);

    const setNameAux = (name) => { selectedCommission.name = name; setName(name) }
    const setYearAux = (year) => { selectedCommission.year = year; setYear(year); }
    const setSemesterAux = (semester) => { selectedCommission.semester = semester; setSemester(semester); }

    const updateSchedules = (schedules) => { 
        selectedCommission.schedules = schedules;
    }

    const updateCommission = () => {
        const subjectApi = new SubjectAPI();
        subjectApi.updateCommission(commissions, idSubject).then( (resp) => {
            toast.success(`Se actualizaron correctamente las comisiones`, editConfig);
        }).catch((e) => console.log(e));
    }

    // new schedule 
    const [showModalSchedule,setShowModalSchedule] = useState(false);
    const closeModalSchedule = () =>{ setShowModalSchedule(false); }

    const goBack = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById("edit-commissions-container"));
        console.log("pass unmount")
        history.goBack();
    }

    //TODO: era parte del agregar nueva comision en editar comisiones
    const handleAddCommission = (schedule) => {
        selectedCommission.schedules.push(schedule)
    }

    const handleAddNewSchedule = () => {
        setShowModalSchedule(true);
    }

    const addSchedule = (schedule) => {
        selectedCommission.schedules.push(schedule);
    }

    const getMinYear = () => {
        return (new Date()).getFullYear().toString();
    }

    const getMaxYear = () => {
        return ((new Date()).getFullYear() + 1).toString();
    }

    const makeOptions = (options) =>{
        var optionsToReturn = emptyOptionsList;
        options.forEach(
            (option) => optionsToReturn.push(<option key={option} value={option} label={option}>{option}</option>)
        );
        return optionsToReturn;
    }

    return (
         <Container id="edit-commissions-container" className="py-1">
            <Row className="pl-3 my-2">
               <b className="h4">
                  Edición de Comisiones de la materia {subjectName}
               </b>
            </Row>
            <Row>
               <Col xs={12}>
                  <Card>
                     <Card.Header className="header-branding">
                        <Nav variant="tabs" activeKey={selectedCommission.id}>
                           { commissions.map( (commission) => {
                              return <Nav.Item key={commission.id}>
                                       <Nav.Link eventKey={commission.id}
                                                 className="branding-nav branding-nav-size"
                                                 onClick={ () => setSelectedCommission(commission)}>
                                          {commission.name}
                                       </Nav.Link>
                                     </Nav.Item>
                           })}
                        </Nav>
                     </Card.Header>
                     <Card.Body>
                        <Row>
                            <Col xs={6}>
                                <Form>
                                    <Col xs={12}>
                                        {commissions === undefined ? 
                                            <p>Cargando...</p> 
                                        :
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
                                                                min={getMinYear()}
                                                                max={getMaxYear()}
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
                                        <Row className="w-100 mx-auto">
                                            <Col xs={2} className="d-flex justify-content-start w-100 px-0 ">
                                                <Button className="color-button w-100"
                                                        onClick={ () => goBack()}>Cancelar</Button>
                                            </Col>
                                            <Col xs={1}/>
                                            <Col xs={2} className="d-flex justify-content-start w-100 px-0 ">
                                                <Button className="color-button w-100"
                                                        onClick={ () => updateCommission() }>
                                                    Guardar
                                                </Button>
                                            </Col>
                                        </Row>                                                                     
                                    </Col>
                                </Form>
                            </Col>
                            <Col xs={6}>
                                <Button className="color-button mb-2"
                                        onClick={ () => handleAddNewSchedule()}>
                                    Agregar otro horario a la {selectedCommission.name}
                                </Button>
                                <ScheduleEditAccordion schedules={selectedCommission.schedules}
                                                       updateSchedules={updateSchedules}/>
                            </Col>
                        </Row>
                     </Card.Body>
                  </Card> 
               </Col>
            </Row>
            <ScheduleFormEdit classroomsOptions={classroomsOptions}
                              show={showModalSchedule}
                              onHide={closeModalSchedule}
                              addSchedule={addSchedule}/>

         </Container>
)
}

export default EditCommissions;