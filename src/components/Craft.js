import React, {
  PropTypes,
} from 'react';
import p5 from "p5";

const Craft = React.createClass({
  componentDidMount() {
    var sketch = require('../crafts/' + this.props.params.title + '/main');
    this.craft = new p5(sketch.default, this.refs.wrapper)
  },
  render() {
    return (
      <div classID={this.props.params.title}></div>
    );
  },
  componentWillUnmount() {
    this.craft.remove()
  }
});

export default Craft;
