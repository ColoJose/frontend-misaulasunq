export const SearchType = Object.freeze({
    "bySubject":"bySubject", 
    "bySchedule":"bySchedule", 
    "byClassroom":"byClassroom",
    "byDay": "byDay"
});

export const hours = Object.freeze([
    "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
    "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"
]);

export const days = Object.freeze(["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]);

export const daysForSorting = Object.freeze(["LUNES","MARTES","MIERCOLES","MIÉRCOLES","JUEVES","VIERNES","SABADO","SÁBADO"]);

export const MapFloor = Object.freeze({
    "BAJA":"BAJA", 
    "PRIMER":"PRIMER", 
    "SEGUNDO":"SEGUNDO"
});

export const Route = Object.freeze({
    "ESTACIONAMIENTO":"EntradaEstacionamiento", 
    "PRINCIPAL":"EntradaPrincipal"
});

export const MapSize = Object.freeze({
    "xxxxs":{
        "width":285,
        "height":168
    },
    "xxxs":{
        "width":285,
        "height":168
    },
    "xxs":{
        "width":380,
        "height":224
    },
    "xs":{
        "width":475,
        "height":280
    },
    "sm":{
        "width":665,
        "height":391
    },
    "md":{
        "width":855,
        "height":503
    },
    "l":{
        "width": 750,
        "height": 441
    },
    "lg":{
        "width": 979,
        "height": 576
    },
    "xl":{
        "width": 979,
        "height": 576
    }
})
