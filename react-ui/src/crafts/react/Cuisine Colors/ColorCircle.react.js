import React from 'react';
//TODO Add automatic crawling
//TODO Add option to go to wikipedia articles

class ColorCircle extends React.Component {
  showImage = () => {
    this.setState({ showImage: true });
  };

  hideImage = () => {
    this.setState({ showImage: false });
  };

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
        {this.state &&
          this.state.showImage && (
            <div>
              <img
                src={this.props.href}
                style={{
                  maxWidth: this.props.radius * 3,
                  maxHeight: this.props.radius * 3,
                  overflow: 'hidden',
                  borderRadius: '50%',
                  position: 'absolute',
                  left: window.innerWidth / 2 - this.props.radius * 3 / 2,
                  top: window.innerHeight / 2 - this.props.radius * 3 / 2
                }}
              />
            </div>
          )}
      </div>
    );
  }
}

export default ColorCircle;
