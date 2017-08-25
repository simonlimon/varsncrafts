import React from 'react';

import { Card } from 'semantic-ui-react'
import { Link } from 'react-router'
import anime from 'animejs'

class CraftCard extends React.PureComponent {
  static propTypes = {
    image: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    keywords: React.PropTypes.string.isRequired,
    description:  React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['p5', 'react'])
  };

  componentWillMount() {
    this.name = this.props.title.replace(/\s+/g, "")
  }

  componentDidMount() {
    var that = this;
    if (this.props.bouncing) {
      setTimeout(() => {
        this.anim = anime ({
          targets: '.' + that.name,
          easing: 'easeInElastic',
          translateY: [0, Math.random() * - 5 - 5],
          duration: Math.random() * 1300 + 900,
          loop: true,
          direction: 'alternate',
        })
      }, 2000)
    }
  }

  handleMouseEnter = () => {
    if (this.anim) {
      this.anim.pause()
    }
  };

  handleMouseLeave = () => {
    if (this.anim) {
      this.anim.play()
    }
  };

  render() {
    return (
        <Link to={"/crafts/" + this.props.type + '/' + this.props.title} className={"craft_card " + this.name}
              onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <Card
            raised
            link
            image={this.props.image}
            header={this.props.title}
            extra={this.props.keywords}
            description={this.props.description}
            meta={this.props.date}
            centered/>
        </Link>
    );
  }
}

export default CraftCard;
