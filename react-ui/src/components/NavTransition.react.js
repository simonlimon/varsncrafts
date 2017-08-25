import React from 'react';
import { RouteTransition } from 'react-router-transition';

class NavTransition extends React.PureComponent {
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
}

export default NavTransition;
