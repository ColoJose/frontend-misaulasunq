import React from 'react';
import findShortestPath from './../utils/PathFinder';
import NotFound from './NotFound';
// bootstrap
import { ButtonGroup, Button } from 'react-bootstrap';
// resources
import UnqMapPB from '../resources/PlantaBajaUnq.png';
import UnqMapP1 from '../resources/PrimerPisoUnq.png';
import UnqMapP2 from '../resources/SegundoPisoUnq.png';
import PinIcon from '../resources/locationIcon.png';
import Aulas from '../resources/Coords.json';

const MapFloor = Object.freeze({
    "BAJA":"BAJA", 
    "PRIMER":"PRIMER", 
    "SEGUNDO":"SEGUNDO"
});
class Map extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.shouldShowMap = this.shouldShowMap.bind(this)
        this.draw = this.drawMaps.bind(this);
        this.drawText = this.drawText.bind(this);
        this.drawStroke = this.drawStroke.bind(this);
        this.handleImageLoad = this.handleImageLoad.bind(this);
        this.mapsReady = this.mapsReady.bind(this);
        this.drawPin = this.drawPin.bind(this);
        this.calculateCoord = this.calculateCoord.bind(this);
        this.drawRoute = this.drawRoute.bind(this);
        this.drawPath = this.drawPath.bind(this);

        //Canvas Layers reference
        this.canvasPBMap = React.createRef();
        this.canvasP1Map = React.createRef();
        this.canvasP2Map = React.createRef();
        this.canvasPBPath = React.createRef();
        this.canvasP1Path = React.createRef();
        this.canvasP2Path = React.createRef();

        this.pathFromParkingEntrance = [];
        this.pathFromMainEntrance = [];

        //For canvas and maps images
        this.defaultWidth = 950;
        this.defaultHeigth = 558;

        this.state = {
            mapToShow: MapFloor.BAJA,
            classroomToShow: props.classroom,
            imageAvailable: this.shouldShowMap(props.classroom),
            groundFloorMapLoaded: false,
            firstFloorMapLoaded: false,
            secondFloorMapLoaded: false
        };

        //Trato de obtener las rutas del estacionamiento y la entrada principal al aula.
        if(this.state.imageAvailable){
            this.pathFromParkingEntrance = findShortestPath(Aulas,"EntradaEstacionamiento",this.state.classroomToShow);
            this.pathFromMainEntrance = findShortestPath(Aulas,"EntradaPrincipal",this.state.classroomToShow);
        }
    };

    shouldShowMap(classroomNumber){
        let classroom = Aulas[classroomNumber];
        return classroom !== null 
            && classroom !== undefined 
            && [MapFloor.BAJA, MapFloor.PRIMER, MapFloor.SEGUNDO].includes(classroom.piso.toUpperCase());
    }

    drawMaps() {
        let canvasPB = this.canvasPBMap.current;
        let canvasP1 = this.canvasP1Map.current;
        let canvasP2 = this.canvasP2Map.current;
        
        //Si canvas es distinto a undefined o null va a ser true
        if (canvasPB && canvasP1 && canvasP2) {
            this.createImage(UnqMapPB,canvasPB.getContext('2d'),MapFloor.BAJA);
            this.createImage(UnqMapP1,canvasP1.getContext('2d'),MapFloor.PRIMER);
            this.createImage(UnqMapP2,canvasP2.getContext('2d'),MapFloor.SEGUNDO);
        };
    };

    createImage(image,canvasContext,floor){
        let floorMap = new Image(this.defaultWidth,this.defaultHeigth);
        floorMap.src = image;
        floorMap.onload = () => this.handleImageLoad(canvasContext,floorMap,floor);
    };

    handleImageLoad(canvasContext,map,floor){
        canvasContext.globalCompositeOperation = "destination-over";
        canvasContext.width = this.defaultWidth;
        canvasContext.height = this.defaultHeigth;
        canvasContext.drawImage(map, 0, 0,map.width,map.height);
        
        switch (floor) {
            case MapFloor.BAJA:
                this.setState({ groundFloorMapLoaded: true  }, this.mapsReady);
                break;
            case MapFloor.PRIMER:
                this.setState({ firstFloorMapLoaded: true  }, this.mapsReady);
                break
            default:
                this.setState({ secondFloorMapLoaded: true  }, this.mapsReady);
                break
        }
    };

    mapsReady(){
        if(this.state.groundFloorMapLoaded && this.state.firstFloorMapLoaded && this.state.secondFloorMapLoaded){
            this.props.mapReady();
        }
    };

    drawPin(canvasContext,percentCoordX,percentCoordY){
        let pin = new Image(25,25);
        pin.src = PinIcon;
        let coordX = this.calculateCoord(this.defaultWidth, percentCoordX);
        let coordY = this.calculateCoord(this.defaultHeigth, percentCoordY);
        let pinPosX = coordX-(pin.width/2);
        let pinPosY = coordY-pin.height;
        pin.onload = () => {
            canvasContext.globalCompositeOperation = "source-over";
            canvasContext.drawImage(pin, pinPosX, pinPosY,pin.width,pin.height);
        };
        
        // Nombre aula
        this.drawText(
            canvasContext, 
            '25px arial', 
            "center", 
            0.60, 
            "#bd2130", 
            this.state.classroomToShow, 
            coordX, 
            pinPosY-5
        );
        this.drawStroke(
            canvasContext, 
            0.60, 
            'black', 
            this.state.classroomToShow, 
            coordX, 
            pinPosY-5
        );
    };

    calculateCoord(size, porcentualCoord){
        return size * (porcentualCoord / 100);
    };

    drawText(canvasContext, font, align, lineWidth, style, floor, posX, posY){
        canvasContext.globalCompositeOperation = "source-over";
        canvasContext.font = font;
        canvasContext.textAlign = align;
        canvasContext.lineWidth = lineWidth;
        canvasContext.fillStyle = style;
        canvasContext.fillText(floor, posX, posY);
    };

    drawStroke(canvasContext, lineWidth, style, classroomNumber, posX, posY){
        canvasContext.globalCompositeOperation = "source-over";
        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = style;
        canvasContext.strokeText(classroomNumber, posX, posY);
    };

    drawRoute(path){
        let canvasContextPB = this.canvasPBMap.current.getContext('2d');
        let canvasContextP1 = this.canvasP1Map.current.getContext('2d');
        let canvasContextP2 = this.canvasP2Map.current.getContext('2d');

        let actualNode;
        let nextNode;
        for(var i=0; i < path.length-2; i++){
            actualNode = Aulas[path[i]];
            nextNode = Aulas[path[i+1]];

            switch (actualNode.piso.toUpperCase()) {
                case 'BAJA':
                    this.drawPath(canvasContextPB, actualNode, nextNode);
                    break;
                case 'PRIMER':
                    this.drawPath(canvasContextP1, actualNode, nextNode);
                    break
                default:
                    this.drawPath(canvasContextP2, actualNode, nextNode);
                    break;
            }
        }
    }

    drawPath(canvasContext, actualNode, nextNode){
        canvasContext.beginPath();
        canvasContext.lineWidth = "3";
        canvasContext.strokeStyle = "#bd2130";
        canvasContext.moveTo(
            this.calculateCoord(this.defaultWidth,actualNode.x),
            this.calculateCoord(this.defaultHeigth,actualNode.y));
        canvasContext.lineTo(
            this.calculateCoord(this.defaultWidth,nextNode.x),
            this.calculateCoord(this.defaultHeigth,nextNode.y));
        canvasContext.stroke();
    }

    componentDidMount() {
        if(this.state.imageAvailable){
            this.drawMaps();
            let classroom = Aulas[this.state.classroomToShow];
            let route = [];

            //si hay ruta desde la entrada principal la cargo, sino desde el estacionamiento
            if(Array.isArray(this.pathFromMainEntrance) && this.pathFromMainEntrance.length){
                route = this.pathFromMainEntrance;
            }else{
                route = this.pathFromParkingEntrance;
            }

            if(Array.isArray(route) && route.length){
                this.drawRoute(route);
            }

            switch (classroom.piso.toUpperCase()) {
                case 'BAJA':
                    this.drawPin(this.canvasPBMap.current.getContext('2d'),classroom.x,classroom.y);
                    this.setState({ mapToShow: MapFloor.BAJA });
                    break;
                case 'PRIMER':
                    this.drawPin(this.canvasP1Map.current.getContext('2d'),classroom.x,classroom.y);
                    this.setState({ mapToShow: MapFloor.PRIMER });
                    break
                default:
                    this.drawPin(this.canvasP2Map.current.getContext('2d'),classroom.x,classroom.y);
                    this.setState({ mapToShow: MapFloor.SEGUNDO });
                    break;
            }
        } else {
            this.props.mapReady();
        }
    };

    /* TODO: Se podria usar un canvas para el mapa y otro para la ruta, asi cuando se tiene que elegir 
    entre la entrada principal o el estacionamiento solo se cambiaria el canvas de la ruta */
    render(){
        if(this.state.imageAvailable){
            return (
                <>
                    <ButtonGroup size="sm">
                        <Button onClick={ ()=> {this.setState({mapToShow:MapFloor.BAJA})}}>Planta Baja</Button>
                        <Button onClick={ ()=> {this.setState({mapToShow:MapFloor.PRIMER})}}>Primer Piso</Button>
                        <Button onClick={ ()=> {this.setState({mapToShow:MapFloor.SEGUNDO})}}>Segundo Piso</Button>
                    </ButtonGroup>
                    <br />
                    <canvas id="mapPB"
                            ref={this.canvasPBMap}
                            width={this.defaultWidth}
                            height={this.defaultHeigth}
                            hidden={ this.state.mapToShow !== MapFloor.BAJA}>
                        El navegador no soporta el método de visualización.
                    </canvas>
                    <canvas id="mapP1"
                            ref={this.canvasP1Map}
                            width={this.defaultWidth}
                            height={this.defaultHeigth}
                            hidden={ this.state.mapToShow !== MapFloor.PRIMER}>
                        El navegador no soporta el método de visualización.
                    </canvas>
                    <canvas id="mapP2"
                            ref={this.canvasP2Map}
                            width={this.defaultWidth}
                            height={this.defaultHeigth}
                            hidden={ this.state.mapToShow !== MapFloor.SEGUNDO}>
                        El navegador no soporta el método de visualización.
                    </canvas>
                </>
            );
        } else {
            return <NotFound label={"Ubicación No Disponible."}/>
        }
    };
}

export default Map;