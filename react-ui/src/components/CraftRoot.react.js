import React from 'react';
import anime from "animejs";
import {Button, Modal} from 'semantic-ui-react'
import P5Craft from './craft_containers/P5Craft.react'
import ReactCraft from './craft_containers/ReactCraft.react'

//TODO Preserve home scroll

class CraftRoot extends React.PureComponent {

  componentWillMount () {
    switch (this.props.params.type) {
      case 'p5':
        this.craft = <P5Craft title={this.props.params.title}/>;
        return;
      case 'react':
        this.craft = <ReactCraft title={this.props.params.title}/>;
        return;
      default:
        return;
    }
  }

  componentDidMount () {
    anime({
      targets: '.craft',
      scale: [0.9, 1],
      easing: 'easeOutQuad',
      duration: 500,
    })
  }

  handleClose = () => {
    this.props.router.push('/');
  };

  render() {
    const modalButton = (
      <Button
        floated="right"
        icon="info"
        circular
        className="info_button"/>
    );
    return (
      <div className="craft">
        {this.craft}
        <Button
          floated="left"
          icon="close"
          circular
          className="close_button"
          onClick={this.handleClose}/>
        <Modal trigger={modalButton} dimmer="inverted">
          <Modal.Header>{this.props.params.title}</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default CraftRoot;
