import React from 'react';
import { Button, Label, Menu, Sidebar } from 'semantic-ui-react';

class Menubar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rules: 'Birth' };
  }

  changeRules = () => {
    this.setState(prevState => {
      if (prevState.rules === 'Birth') {
        return {rules: 'Survival'};
      }
      return {rules: 'Birth'};
    });
  }

  showBirthRules() {
    return this.props.birthRules.map((rule, i) =>
      <Button
        color={(rule && 'green') || 'red'}
        content={i}
        key={i}
        onClick={() => this.props.setBirthRule(i, rule)}
      />
    );
  }

  showSurvivalRules() {
    return this.props.survivalRules.map((rule, i) =>
      <Button
        color={(rule && 'green') || 'red'}
        content={i}
        key={i}
        onClick={() => this.props.setSurvivalRule(i, rule)}
      />
    );
  }

  render() {
    return (
      <Sidebar as={Menu} animation='push' direction='top' visible={true}>
        <Menu.Item style={{width:50}} />
        <Menu.Item name='controls'>
          <Button.Group basic>
            <Button
              icon={(this.props.isRunning && "stop") || "play"}
              onClick={this.props.play} />
            <Button
              icon='step forward'
              onClick={this.props.step} />
            <Button
              icon='erase'
              onClick={this.props.clear} />
            <Button
              icon='random'
              onClick={this.props.randomize} />
          </Button.Group>
        </Menu.Item>
        <Menu.Item name='rules'>
          <Label basic pointing='right'>Neighbors needed for:</Label>
          <Button.Group>
            <Button
              content={this.state.rules}
              onClick={this.changeRules}/>
            {(this.state.rules === 'Birth' && this.showBirthRules())
                                           || this.showSurvivalRules()}
          </Button.Group>
        </Menu.Item>
        <Menu.Item name='generation'>
          <Label content={"Generation: " + this.props.generation} />
          <div style={{width:50}} />
        </Menu.Item>
      </Sidebar>
    )
  }
}

export default Menubar;
