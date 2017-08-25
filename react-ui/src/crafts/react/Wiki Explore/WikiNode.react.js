import React from 'react'
import ReactKonva from 'react-konva'

const {Circle} = ReactKonva;

class WikiNode extends React.Component {
  state = { color: 'green' };

  handleClick = () => {
    this.setState({
      color: window.Konva.Util.getRandomColor()
    });
  }

  render() {
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        width={this.props.size}
        height={this.props.size}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

export default WikiNode