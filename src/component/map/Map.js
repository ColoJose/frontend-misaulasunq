import React from 'react';
// bootstrap
import { ButtonGroup, Button, Col, Row } from 'react-bootstrap';
// resources
import UnqMapPB from '../../resources/PlantaBajaUnq.png';
import UnqMapP1 from '../../resources/PrimerPisoUnq.png';
import UnqMapP2 from '../../resources/SegundoPisoUnq.png';
import PinIcon from '../../resources/locationIcon.png';
import Aulas from '../../resources/Coords.json';
// CONSTANT
import { MapFloor, Route, MapSize } from '../../Constants/Config';
// OWN COMPONENTS
import NotFound from '../NotFound';
import RouteOptions from './RouteOptions';
// UTILS
import findShortestPath from '../../utils/PathFinder';
import { getViewport } from '../../utils/ScreenSizeDetector';
// css
import './Map.css';
import "../ButtonBranding.css";

class Map extends React.Component {

    constructor(props, context) {
        super(props, context);
        //Bindings
        this.shouldShowMap = this.shouldShowMap.bind(this)
        this.drawText = this.drawText.bind(this);
        this.drawStroke = this.drawStroke.bind(this);
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
        this.calculateMapWidth = this.calculateMapWidth.bind(this);
        this.calculateMapHeigth = this.calculateMapHeigth.bind(this);
        this.isActive = this.isActive.bind(this);
        this.mapButtons = this.mapButtons.bind(this);

        this.makeMap = this.makeMap.bind(this);

        //Canvas Layers reference
        this.canvasPBPath = React.createRef();
        this.canvasP1Path = React.createRef();
        this.canvasP2Path = React.createRef();

        this.pathFromParkingEntrance = [];
        this.pathFromMainEntrance = [];

        //For canvas and maps images
        this.defaultWidth = this.calculateMapWidth();
        this.defaultHeigth = this.calculateMapHeigth();

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

    calculateMapWidth(){
        return MapSize[getViewport()]["width"];
    };

    calculateMapHeigth(){
        return MapSize[getViewport()]["height"];
    };

    shouldShowMap(classroomNumber){
        let classroom = Aulas[classroomNumber];
        return classroom !== null 
            && classroom !== undefined 
            && [MapFloor.BAJA, MapFloor.PRIMER, MapFloor.SEGUNDO].includes(classroom.piso.toUpperCase());
    }

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
            // this.drawMaps(); //Method deprecated
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

            //Si no hay rutas, dehabilita los botones
            if(Array.isArray(route) && route.length){
                this.drawRoute(route);
            } else {
                disableMapButtons = true;
            }

            floorToshow = this.drawPin(classroom);

            this.setState({ disableButtons: disableMapButtons, mapToShow: floorToshow, routeSelected: routeToDraw },this.props.mapReady());
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
        this.drawPin(Aulas[this.state.classroomToShow]);

        this.setState({routeSelected: newRouteSelected});
    }

