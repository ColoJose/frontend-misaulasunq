import { API_CONFIG } from "./Api-Config";
import axios from 'axios';

export default class SubjectAPI {

    getAllSubjects(pageNumber,elems) {
        return axios.get(
            `${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/all-subjects?page=${pageNumber}&elems=${elems}`,
            this.getHeader()
        )
    }

    getSubjectsDictatedOnDay(aDay){
        return axios.get(
            `${API_CONFIG.endPoint}/subjectAPI/byDay/${aDay}`
            , this.getHeader()
        );
    }

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
        );
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

    editGeneralInfoSubject(id, objToEdit) {
        return axios.put(`${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/edit-general-info/`+id,
                        objToEdit,
                        this.getHeader()
        )
    }

    getCommissionsBySubjectId(id) {
        return axios.get(`${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/commissions/${id}`, // edit/commissions
                          this.getHeader()
        )
    }

    updateCommission(commissions, subjectId) {
        const id = subjectId
        return axios.put(`${API_CONFIG.endPoint}/${API_CONFIG.subjectAPI}/edit/commissions/${id}`,
                          commissions,
                          this.getHeader()
        )
    }

    getAllClassrooms() {
        return axios.get(`${API_CONFIG.endPoint}/${API_CONFIG.classroomAPI}/suggestions`,
                         this.getHeader());
    }

        // getJWT() {
        //     return axios({
        //         method: 'post',
        //         url: 'https://dev-hlo8aufh.auth0.com/oauth/token',
        //         headers: { "Content-Type": API_CONFIG.contentType},
        //         data: {
        //             client_id: "aHQN1HPqiXahHa0H7pRasGYPLVDu4Tkp",
        //             client_secret: "eOfaTNhOLNI8-h9TSwoJyUPSSiu6EdAzlUuA8PkrTknzFVBsMFP0fK7dRFJf4ZG0",
        //             audience:"https://api-tip",
        //             grant_type:"client_credentials"     
        //         }
        //     })
        // }
        // .then( (resp) => {
    // AuthorizeJWT(resp.data.access_token).getInstance();
    // }).catch( e => console.log(e));

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
