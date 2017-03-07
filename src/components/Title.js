import React, {
  PropTypes,
} from 'react';

import { Header, Icon} from 'semantic-ui-react'

const Title = React.createClass({
  render() {
    return (
        <Header as='h1' icon textAlign='center'>
          <Icon name='hand peace' circular/>
          <Header.Content>
            Vars & Crafts
          </Header.Content>
        </Header>
    );
  }
});

export default Title;
