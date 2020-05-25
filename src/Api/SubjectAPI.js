import { API_CONFIG } from "./Api-Config";
import axios from 'axios';

export default class SubjectAPI {

    getSubjectSuggestions(){
        return axios.get(
            `${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/suggestions`
            , this.getHeader()
        );
    }

    getSubjectsBySchedule(startHour, endHour){
        return axios.get(
            `${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/betweenHours/${startHour}/${endHour}`
            , this.getHeader()
        );
    }

    getSubjectsByClassroomNumber(classroomNumber){
        return axios.get(
            `${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/byClassroomNumber/${classroomNumber}`, 
            this.getHeader()
        );
    }

    getSubjectsByName(subjectName){
        return axios.get(
            `${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/byName/${subjectName}`, 
            this.getHeader()
        );
    }

    getCurrentDaySubjects() {
        return axios.get(
            `${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/currentDaySubjects`,
            this.getHeader()
        )
    }

    getAllDegrees() {
        return axios.get(
            `${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/all-degrees`,
            this.getHeader()
        )
    }
    
    createNewSubject(subject) {
        return axios.post(`${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/new-subject`,
                            subject,
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
