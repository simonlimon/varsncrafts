import React from 'react';
import {CardGroup, Button} from 'semantic-ui-react'

import Title from './Title.react'
import CraftCard from './CraftCard.react'

const req = require.context('../crafts/', true, /\/.+\/_info\.json$/);

class Home extends React.PureComponent {
  constructor() {
    super();
    this.bouncingCardIndex = Math.floor(
      Math.random() * req.keys().length
    );
  }

  _generateCard = (craftPath, i) => {
    const craft = req(craftPath);
    return (
      <CraftCard image={process.env.PUBLIC_URL + craft.image}
                 title={craft.title}
                 keywords={craft.keywords}
                 description={craft.description}
                 key={craft.title}
                 date={craft.date}
                 timestamp={craft.timestamp}
                 bouncing={this.bouncingCardIndex === i}
                 type={craft.type}/>
    );
  }

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
          {req.keys().map(this._generateCard).sort((craftA, craftB) =>
            craftB.props.timestamp.localeCompare(craftA.props.timestamp)
          )}
        </CardGroup>
      </div>
    );
  }
}

export default Home;
