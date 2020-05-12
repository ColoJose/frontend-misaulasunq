import { API_CONFIG } from "./Api-Config";
import axios from "axios";

export default class ClassroomAPI{

    getClassroomSuggestions(startHour, endHour){
        // return axios.get(
        //     `${API_CONFIG.endPoint}/subjectAPI/betweenHours/${startHour}/${endHour}`
        //     , this.getHeader()
        // );
        return ["CyT-1", "CyT-1", "52"];
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
