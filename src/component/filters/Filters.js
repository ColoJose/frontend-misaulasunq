import SubjectAPI from "../../Api/SubjectAPI";
// React
import React, {useReducer} from 'react';
// Bootstrap
import { Card, Form, FormGroup } from 'react-bootstrap';
// CSS
import "./Filters.css";
import "../HeaderBranding.css";
// Own Components
import SubmitSearchButton from "./SubmitSearchButton";
import DaySearchForm from "./DaySearchForm";
import InputSearchForm from "./InputSearchForm";
import BetweenHoursSearchForm from "./BetweenHoursSearchForm";
import { SearchType, hours, days } from "../../Constants/Config";
import { isBlankString } from "../../utils/formValidator";

const Filters = (props) => {

    const [state, setState] = useReducer(
        (state, newState) => 
            ({...state, ...newState}),
            {
                subject: "", 
                classroomNumber:"", 
                startHour: {value: "", label: "Seleccionar"},
                endHour: {value: "", label: "Seleccionar"},
                selectedDay: "",
                hoursError: false,
                dayError: false,
                inValidForm: false,
                searchTypes: []
            }
    );

    const fetchResolver = (promise, title) =>{
        promise.then( resp =>{
            props.handleSearchResult(resp.data, false, title);
        }).catch(e => {
            props.handleSearchResult([], true);
        })
    };

    const filterSubjects = (filters) =>{
        const subjectApi = new SubjectAPI();
        fetchResolver(
            subjectApi.getSubjectsByFilter(filters),
            "Materias Encontradas");
    }
    
    const validateHours = () => {
        return !isBlankString(state.startHour["value"])
            && !isBlankString(state.endHour["value"])
            && hours.indexOf(state.startHour["value"]) < hours.indexOf(state.endHour["value"]);
    }

    const validateDay = () => {
        return !isBlankString(state.selectedDay);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        if(!Array.isArray(state.searchTypes) || !state.searchTypes.length){
            setState({ inValidForm: true });
            return;
        }

        var hoursError = false;
        var dayError = false;

        if(filterSelected(SearchType.bySchedule) && !validateHours()){
            hoursError = true;
        } 

        if(filterSelected(SearchType.byDay) && !validateDay()){
            dayError = true;
        }

        setState({ hoursError: hoursError, dayError: dayError, inValidForm: false });
        
        if ( hoursError || dayError ){   
            return ;
        }
        
        props.searching();

        var filter = {
            "subjectName": state.subject, 
            "classroomNumber":state.classroomNumber, 
            "startTime": state.startHour["value"],
            "endTime": state.endHour["value"],
            "day": state.selectedDay,
            "searchFilters": state.searchTypes
        };
        
        filterSubjects(filter);
    }

    const handleStateChange = (value, searchType) => {
        var arrayFilters = updateSearchFitlerArray(value, searchType);
        switch (searchType) {
            case SearchType.bySubject:
                setState({subject: value, searchTypes: arrayFilters});
                break;
            case SearchType.byClassroom:
                setState({classroomNumber: value, searchTypes: arrayFilters});
                break;
            case SearchType.byDay:
                setState({selectedDay: value, searchTypes: arrayFilters});
                break;
        }
    }

    const updateSearchFitlerArray = (value, searchType) => {
        var arrayFilters = removeFromArray(state.searchTypes, searchType);
        if (value){            
            arrayFilters.push(searchType);
        }
        return arrayFilters;
    }

    const handleHourChange = (start, end, searchType) => {
        var arrayFilters = removeFromArray(state.searchTypes, searchType);
        if ( start["value"] || end["value"] ){
            arrayFilters.push(searchType);
        }
        
        setState(
            {
                startHour: start, 
                endHour: end,
                searchTypes: arrayFilters
            }
        );
    }

    const filterSelected = (filter) => {
        return state.searchTypes.indexOf(filter) > -1;
    }

    const removeFromArray = (array, element) => {
        var index = array.indexOf(element);
        if (index > -1){
            array.splice(index, 1);
        }
        return array;
    }

    const makeSelectOptions = (suggestionsList) => {
        var options = [{value: "", label: "Seleccionar"}];
        suggestionsList.forEach(
            (suggestion) => {   options.push({value: suggestion, label: suggestion});  }
        );
        return options;
    }

    const renderErrorLabel = () =>{
        if(state.inValidForm){
            return <i class="text-danger">Seleccione al menos un filtro de busqueda.</i>;
        }
    }

    return (
        <>
            <Card>
                <Card.Header className = "header-branding">Filtrar Materias:</Card.Header>
                <Card.Body className = "px-3 py-3">
                    <Form onSubmit={(e) => submitHandler(e)}>
                        {renderErrorLabel()}
                        <FormGroup className="mt-1 mb-2"> 
                            <div>
                                <i className="filter-title">Por Nombre</i>
                                <InputSearchForm placeHolder = "Ingrese nombre materia"
                                                onInputChangeHandler = {handleStateChange}
                                                dataListId = "subjectsOptions"
                                                suggestions = {props.subjectSuggestions}
                                                searchType = {SearchType.bySubject}/>
                            </div>
                            <div className="my-2">
                                <i className="filter-title">Por Día</i>
                                <DaySearchForm onInputChangeHandler = {handleStateChange}
                                            selectOptions = {makeSelectOptions(days)}
                                            searchType = {SearchType.byDay}
                                            error = {state.dayError}/>
                            </div>
                            <div className="my-2">
                                <i className="filter-title">Por Horario</i>
                                <BetweenHoursSearchForm labelSelectOne = "Desde"
                                                        labelSelectTwo = "Hasta"
                                                        submitHandler = {submitHandler}
                                                        startValue = {state.startHour}
                                                        handleHoursSet = {handleHourChange}
                                                        endValue = {state.endHour}
                                                        optionsHours = {makeSelectOptions(hours)}
                                                        searchType = {SearchType.bySchedule}
                                                        error = {state.hoursError}/>
                            </div>
                            <div>
                                <i className="filter-title">Por Aula</i>
                                <InputSearchForm placeHolder = "Ingrese número de aula"
                                                onInputChangeHandler = {handleStateChange}
                                                dataListId = "classroomOptions"
                                                suggestions = {props.classroomSuggestions}
                                                searchType = {SearchType.byClassroom}/>
                            </div>
                            <SubmitSearchButton label="Buscar" 
                                                block={true}
                                                className="mt-3 py-1 filter-button"/>              
                        </FormGroup>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default Filters;