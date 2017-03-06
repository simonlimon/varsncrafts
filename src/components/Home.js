import React from 'react';

import {Grid, GridColumn, Container, CardGroup} from 'semantic-ui-react'

import Title from './Title'
import CraftCard from './CraftCard'

//noinspection JSUnresolvedFunction
const crafts = require('../crafts.json');

function generate_card(craft) {
  return (
      <CraftCard image={process.env.PUBLIC_URL + craft.image}
                 title={craft.title}
                 keywords={craft.keywords}
                 description={craft.description}
                 key={craft.title}
      />
  );
}

const Home = React.createClass({
  render() {
    //noinspection JSUnresolvedFunction
    return (
      <div>
        <Title/>
        <CardGroup stackable className={"centered padded"}>
          {crafts.map(generate_card)}
        </CardGroup>
      </div>
    );
  }
});

export default Home;
