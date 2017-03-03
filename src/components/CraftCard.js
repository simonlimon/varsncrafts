import React, {
  PropTypes,
} from 'react';

import { Card, Icon } from 'semantic-ui-react'
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
          meta={this.props.keywords}
          description={this.props.description}
          />
        </Link>
      </div>
    );
  }
});

CraftCard.propTypes = {
  image: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  keywords: React.PropTypes.string.isRequired,
  description:  React.PropTypes.string.isRequired
};

export default CraftCard;
