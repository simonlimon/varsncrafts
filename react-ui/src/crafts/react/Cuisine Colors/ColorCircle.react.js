import React from 'react'
//TODO Add automatic crawling
//TODO Add option to go to wikipedia articles

class ColorCircle extends React.Component {
  showImage = () => {
    this.setState({showImage: true})
  }

  hideImage = () => {
    this.setState({showImage: false})    
  }

  render() {
    return (
      <div>
        <a
          onMouseEnter={this.showImage}
          onMouseLeave={this.hideImage}
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
        {this.state && this.state.showImage && 
          <img 
            src={this.props.href} 
            style={{
              width: this.props.radius * 3,
              height: this.props.radius * 3,
              borderRadius: '50%',
              position: 'absolute',
              left: window.innerWidth/2 - this.props.radius * 3/2,
              top: window.innerHeight/2 - this.props.radius * 3/2
            }}
          />
        }
      </div>
    );
  }

}

export default ColorCircle;