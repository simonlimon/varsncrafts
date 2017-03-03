import React from 'react';

import {Grid, GridColumn} from 'semantic-ui-react'

import Title from './Title'
import CraftCard from './CraftCard'

//noinspection JSUnresolvedFunction
const crafts = require('../crafts.json');

function generate_card(craft) {
  return (
    <GridColumn key={craft.title}>
      <CraftCard image={process.env.PUBLIC_URL + craft.image}
                 title={craft.title}
                 keywords={craft.keywords}
                 description={craft.description}
      />
    </GridColumn>
  );
}

const Home = React.createClass({
  render() {
    //noinspection JSUnresolvedFunction
    return (
      <div>
        <Title/>
        <Grid columns={4} centered doubling padded={true}>
          {crafts.map(generate_card)}
        </Grid>
      </div>
    );
  }
});

export default Home;
