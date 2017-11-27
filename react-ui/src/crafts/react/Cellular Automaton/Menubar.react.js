import React from 'react';
import { Button, Label, Menu, Sidebar } from 'semantic-ui-react';

class Menubar extends React.Component {

  render() {
    return (
      <Sidebar as={Menu} animation='push' direction='top' visible={true} stackable={true}>
        <Menu.Item name='play'>
          <Button.Group basic>
          <Button
            icon={(this.props.isRunning && "stop") || "play"}
            onClick={this.props.play}
          />
          <Button
            icon='step forward'
            onClick={this.props.step}
          />
          <Button
            icon='erase'
            onClick={this.props.clear}
          />
          <Button
            icon='random'
            onClick={this.props.randomize}
          />
          </Button.Group>
        </Menu.Item>
        <Menu.Item name='birthRules'>
          <Label basic color='olive' horizontal>Birth:</Label>
          <Button.Group>
            {this.props.birthRules.map((rule, i) =>
              <Button
                color={(rule && 'green') || 'red'}
                content={i}
                key={i}
                onClick={() => this.props.setBirthRule(i, rule)}
              />
            )}
          </Button.Group>
        </Menu.Item>
        <Menu.Item name='survivalRules'>
          <Label basic color='olive' horizontal>Survival:</Label>
          <Button.Group>
            {this.props.survivalRules.map((rule, i) =>
              <Button
                color={(rule && 'green') || 'red'}
                content={i}
                key={i}
                onClick={() => this.props.setSurvivalRule(i, rule)}
              />
            )}
          </Button.Group>
        </Menu.Item>
        <Menu.Item name='generation'>
          <Label content={"Generation: 0"} />
        </Menu.Item>
      </Sidebar>
    )
  }
}

export default Menubar;
