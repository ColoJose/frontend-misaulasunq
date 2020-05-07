import React from 'react';
// resources
import UnqMapPB from '../resources/PlantaBajaUnq.png';
import UnqMapP1 from '../resources/PrimerPisoUnq.png';
import UnqMapP2 from '../resources/SegundoPisoUnq.png';
import PinIcon from '../resources/locationIcon.png';
import Aulas from '../resources/AulasCoord.json';
import NotFound from './NotFound';
// react-icons
import { BsExclamationTriangleFill } from 'react-icons/bs';
//Bootstrap
import { Badge} from "react-bootstrap";

class Map extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.canvas = React.createRef();

        this.shouldShowMap = this.shouldShowMap.bind(this)
        this.draw = this.draw.bind(this);
        this.drawText = this.drawText.bind(this);
        this.drawStroke = this.drawStroke.bind(this);
        this.handleImageLoad = this.handleImageLoad.bind(this);

        this.state = {
            classRoom: Aulas[props.classroom],
            classroomToShow: props.classroom,
            imageAvailable: this.shouldShowMap(Aulas[props.classroom])
        };
    };

    shouldShowMap(classroom){
        return classroom !== null 
            && classroom !== undefined 
            && ["baja", "primer", "segundo"].includes(classroom.piso);
    }

    draw() {
        let canvas = this.canvas.current;

        if(canvas !== null && canvas !== undefined && this.state.imageAvailable) {
            let img = new Image(800,500);
            let pin = new Image(25,25);
            pin.src = PinIcon;

            let piso = '';
            switch(this.state.classRoom.piso) {
                case 'baja':
                    img.src = UnqMapPB;
                    piso = 'Planta Baja';
                    break;
                case 'primer':
                    img.src = UnqMapP1;
                    piso = 'Primer Piso';
                    break;
                case 'segundo':
                    img.src = UnqMapP2;
                    piso = 'Segundo Piso';
                    break;
            }
            let pinPosX = this.state.classRoom.x-(pin.width/2);
            let pinPosY = this.state.classRoom.y-pin.height;

            img.onload = () => this.handleImageLoad(canvas.getContext('2d'),img,pin,piso,pinPosX,pinPosY);
        };
    };

    handleImageLoad(canvasContext,map,pin,floor,pinPosX,pinPosY){
        canvasContext.width = 800;
        canvasContext.height = 500;
        canvasContext.drawImage(map, 0, 0,map.width,map.height);
        canvasContext.drawImage(pin, pinPosX, pinPosY,pin.width,pin.height);

        // Nombre aula
        this.drawText(
            canvasContext, 
            '25px arial', 
            "center", 
            0.60, 
            "#bd2130", 
            this.state.classroomToShow, 
            this.state.classRoom.x, 
            pinPosY-5
        );
        this.drawStroke(
            canvasContext, 
            0.60, 
            'black', 
            this.state.classroomToShow, 
            this.state.classRoom.x, 
            pinPosY-5
        );
        // Nombre Piso
        this.drawText(
            canvasContext, 
            '32px arial', 
            "center", 
            0.60, 
            'black', 
            floor, 
            canvasContext.width/2, 
            32
        );
    }

    drawText(canvasContext, font, align, lineWidth, style, floor, posX, posY){
        canvasContext.font = font;
        canvasContext.textAlign = align;
        canvasContext.lineWidth = lineWidth;
        canvasContext.fillStyle = style;
        canvasContext.fillText(floor, posX, posY);
    };

    drawStroke(canvasContext, lineWidth, style, classroomNumber, posX, posY){
        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = style;
        canvasContext.strokeText(classroomNumber, posX, posY);
    };

    componentDidMount() {
        this.draw();
    };

    render(){
        if(this.state.imageAvailable){
            return (
                <>
                    <canvas id="map"
                            ref={this.canvas}
                            width="800"
                            height="500">
                    </canvas>
                </>
            );
        } else {
            return <NotFound label={"Ubicación No Disponible"}/>
        }
    };
}

export default Map;