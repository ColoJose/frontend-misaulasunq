
import React from 'react';
import UnqMapPB from '../resources/PlantaBajaUnq.png';
import UnqMapP1 from '../resources/PrimerPisoUnq.png';
import UnqMapP2 from '../resources/SegundoPisoUnq.png';
import PinIcon from '../resources/locationIcon.png';
import Aulas from '../resources/AulasCoord.json';
// react-icons
import { BsExclamationTriangleFill } from 'react-icons/bs';
//Bootstrap
import { Badge} from "react-bootstrap";

class Map extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.canvas = React.createRef();
    
    this.state = {  
      classroomToShow: props.classroom,
      imageAvailable: true
    };
    
    this.draw = this.draw.bind(this);
  };

  componentDidMount() {
    this.draw();
  };

  //TODO: Refactorizar. Acomodar variables, extracion a metodos, poner mas claro el codigo
  draw() {
    let canvas = this.canvas.current;
    if (canvas !== null && canvas.getContext) {
      let ctx = canvas.getContext('2d');
      let img = new Image();
      let pin = new Image();
      let classroomNumber = this.state.classroomToShow;
      let piso = '';

      pin.src = PinIcon;
      pin.width = 25;
      pin.height = 25;

      let pinPosX = Aulas[classroomNumber].x-(pin.width/2);
      let pinPosy = Aulas[classroomNumber].y-pin.height;

      switch(Aulas[classroomNumber].piso) {
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
        default:
          this.setState({ imagevailable: false  });
      }
      
      img.width = 800;
      img.height = 500;

      img.onload = function() {
        ctx.width = 800;
        ctx.height = 500;
        ctx.drawImage(img, 0, 0,img.width,img.height); //los dos ultimos parametros designan la dimension de la imagen
        
        ctx.drawImage(pin, pinPosX, pinPosy,pin.width,pin.height);

        // Nombre aula
        ctx.font = '25px arial';
        ctx.textAlign = "center";
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.60;
        ctx.fillStyle = "#bd2130";
        ctx.fillText(classroomNumber, Aulas[classroomNumber].x, pinPosy-5);
        ctx.strokeText(classroomNumber, Aulas[classroomNumber].x, pinPosy-5);
        
        // Nombre Piso
        ctx.font = '32px arial';
        ctx.textAlign = "center";
        // ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.60;
        ctx.fillStyle = 'black';
        // ctx.fillStyle = "#bd2130";
        ctx.fillText(piso, ctx.width/2, 32);
        // ctx.strokeText(classroomNumber, Aulas[classroomNumber].x, pinPosy-5);
      };
    }
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
      return (
        <>
          <p className="align-middle text-center text-wrap">
            <Badge pill variant="danger">
              <BsExclamationTriangleFill size='12.5%' style={{marginTop:"3%", marginBottom:"3%"}}/>
              <p>Ubicacion No Disponible</p>
            </Badge>
          </p>
        </>
      );
    }
  }    
}

export default Map;