import React from 'react';

class Cell extends React.Component {

  render() {
    return (
      <div
        onMouseDown={this.props.handleClick}
        className="cell"
        style={{
          position: 'absolute',
          left: this.props.size * this.props.row,
          top: this.props.size * this.props.col + window.innerHeight / 10,
          width: this.props.size,
          height: this.props.size,
          backgroundColor: this.props.alive && "#000000"}} />
    )
  }
}

export default Cell;
