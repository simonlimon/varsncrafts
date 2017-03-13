import React from 'react';

import {CardGroup, Button} from 'semantic-ui-react'

import Title from './Title'
import CraftCard from './CraftCard'

//noinspection JSUnresolvedFunction
const crafts = require('../crafts.json');

const bouncing_card = Math.floor(Math.random() * Object.keys(crafts).length);

function generate_card(craft, i) {
  return (
      <CraftCard image={process.env.PUBLIC_URL + craft.image}
                 title={craft.title}
                 keywords={craft.keywords}
                 description={craft.description}
                 key={craft.title}
                 date={craft.date}
                 bouncing={bouncing_card === i}
      />
  );
}

const Home = React.createClass({
  render() {
    //noinspection JSUnresolvedFunction
    return (
      <div>
        <div className="site_header">
          <Button onClick={window.show_modal}
                  floated="right"
                  icon="info"
                  compact circular basic className="info"/>
          <Title/>
        </div>
        <CardGroup stackable className={"centered crafts"}>
          {crafts.map(generate_card)}
        </CardGroup>
      </div>
    );
  }
});

export default Home;
