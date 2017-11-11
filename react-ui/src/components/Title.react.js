import React from 'react';

import { Header, Icon } from 'semantic-ui-react';

class Title extends React.Component {
  constructor(props) {
    super(props);

    if (!window.didAnimateTitle) {
      window.didAnimateTitle = true;
      this.state = {
        text_index: 1
      };
    } else {
      this.state = {
        text_index: 'Vars & Crafts'.length
      };
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  componentDidMount() {
    var that = this;
    window.setTimeout(function() {
      that.interval = window.setInterval(function() {
        that.setState({
          text_index: that.state.text_index + 1
        });

        if (that.state.index === 'Vars & Crafts'.length)
          window.clearInterval(that.interval);
      }, 77);
    }, 100);
  }

  render() {
    return (
      <Header as="h1" icon textAlign="center">
        <Icon name="hand peace" circular />
        <Header.Content>
          {'Vars & Crafts'.substring(0, this.state.text_index)}
        </Header.Content>
      </Header>
    );
  }
}

export default Title;
