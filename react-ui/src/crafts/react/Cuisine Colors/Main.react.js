import React from 'react'
import Axios from 'axios'
import Chroma from 'chroma-js'
import ColorCircle from './ColorCircle.react'
import ColorWheel from './ColorWheel.react'

const term = 'italian'

class Main extends React.Component {

  // Helpers

  updateDimensions = () => {
    this.setState(prevState => {
      return {
        width: window.innerWidth, 
        height: window.innerHeight, 
        colors: prevState.colors
      }
    });
  }

  sortColors(colorArray) {
    return colorArray.sort(function (colorA, colorB) {
      return colorA[1].lch()[0] - colorB[1].lch()[0]
    })
  }

  // Component life cycle 

  componentWillMount() { 
    this.updateDimensions();              
    Axios.get('/api/cuisine_colors/' + term).then(result => {
      // console.log(result.data)

      // move colors into array
      let colors = []
      Object.keys(result.data).map(image => {
        colors = colors.concat(result.data[image].slice(0, 3).map(color => {
          return [
            image,
            Chroma(
              color.color.red, 
              color.color.green, 
              color.color.blue
            ).alpha(0.75)
          ]
        }))
      })

      //sort
      colors = this.sortColors(colors);
      this.setState({colors});
      this.updateDimensions();          
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    let index = 0;
    return (
      <div style={{textAlign: 'center', verticalAlign: 'middle', lineHeight: (this.state.height).toString() + 'px', fontSize:30}}>
        <ColorWheel 
          colors={this.state.colors} 
          center_x={this.state.width/2} 
          center_y={this.state.height/2} 
          radius={this.state.height/4}
          subcircle_radius={this.state.height/10}/>
        {term.charAt(0).toUpperCase() + term.slice(1)}
      </div>
    );
  }

}

export default Main;