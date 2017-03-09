import React, {
  PropTypes,
} from 'react';

import { Header, Icon} from 'semantic-ui-react'

const Title = React.createClass({
  componentDidMount () {
    var that = this;
    window.setTimeout(function () {
      this.interval = window.setInterval(function(){
        that.setState ({
          text_index: that.state.text_index + 1
        });

        if (that.state.index == 'Vars & Crafts'.length)
          window.clearInterval(that.interval)

      }, 77);
    }, 100)

  },
  getInitialState() {
    return {
      text_index: 1
    }
  },
  render() {
    return (
        <Header as='h1' icon textAlign='center' className='title'>
          <Icon name='hand peace' circular/>
          <Header.Content>
            {'Vars & Crafts'.substring(0, this.state.text_index)}
          </Header.Content>
        </Header>
    );
  }
});

export default Title;