    isActive(relatedMap) {
        return this.state.mapToShow === relatedMap;
    }

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
                    El navegador no soporta el método de visualización De La Ruta.
                </canvas>;
    };

    makeMap(id, src, showLogic,index){
        return  <img id={id}
                     src={src}
                     width={this.defaultWidth}
                     height={this.defaultHeigth}
                     hidden={showLogic}
                     className={"canvas-Map "+index}>
                </img>;
    };

    render(){
        if(this.state.imageAvailable){
            return (
                <Row>
                    <Col id="map-column"
                         className="mx-auto px-auto ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0"
                         xs={{span:12,order:2}} sm={{span:12,order:2}} md={{span:12,order:2}} xl={{span:9,order:1}} lg={{span:9,order:1}}>
                        {this.makeDivContainer(
                            this.makeMap("mapPB", UnqMapPB, this.state.mapToShow !== MapFloor.BAJA, "canvas-back"),
                            this.makeCanvas("routePB", this.canvasPBPath, this.state.mapToShow !== MapFloor.BAJA, "canvas-front"),
                            this.state.mapToShow !== MapFloor.BAJA
                        )}
                        {this.makeDivContainer(
                            this.makeMap("mapP1", UnqMapP1, this.state.mapToShow !== MapFloor.PRIMER, "canvas-back"),
                            this.makeCanvas("routeP1", this.canvasP1Path, this.state.mapToShow !== MapFloor.PRIMER, "canvas-front"),
                            this.state.mapToShow !== MapFloor.PRIMER
                        )}
                        {this.makeDivContainer(
                            this.makeMap("mapP2", UnqMapP2, this.state.mapToShow !== MapFloor.SEGUNDO, "canvas-back"),
                            this.makeCanvas("routeP2", this.canvasP2Path, this.state.mapToShow !== MapFloor.SEGUNDO, "canvas-front"),
                            this.state.mapToShow !== MapFloor.SEGUNDO
                        )}
                    </Col>
                    <Col id="options-column" 
                         className="px-0
                                    d-sm-inline-flex flex-sm-row
                                    d-md-inline-flex flex-md-row
                                    d-lg-flex flex-lg-row px-lg-auto mx-lg-0
                                    d-xl-flex flex-xl-row px-xl-auto mx-xl-0"
                          xs={{span:12,order:1}} sm={{span:12,order:1}} md={{span:12,order:1}} xl={{span:3,order:2}} lg={{span:3,order:2}}>
                        <div id="options" 
                             className="my-xl-5 my-lg-5 py-xl-5 py-lg-5 mx-auto px-auto row row-cols-2 row-cols-sm-2 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
                            {this.mapButtons()}
                            <div className="mx-lg-0 mx-xl-0 mb-xl-5 mb-lg-5 pb-xl-5 pb-lg-5 px-lg-0 px-xl-0 mt-lg-1 mt-xl-1 col-12 col-sm-12 col-md-6 col-lg-auto col-xl-auto px-auto m-auto">
                                <div className="row row-cols-1 px-auto px-md-0 px-xl-0 px-lg-0 mx-auto">
                                    <div className="col-12 col-xl-12 col-lg-12 px-lg-0 mx-lg-0 mx-xl-0 px-xl-0 mx-auto d-flex justify-content-center justify-content-lg-start">
                                        <b >Camino al aula desde:</b>
                                    </div>
                                    {this.renderRouteSelection()}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            );
        } else {
            return <NotFound label={"Ubicación No Disponible."}/>
        }
    };
    
    renderRouteSelection(){
        if(this.parkingRouteAvailable() || this.mainRouteAvailable()){
            return <RouteOptions parkingRouteUnavailable={!this.parkingRouteAvailable()}
                          parkingChecked={this.state.routeSelected === Route.ESTACIONAMIENTO}
                          routeStartingAtParking={()=>{this.reDrawRoute(Route.ESTACIONAMIENTO)}}
                          mainRouteUnavailable={!this.mainRouteAvailable()}
                          mainChecked={this.state.routeSelected === Route.PRINCIPAL}
                          routeStartingAtMain={()=>{this.reDrawRoute(Route.PRINCIPAL)}}/>;
        } else {
            return <>
                <b>No hay rutas disponibles.</b>
            </>;
        }
    };

    mapButtons(){
        return (
            <Col id="floor-options"
                className="mt-xl-5 mt-lg-5 pt-xl-5 pt-lg-5 pl-lg-0 pr-lg-2 px-xl-0 pr-xl-2 mb-lg-1 mb-xl-1 mx-auto px-auto mb-2"
                xs={12} sm={12} md={6} xl={12} lg={12}>
            <Row xs={1} className="px-auto mx-auto">
                <b className="col-3 px-lg-0 mx-lg-0 mx-xl-0 px-xl-0 mx-auto">Pisos:</b>
            </Row>
            <Row xs={1} className="px-auto mx-auto">
                <ButtonGroup size="sm">
                    <Button className="color-button responsive-font"
                            disabled={this.state.disableButtons}
                            active={this.isActive(MapFloor.BAJA)}
                            onClick={ ()=> {this.setState({mapToShow:MapFloor.BAJA})}}>Planta Baja</Button>
                    <Button className="color-button responsive-font"
                            disabled={this.state.disableButtons}
                            active={this.isActive(MapFloor.PRIMER)}
                            onClick={ ()=> {this.setState({mapToShow:MapFloor.PRIMER})}}>Primer Piso</Button>
                    <Button className="color-button responsive-font"
                            disabled={this.state.disableButtons}
                            active={this.isActive(MapFloor.SEGUNDO)}
                            onClick={ ()=> {this.setState({mapToShow:MapFloor.SEGUNDO})}}>Segundo Piso</Button>
                </ButtonGroup>
            </Row>
        </Col>
        );
    }
}

export default Map;