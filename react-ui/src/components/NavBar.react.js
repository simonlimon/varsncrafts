import React from 'react';
import { RouteTransition } from 'react-router-transition';


const NavBar = React.createClass({
  getInitialState() {
    return {hidden: false}
  },
  toggleHidden() {
    this.setState({
      hidden: !this.state.hidden
    })
  },
  render() {
    return (
      <div>
        <RouteTransition
          pathname={this.props.location.pathname}
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          runOnMount={false}
        >
          {this.props.children}
        </RouteTransition>
      </div>
    );
  }
});

export default NavBar;
