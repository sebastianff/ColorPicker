import React from 'react';
import ReactDOM from 'react-dom';


class Canvas extends React.Component {
  componentDidMount() {
      this.updateCanvas();
  }
  componentWillReceiveProps() {
      this.updateCanvas();
  }
  updateCanvas() {
      const ctx = this.refs.canvas.getContext('2d');
      ctx.fillStyle=this.props.color;
      ctx.fillRect(0,0, 300, 100);
  }  
  render() {
      return (
          <canvas ref="canvas" width={300} height={300}/>
      );
  }
}

class ColorPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      colorOne:"rgb(127,127,127)",
      colorTwo:"rgb(127,127,127)",
      gradientColor: "",
      complementColor:"",
      tintedColor:"",
      shadedColor:"",
      tint1:"",
      tint2:"",
      tint3:""
    };
    this.checkColor = this.checkColor.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeTint = this.changeTint.bind(this);
    this.changeShade = this.changeShade.bind(this);
  }
  
  componentDidMount() {
      this.updateCanvas();
  }
  
  componentWillReceiveProps() {
      this.updateCanvas();
  }
  
  updateCanvas() {
      const ctx = this.refs.GradientCanvas.getContext('2d');
      var grd=ctx.createLinearGradient(0,0,170,0);
      grd.addColorStop(0,this.state.colorOne);
      grd.addColorStop(1,this.state.colorTwo);
      ctx.fillStyle=grd;
      ctx.fillRect(0,0,700,200);
  }
  
  changeColor() {
    var color = "rgb("+this.refs.red.value+", "+this.refs.blue.value+", "+this.refs.green.value+")"
    this.setState({
      colorOne:color
    });
    var color = "rgb("+this.refs.redTwo.value+", "+this.refs.blueTwo.value+", "+this.refs.greenTwo.value+")"
    this.setState({
      colorTwo:color
    });
    this.updateCanvas()
  }
  
  complementColor(x,y,z){
    var comX = 256 - x;
    var comY = 256 - y;
    var comZ = 256 - z;
    var colorz = "rgb("+comX+", "+comY+", "+comZ+")"
    this.setState({complementColor: colorz});
  }

  checkColor(evt){
    var rect = evt.target.getBoundingClientRect();
    var x = evt.pageX - rect.left;
    var y = evt.pageY - rect.top;
    const ctx = evt.target.getContext('2d');
    var imgData=ctx.getImageData(x,y,1,1).data;
    var complement = this.complementColor(imgData[0],imgData[1],imgData[2]);
    this.setState({tint1:imgData[0],tint2:imgData[1],tint3:imgData[2]});
    var color = "rgb("+imgData[0]+", "+imgData[1]+", "+imgData[2]+")"
    this.setState({gradientColor: color});
  }
  
  changeTint(evt){
      var tintValue = this.refs.tint.value;
      var tintX = (this.state.tint1-tintValue);
      var tintY = (this.state.tint2-tintValue);
      var tintZ = (this.state.tint3-tintValue);
      var tinted = "rgb("+tintX+", "+tintY+", "+tintZ+")"
      this.setState({tintedColor: tinted});
  }
  
  changeShade(evt){
      var shadeValue = this.refs.shade.value;
      var shadeX = this.state.tint1 + (255 - this.state.tint1) * shadeValue * 0.01;
      var shadeY = this.state.tint2 + (255 - this.state.tint2) * shadeValue * 0.01;
      var shadeZ = this.state.tint3 + (255 - this.state.tint3) * shadeValue * 0.01;
      var shadeX = Math.round(shadeX);
      var shadeY = Math.round(shadeY);
      var shadeZ = Math.round(shadeZ);
      var shaded = "rgb("+shadeX+", "+shadeY+", "+shadeZ+")"
      this.setState({shadedColor: shaded});
      console.log(shaded)
  } 

  render() {
      return (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <Canvas color={this.state.colorOne}/>
                </div>
                <div className="col-md-4">
                 <canvas onClick={this.checkColor} ref="GradientCanvas" />
                 <p>Double Click to Select a Color</p>
                </div>
                <div className="col-md-4">
                  <Canvas color={this.state.colorTwo}/>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <p>Selected Color</p>
                    <Canvas color={this.state.gradientColor}/>
                  </div>
                  <div className="col-md-3">
                    <p>Complementary Color</p>
                    <Canvas color={this.state.complementColor}/>
                  </div>
                  <div className="col-md-3">
                    <p>Tinted Color</p> 
                    <Canvas color={this.state.tintedColor}/>
                  </div>
                  <div className="col-md-3">
                    <p>Shaded Color</p>
                    <Canvas color={this.state.shadedColor}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <p>Pick First Color</p>
                  </div>
                  <div className="col-md-3">
                    <p>Set a Shade</p>
                  </div>
                  <div className="col-md-3">
                    <p>Set a Tint</p>
                  </div>
                  <div className="col-md-3">
                    <p>Pick Second Color</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <input type="range" min="0" max="255" ref="red" onChange={this.changeColor}></input>
                    <input type="range" min="0" max="255" ref="blue" onChange={this.changeColor}></input>
                    <input type="range" min="0" max="255" ref="green" onChange={this.changeColor}></input>
                  </div>
                  <div className="col-md-3">
                    <input type="range" min="0" max="100" ref="tint" onChange={this.changeTint}></input>
                  </div>
                  <div className="col-md-3">
                    <input type="range" min="0" max="100" ref="shade" onChange={this.changeShade}></input>
                  </div>
                  <div className="col-md-3">
                    <input type="range" min="0" max="255" ref="redTwo" onChange={this.changeColor}></input>
                    <input type="range" min="0" max="255" ref="blueTwo" onChange={this.changeColor}></input>
                    <input type="range" min="0" max="255" ref="greenTwo" onChange={this.changeColor}></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
  }
}

ReactDOM.render(
  <ColorPicker />,
  document.getElementById('app')
);