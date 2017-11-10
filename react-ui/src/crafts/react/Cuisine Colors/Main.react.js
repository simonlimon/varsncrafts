import React from 'react'
import Axios from 'axios'
import Chroma from 'chroma-js'
//TODO Add automatic crawling
//TODO Add option to go to wikipedia articles

const term = 'hungarian'

function sortColors(colorArray) {
  return colorArray.sort(function (colorA, colorB) {
    return Chroma(colorA.rgb).hsv()[0] - Chroma(colorB.rgb).hsv()[0]
  })
}

class Main extends React.Component {
  componentWillMount() {
    Axios.get('/api/cuisine_colors/' + term).then(result => {
      console.log(result.data)
      this.setState(result.data)
    });
  }

  render() {

    // move colors into rgb array
    let colors = []
    this.state && Object.keys(this.state).map(image => {
      colors = colors.concat(this.state[image].slice(0, 3).map(color => {
        return {
          rgb: 'rgba(' +
            color.color.red + ',' +
            color.color.green + ',' +
            color.color.blue + ',' + 0.75 + ')',
          source: image
        }
      }))
    })

    //sort
    colors = sortColors(colors)

    let index = 0;
    let rotation = Math.random() * 10
    return (
      <div style={{textAlign: 'center', verticalAlign: 'middle', lineHeight: (window.innerHeight).toString() + 'px', fontSize:30}}>
        {colors.map(color => {
          //calculate position
          const angle = (index / (Object.keys(this.state).length * 3 / 2)) * Math.PI + rotation;
          index++;
          return (
            <a
              key={index}
              href={color.source}
              style={{
                backgroundColor: color.rgb,
                display: 'block',
                width: 80,
                height: 80,
                borderRadius: '50%',
                position: 'absolute',
                top: (200 * Math.cos(angle)) + (window.innerHeight / 2) - 40,
                left: (200 * Math.sin(angle)) + (window.innerWidth / 2) - 40
              }}
            />
          )
        })}
        {term.charAt(0).toUpperCase() + term.slice(1)}
      </div>
    );
  }

}

export default Main;