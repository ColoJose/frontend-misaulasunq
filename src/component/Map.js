
import React from 'react';
import UnqMap from '../resources/plantaBajaUnq.png';

class Map extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.draw = this.draw.bind(this);
  };

  componentDidMount() {
    this.draw();
  };

  draw() {
      var canvas = document.getElementById('map');
      if (canvas !== null && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        
        img.src = UnqMap;
        img.width = 300;
        img.height = 500;
        img.onload = function() {
          ctx.drawImage(img, 0, 0,img.width,img.height); //los dos ultimos parametros designan la dimension de la imagen
          ctx.fillStyle = 'rgb(200, 0, 0)';
          ctx.fillRect(10, 10, 50, 50);
          
          // ctx.beginPath();
          // ctx.moveTo(30, 96);
          // ctx.lineTo(70, 66);
          // ctx.lineTo(103, 76);
          // ctx.lineTo(170, 15);
          // ctx.stroke();
        };
        // img.sizes = "300x500" 
        // ctx.fillStyle = 'rgb(200, 0, 0)';
        // ctx.fillRect(10, 10, 50, 50);

        // ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        // ctx.fillRect(30, 30, 50, 50);
      }
    };

    render(){
      return (
        <>
          <canvas id="map" width="300" height="500">
          </canvas>
        </>
      )
    }
    
}

export default Map;