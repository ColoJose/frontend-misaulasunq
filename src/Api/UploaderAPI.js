import { API_CONFIG } from "./Api-Config";
import axios from 'axios';

export default class UploaderAPI {

    uploadFile(file){
        let fileToUpload = new FormData();
        fileToUpload.append('file', file);

        return axios.post(
                `${API_CONFIG.endPoint}/uploaderAPI/massive`,
                fileToUpload,
                this.getHeader()
            );
    }

    getHeader(){
        return {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Access-Control-Allow-Methods": API_CONFIG.allowMethods,
                "Access-Control-Allow-Origin": API_CONFIG.allowOrigin
            }
        };
    }
}