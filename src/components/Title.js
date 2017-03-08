import React, {
  PropTypes,
} from 'react';

import { Header, Icon} from 'semantic-ui-react'

const Title = React.createClass({
  componentDidMount () {
    var that = this;
    window.setInterval(function(){
      that.setState ({
          text: 'Vars & Crafts',
          index: that.state.index += 1
      })
    }, 50);
  },
  getInitialState() {
    return {
      text: 'Vars & Crafts',
      index: 1
    }
  },
  render() {
    return (
        <Header as='h1' icon textAlign='center' className='title'>
          <Icon name='hand peace' circular/>
          <Header.Content>
            {this.state.text.substring(0, this.state.index)}
          </Header.Content>
        </Header>
    );
  }
});

export default Title;
