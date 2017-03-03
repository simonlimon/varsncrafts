import React from 'react';
import {Link} from 'react-router';
import { Menu, MenuItem, MenuHeader, Container, Icon} from 'semantic-ui-react'

const TitleBar = React.createClass({
  render() {
    return (
      <div>
        <Menu pointing secondary>
          <MenuItem header> <Icon name={"student"}/> Vars & Crafts </MenuItem>
          <MenuItem name='Home' active={this.props.location.pathname === '/events'} />
        </Menu>
        {this.props.children}
      </div>
    );
  }
});

export default TitleBar;
