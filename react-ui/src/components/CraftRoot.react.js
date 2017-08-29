import React from 'react';
import anime from "animejs";
import {Button, Modal} from 'semantic-ui-react'
import P5Craft from './craft_containers/P5Craft.react'
import ReactCraft from './craft_containers/ReactCraft.react'

//TODO Preserve home scroll

class CraftRoot extends React.PureComponent {
  componentWillMount () {
    const craftType = this.props.params.type;
    const craftTitle = this.props.params.title;

    this.craftInfo =
      require('../crafts/' + craftType + '/' + craftTitle + '/_info.json');

    console.log(this.craftInfo);

    switch (craftType) {
      case 'p5':
        this.craft = <P5Craft title={craftTitle}/>;
        return;
      case 'react':
        this.craft = <ReactCraft title={craftTitle}/>;
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
        {this.craftInfo.instructions &&
          <Modal trigger={modalButton} dimmer="inverted">
            <Modal.Header>{this.props.params.title}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                {this.craftInfo.instructions}
              </Modal.Description>
            </Modal.Content>
          </Modal>}
      </div>
    );
  }
}

export default CraftRoot;
