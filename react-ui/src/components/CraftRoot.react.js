import React from 'react';
import anime from "animejs";
import {Button} from 'semantic-ui-react'
import P5Craft from './craft_containers/P5Craft.react'

//TODO Better back button
//TODO Preserve home scroll

class CraftRoot extends React.PureComponent {

  componentWillMount () {
    switch (this.props.params.type) {
      case 'p5':
        this.craft = <P5Craft title={this.props.params.title}/>
    }
  }

  handleClose = () => {
    this.props.router.push('/');
  };

  render() {
    return (
      <div className="craft">
        <Button floated="left" icon={"close"} circular className={"close_button"} onClick={this.handleClose}/>
        {this.craft}
      </div>
    );
  }
}

export default CraftRoot;
