import React from 'react';

import {Modal, Button} from 'semantic-ui-react'
const About = React.createClass({
  getInitialState () {
    return { modalOpen: false }
  },

  handleOpen () {
    this.setState({
      modalOpen: true
    })
  },

  handleClose () {
    this.setState({
      modalOpen: false
    })
  },

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}
                         floated="right"
                         icon="info"
                         compact circular basic className="info"/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        closeIcon='close'>

        <Modal.Content>
          <h1> </h1>
          <h4> Hi! This website is my personal playground. Every week-or-so I upload a new <i>craft</i>. These usually include:
            <ul>
              <li>A Fun and interesting underlying concept</li>
              <li>Cool visuals</li>
              <li>Some kind of message</li>
            </ul>
            I hope they stir your curiosity and creativity, and that your inner {require('../random_words.json')[Math.floor(Math.random()*567)]} is awaken. Have fun!
          </h4>
        </Modal.Content>

        <footer>© Simon Posada Fishman | All content published under an MIT License</footer>
      </Modal>
    );
  }
});

export default About;
