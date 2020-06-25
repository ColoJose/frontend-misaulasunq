export function parseError(errorResponse) {
    if(errorResponse.status === 400){
        return errorResponse.data;
    }else{
        return "Ocurrio un error inesperado, por favor contacte con un administrador.";
    }
}
