import React from 'react';
import Axios from 'axios';
import Chroma from 'chroma-js';
import ColorCircle from './ColorCircle.react';

class ColorWheel extends React.Component {
  sortColors(colorArray) {
    return colorArray.sort(function(colorA, colorB) {
      return colorA[1].lch()[0] - colorB[1].lch()[0];
    });
  }

  render() {
    let index = 0;
    return (
      <div>
        {this.props.colors &&
          this.sortColors(this.props.colors).map(color => {
            //calculate position
            const angle =
              index / (this.props.colors.length / 2) * Math.PI * 0.8 +
              Math.PI * 0.225;
            const x = this.props.center_x - this.props.subcircle_radius / 2;
            const y = this.props.center_y - this.props.subcircle_radius / 2;
            index++;
            return (
              <ColorCircle
                key={index}
                href={color[0]}
                color={color[1]}
                radius={this.props.subcircle_radius}
                x={this.props.radius * Math.sin(angle) + x}
                y={this.props.radius * Math.cos(angle) + y}
              />
            );
          })}
      </div>
    );
  }
}

export default ColorWheel;
