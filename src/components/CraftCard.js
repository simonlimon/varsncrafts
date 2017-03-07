import React from 'react';

import { Card } from 'semantic-ui-react'
import {Link} from 'react-router'

const CraftCard = React.createClass({
  render() {
    return (
      <div>
        <Link to={"/craft/" + this.props.title}>
          <Card
            link
            image={this.props.image}
            header={this.props.title}
            extra={this.props.keywords}
            description={this.props.description}
            meta={this.props.date}
            centered/>
        </Link>
      </div>
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
