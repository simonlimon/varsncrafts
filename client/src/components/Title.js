import React, {
  PropTypes,
} from 'react';

import { Header, Icon} from 'semantic-ui-react'

const Title = React.createClass({
  componentWillUnmount() {
    window.clearInterval(this.interval)
  },
  componentDidMount () {
    var that = this;
    window.setTimeout(function () {
      that.interval = window.setInterval(function(){
        that.setState ({
          text_index: that.state.text_index + 1
        });

        if (that.state.index == 'Vars & Crafts'.length)
          window.clearInterval(that.interval)

      }, 77);
    }, 100)
  },
  getInitialState() {
    if (!window.didAnimateTitle) {
      window.didAnimateTitle = true;
      return {
        text_index: 1
      }
    } else {
      return {
        text_index: 'Vars & Crafts'.length
      }
    }

  },
  render() {
    return (
        <Header as='h1' icon textAlign='center'>
          <Icon name='hand peace' circular/>
          <Header.Content>
            {'Vars & Crafts'.substring(0, this.state.text_index)}
          </Header.Content>
        </Header>
    );
  }
});

export default Title;
