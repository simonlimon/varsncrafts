import React, {
  PropTypes,
} from 'react';

import {Grid, GridColumn, CardGroup} from 'semantic-ui-react'

import Title from './Title'
import CraftCard from './CraftCard'

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black',
]

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
  )
}

const Home = React.createClass({
  render() {
    return (
      <div>
        <Title/>
        <Grid columns={4} padded={true} centered>
          {crafts.map(generate_card)}
        </Grid>
      </div>
    );
  }
});

export default Home;
