import React from 'react';
import Anime from 'animejs';
//TODO Add automatic crawling
//TODO Add option to go to wikipedia articles

class ColorCircle extends React.Component {
  showImage = () => {
    this.setState({ showImage: true });
  };

  hideImage = () => {
    this.setState({ showImage: false });
  };

  componentDidMount() {
    const offset = this.props.anim.offset;
    const duration = this.props.anim.duration;
    const radius = this.props.radius;
    const targets = '#colorcircle' + offset;
    Anime({
      targets,
      width: radius,
      height: radius,
      offset,
      duration,
      easing: 'easeInQuad'
    });
  }

  render() {
    const imageLeft = window.innerWidth / 2 - this.props.radius * 3 / 2;
    const imageTop = window.innerHeight / 2 - this.props.radius * 3 / 2;
    return (
      <div>
        <a
          id={'colorcircle' + this.props.anim.offset}
          onMouseEnter={this.showImage}
          onMouseLeave={this.hideImage}
          href={this.props.href}
          style={{
            backgroundColor: this.props.color.css(),
            display: 'block',
            width: 0,
            height: 0,
            borderRadius: '50%',
            position: 'absolute',
            left: this.props.x,
            top: this.props.y
          }}
        />
        {this.state &&
          this.state.showImage && (
            <div
              style={{
                borderRadius: '50%',
                position: 'absolute',
                left: imageLeft,
                top: imageTop,
                overflow: 'hidden',
                width: this.props.radius * 3,
                height: this.props.radius * 3
              }}
            >
              <alt
                src={this.props.href}
                alt={'Image source: ' + this.props.href}
                style={{
                  height: '100%',
                  width: 'auto',
                  position: 'absolute',
                  left: 0
                }}
              />
            </div>
          )}
      </div>
    );
  }
}

export default ColorCircle;
