
import React from 'react';
import UnqMap from '../resources/PlantaBajaUnq.png';
import PinIcon from '../resources/mapIcon.png';
import Aulas from '../resources/AulasCoord.json';
class Map extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.canvas = React.createRef();
    this.state = {  classroomToShow: props.classroom  };
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
        pin.src = PinIcon;
        pin.width = 25;
        pin.height = 25;

        img.src = UnqMap;
        img.width = 800;
        img.height = 500;

        let classroomNumber = this.state.classroomToShow;
        let pinPosX = Aulas[classroomNumber].x-(pin.width/2);
        let pinPosy = Aulas[classroomNumber].y-pin.height;
        
        

        img.onload = function() {
          ctx.width = 800;
          ctx.width = 500;
          ctx.drawImage(img, 0, 0,img.width,img.height); //los dos ultimos parametros designan la dimension de la imagen
          
          ctx.drawImage(pin, pinPosX, pinPosy,pin.width,pin.height);

          // Entrada Principal
          ctx.font = '25px arial';
          ctx.textAlign = "center";
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 0.60;
          ctx.fillStyle = "#bd2130";
          ctx.fillText(classroomNumber, Aulas[classroomNumber].x, pinPosy-5);
          ctx.strokeText(classroomNumber, Aulas[classroomNumber].x, pinPosy-5);
          
        };
      }
    };

    render(){
      return (
        <>
          <canvas id="map" 
                  ref={this.canvas}
                  width="800" 
                  height="500">
          </canvas>
        </>
      )
    }
    
}

export default Map;