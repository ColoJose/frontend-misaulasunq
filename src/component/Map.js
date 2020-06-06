import React from 'react';
import findShortestPath from './../utils/PathFinder';
import NotFound from './NotFound';
// bootstrap
import { ButtonGroup, Button, Badge, Col, Row, Form } from 'react-bootstrap';
// resources
import UnqMapPB from '../resources/PlantaBajaUnq.png';
import UnqMapP1 from '../resources/PrimerPisoUnq.png';
import UnqMapP2 from '../resources/SegundoPisoUnq.png';
import PinIcon from '../resources/locationIcon.png';
import Aulas from '../resources/Coords.json';
// css
import './Map.css';
import "./ButtonBranding.css";

const MapFloor = Object.freeze({
    "BAJA":"BAJA", 
    "PRIMER":"PRIMER", 
    "SEGUNDO":"SEGUNDO"
});
const Route = Object.freeze({
    "ESTACIONAMIENTO":"EntradaEstacionamiento", 
    "PRINCIPAL":"EntradaPrincipal"
});

class Map extends React.Component {

    constructor(props, context) {
        super(props, context);
        //Bindings
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
        this.makeCanvas = this.makeCanvas.bind(this);
        this.makeDivContainer = this.makeDivContainer.bind(this);
        this.renderRouteSelection = this.renderRouteSelection.bind(this);
        this.parkingRouteAvailable = this.parkingRouteAvailable.bind(this);
        this.mainRouteAvailable = this.mainRouteAvailable.bind(this);
        this.drawPinAtPointAndFloor = this.drawPinAtPointAndFloor.bind(this);

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
        this.defaultWidth = 800;
        this.defaultHeigth = 528;

        this.state = {
            mapToShow: MapFloor.BAJA,
            classroomToShow: props.classroom,
            imageAvailable: this.shouldShowMap(props.classroom),
            groundFloorMapLoaded: false,
            firstFloorMapLoaded: false,
            secondFloorMapLoaded: false,
            disableButtons: false,
            routeSelected: Route.PRINCIPAL 
        };

        //Trato de obtener las rutas del estacionamiento y la entrada principal al aula.
        if(this.state.imageAvailable){
            this.pathFromParkingEntrance = findShortestPath(Aulas,Route.ESTACIONAMIENTO,this.state.classroomToShow);
            this.pathFromMainEntrance = findShortestPath(Aulas,Route.PRINCIPAL,this.state.classroomToShow);
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

    drawPin(classroom){
        let floorToReturn = MapFloor.BAJA;
        switch (classroom.piso.toUpperCase()) {
            case 'BAJA':
                this.drawPinAtPointAndFloor(this.canvasPBPath.current.getContext('2d'),classroom.x,classroom.y);
                floorToReturn = MapFloor.BAJA;
                break;
            case 'PRIMER':
                this.drawPinAtPointAndFloor(this.canvasP1Path.current.getContext('2d'),classroom.x,classroom.y);
                floorToReturn = MapFloor.PRIMER;
                break
            default:
                this.drawPinAtPointAndFloor(this.canvasP2Path.current.getContext('2d'),classroom.x,classroom.y);
                floorToReturn = MapFloor.SEGUNDO;
                break;
        }

        return floorToReturn;
    }

    drawPinAtPointAndFloor(canvasContext,percentCoordX,percentCoordY){
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
            canvasContext, '25px arial', "center", 0.60, "#bd2130", 
            this.state.classroomToShow, coordX, pinPosY-5);
        this.drawStroke(
            canvasContext, 0.60, 'black', this.state.classroomToShow, 
            coordX, pinPosY-5);
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
        let canvasContextPB = this.canvasPBPath.current.getContext('2d');
        let canvasContextP1 = this.canvasP1Path.current.getContext('2d');
        let canvasContextP2 = this.canvasP2Path.current.getContext('2d');

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
    };

    drawPath(canvasContext, actualNode, nextNode){
        let actualNodeX = this.calculateCoord(this.defaultWidth,actualNode.x);
        let actualNodeY = this.calculateCoord(this.defaultHeigth,actualNode.y);
        let nextNodeX = this.calculateCoord(this.defaultWidth,nextNode.x);
        let nextNodeY = this.calculateCoord(this.defaultHeigth,nextNode.y);

        canvasContext.beginPath();
        canvasContext.lineWidth = "3";
        canvasContext.strokeStyle = "#bd2130";
        canvasContext.moveTo(actualNodeX,actualNodeY);
        canvasContext.lineTo(nextNodeX,nextNodeY);
        canvasContext.stroke();

        // Dibuja la cabeza de flecha
        if(actualNode.piso.toUpperCase() !== nextNode.piso.toUpperCase()){
            canvasContext.beginPath();
            canvasContext.moveTo(nextNodeX, nextNodeY);
            canvasContext.lineTo(nextNodeX+3, nextNodeY);
            canvasContext.lineTo(nextNodeX, nextNodeY+2);
            canvasContext.lineTo(nextNodeX-3, nextNodeY);
            canvasContext.closePath();
            canvasContext.stroke();
        }
    };

    componentDidMount() {
        if(this.state.imageAvailable){
            this.drawMaps();
            let classroom = Aulas[this.state.classroomToShow];
            let route = [];

            let floorToshow = this.state.mapToShow;
            let disableMapButtons = this.state.disableButtons;
            let routeToDraw = this.state.routeSelected;

            //si hay ruta desde la entrada principal la cargo, sino desde el estacionamiento
            if(this.parkingRouteAvailable()){
                route = this.pathFromMainEntrance;
            }else{
                route = this.pathFromParkingEntrance;
                routeToDraw = Route.ESTACIONAMIENTO;
            }

            //TODO tiene que deshabiitar solo los opcioens de ruta
            if(Array.isArray(route) && route.length){
                this.drawRoute(route);
            } else {
                disableMapButtons = true;
            }

            floorToshow = this.drawPin(classroom);

            this.setState({ disableButtons: disableMapButtons, mapToShow: floorToshow, routeSelected: routeToDraw });
        } else {
            this.props.mapReady();
        }
    };

    parkingRouteAvailable(){
        return Array.isArray(this.pathFromParkingEntrance) && this.pathFromParkingEntrance.length;
    };

    mainRouteAvailable(){
        return Array.isArray(this.pathFromMainEntrance) && this.pathFromMainEntrance.length;
    };

    makeDivContainer(map, overlay,hiddenLogic){
        return <div className="map-container" 
                    style={{height: this.defaultHeigth+'px'}} 
                    hidden={hiddenLogic}>
                    {map}
                    {overlay}
                </div>;
    };

    makeCanvas(id, reference, showLogic,index){
        return  <canvas id={id}
                        ref={reference}
                        width={this.defaultWidth}
                        height={this.defaultHeigth}
                        hidden={showLogic}
                        className={"canvas-Map "+index}>
                    El navegador no soporta el método de visualización.
                </canvas>;
    };

    renderRouteSelection(){
        if(this.parkingRouteAvailable() || this.mainRouteAvailable()){
            return <>
                <Form.Check type="radio"
                            label="Estacionamiento"
                            name="Estacionamiento"
                            disabled={!this.parkingRouteAvailable()}
                            checked={this.state.routeSelected === Route.ESTACIONAMIENTO}
                            onChange={()=>{this.reDrawRoute(Route.ESTACIONAMIENTO)}}/>
                <Form.Check type="radio"
                            label="Entrada Principal"
                            name="Entrada Principal"
                            disabled={!this.mainRouteAvailable()}
                            checked={this.state.routeSelected === Route.PRINCIPAL}
                            onChange={()=>{this.reDrawRoute(Route.PRINCIPAL)}}/>
            </>;
        } else {
            return <>
                <b>No hay rutas disponibles.</b>
            </>;
        }
    };

    reDrawRoute(newRouteSelected){
        //limpiar los 3 canvas de ruta
        let canvasPathPB = this.canvasPBPath.current.getContext('2d');
        let canvasPathP1 = this.canvasP1Path.current.getContext('2d');
        let canvasPathP2 = this.canvasP2Path.current.getContext('2d');
        canvasPathPB.clearRect(0, 0, this.defaultWidth, this.defaultHeigth);
        canvasPathP1.clearRect(0, 0, this.defaultWidth, this.defaultHeigth);
        canvasPathP2.clearRect(0, 0, this.defaultWidth, this.defaultHeigth);
        let route = this.pathFromMainEntrance;

        if(newRouteSelected === Route.ESTACIONAMIENTO){
            route =  this.pathFromParkingEntrance;
        }

        //re dibujar ruta
        this.drawRoute(route);
        let floorToshow = this.drawPin(Aulas[this.state.classroomToShow]);

        this.setState({routeSelected: newRouteSelected});
    }

    render(){
        if(this.state.imageAvailable){
            return (
                <>
                    <Row className="justify-content-center">
                        <ButtonGroup size="sm" className="button-Group">
                            <Button className="btn btn-danger color-button"
                                    disabled={this.state.disableButtons}
                                    active={this.state.mapToShow !== MapFloor.BAJA}
                                    onClick={ ()=> {this.setState({mapToShow:MapFloor.BAJA})}}>Planta Baja</Button>
                            <Button className="btn btn-danger color-button"
                                    disabled={this.state.disableButtons}
                                    active={this.state.mapToShow !== MapFloor.PRIMER}
                                    onClick={ ()=> {this.setState({mapToShow:MapFloor.PRIMER})}}>Primer Piso</Button>
                            <Button className="btn btn-danger color-button"
                                    disabled={this.state.disableButtons}
                                    active={this.state.mapToShow !== MapFloor.SEGUNDO}
                                    onClick={ ()=> {this.setState({mapToShow:MapFloor.SEGUNDO})}}>Segundo Piso</Button>
                        </ButtonGroup>
                    </Row>
                    <Row>
                    <Col xs={10}>
                        {this.makeDivContainer(
                            this.makeCanvas("mapPB", this.canvasPBMap, this.state.mapToShow !== MapFloor.BAJA, "canvas-back"),
                            this.makeCanvas("routePB", this.canvasPBPath, this.state.mapToShow !== MapFloor.BAJA, "canvas-front"),
                            this.state.mapToShow !== MapFloor.BAJA
                        )}
                        {this.makeDivContainer(
                            this.makeCanvas("mapP1", this.canvasP1Map, this.state.mapToShow !== MapFloor.PRIMER, "canvas-back"),
                            this.makeCanvas("routeP1", this.canvasP1Path, this.state.mapToShow !== MapFloor.PRIMER, "canvas-front"),
                            this.state.mapToShow !== MapFloor.PRIMER
                        )}
                        {this.makeDivContainer(
                                this.makeCanvas("mapP2", this.canvasP2Map, this.state.mapToShow !== MapFloor.SEGUNDO, "canvas-back"),
                                this.makeCanvas("routeP2", this.canvasP2Path, this.state.mapToShow !== MapFloor.SEGUNDO, "canvas-front"),
                                this.state.mapToShow !== MapFloor.SEGUNDO
                        )}
                        </Col>
                        <Col xs={2} className="d-flex align-items-start flex-column">
                            <Badge variant="light">Ruta Desde:</Badge>
                            {this.renderRouteSelection()}                 
                        </Col>
                    </Row>
                </>
            );
        } else {
            return <NotFound label={"Ubicación No Disponible."}/>
        }
    };
}



export default Map;