import React from 'react'

class ReactCraft extends React.PureComponent {
  componentWillMount() {
    this.CraftClass = require('../../crafts/react/' + this.props.title + '/Main.react');
  }

  render() {
    const CraftComponent = this.CraftClass.default;
    return <CraftComponent/>;
  }
}

export default ReactCraft;
