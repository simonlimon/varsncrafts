import React from 'react';

import { Card } from 'semantic-ui-react'
import { Link } from 'react-router'
import anime from 'animejs'

const CraftCard = React.createClass({
  componentWillMount() {
    this.name = this.props.title.replace(/\s+/g, "")
    console.log(this.name)
  },
  componentDidMount() {
    this.anim = anime ({
      targets: '.' + this.name,
      translateY: Math.random() * 3 + 3,
      duration: Math.random() * 1300 + 900,
      loop: true,
      direction: 'alternate',
    })
  },
  handleMouseEnter () {
    this.anim.pause()
  },
  handleMouseLeave() {
    this.anim.play()
  },
  render() {
    return (
        <Link to={"/craft/" + this.props.title} className={"craft_card " + this.name}
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
});

CraftCard.propTypes = {
  image: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  keywords: React.PropTypes.string.isRequired,
  description:  React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
};

export default CraftCard;
