import React from 'react'
//TODO Add automatic crawling
//TODO Add option to go to wikipedia articles

class ColorCircle extends React.Component {
  render() {
    return (
      <a
        href={this.props.href}
        style={{
          backgroundColor: this.props.color.css(),
          display: 'block',
          width: this.props.radius,
          height: this.props.radius,
          borderRadius: '50%',
          position: 'absolute',
          left: this.props.x,
          top: this.props.y
        }}
      />
    );
  }

}

export default ColorCircle;