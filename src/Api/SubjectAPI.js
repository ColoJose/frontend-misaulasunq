import { API_CONFIG } from "./Api-Config";
import axios from 'axios';

export default class SubjectAPI{

    getSubjectSuggestions(){
        return axios.get(
            `${API_CONFIG.endPoint}/subjectAPI/suggestions`
            , this.getHeader()
        );
    }

    getSubjectsBySchedule(startHour, endHour){
        return axios.get(
            `${API_CONFIG.endPoint}/subjectAPI/betweenHours/${startHour}/${endHour}`
            , this.getHeader()
        );
    }

    getSubjectsByClassroomNumber(classroomNumber){
        return axios.get(
            `${API_CONFIG.endPoint}/subjectAPI/byClassroomNumber/${classroomNumber}`, 
            this.getHeader()
        );
    }

    getSubjectsByName(subjectName){
        return axios.get(
            `${API_CONFIG.endPoint}/subjectAPI/byName/${subjectName}`, 
            this.getHeader()
        );
    }

    getCurrentDaySubjects() {
        return axios.get(
            `${API_CONFIG.endPoint}/subjectAPI/currentDaySubjects`,
            this.getHeader()
        )
    }

    getHeader(){
        return {
            headers: {
                "Content-Type": API_CONFIG.contentType,
                "Access-Control-Allow-Methods": API_CONFIG.allowMethods,
                "Access-Control-Allow-Origin": API_CONFIG.allowOrigin
            }
        };
    }
}
