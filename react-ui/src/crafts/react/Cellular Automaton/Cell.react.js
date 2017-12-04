import React from 'react';

class Cell extends React.Component {

  render() {
    return (
      <td>
      <div
        onMouseDown={this.props.handleClick}
        className="cell"
        style={{
          width: this.props.size,
          height: this.props.size,
          backgroundColor: this.props.alive && "#000000"}} />
      </td>
    )
  }
}

export default Cell;
