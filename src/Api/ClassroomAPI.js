import { API_CONFIG } from "./Api-Config";
import axios from "axios";

export default class ClassroomAPI{

    getClassroomSuggestions(){
        return axios.get(
            `${API_CONFIG.endPoint}/classroomAPI/suggestions`
            , this.getHeader()
        );
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
