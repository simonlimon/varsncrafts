import React, {
  PropTypes,
} from 'react';

import { Header, Icon, Container, Grid} from 'semantic-ui-react'

const Title = React.createClass({
  render() {
    return (
      <Container className="main_title">
        <Header as='h1' icon textAlign='center'>
          <Icon name='hand peace' circular/>
          <Header.Content>
            Vars & Crafts
          </Header.Content>
        </Header>
      </Container>
    );
  }
});

export default Title;
