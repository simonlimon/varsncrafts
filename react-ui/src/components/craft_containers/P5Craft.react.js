import React from 'react';
import p5 from 'p5';
import $ from 'jquery';

//TODO Better back button
//TODO Preserve home scroll

class P5Craft extends React.PureComponent {
  componentDidMount() {
    var sketch = require('../../crafts/p5/' + this.props.title + '/Main');
    //noinspection JSPotentiallyInvalidConstructorUsage
    this.craft = new p5(sketch.default);
  }

  componentWillUnmount() {
    if (this.craft.interval) {
      clearInterval(this.craft.interval);
    }
    $('.incoming.year').remove();
    $('.ui.circle').remove();
    this.craft.remove();
  }

  render() {
    return <div id="sketch" />;
  }
}

export default P5Craft;
