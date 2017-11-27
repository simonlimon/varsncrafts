import React from 'react';
import CellGrid from './CellGrid.react';
import { Button, Label, Menu, Sidebar } from 'semantic-ui-react';

// TODO place cell grid correctly within its div (and get it pushed down correctly)
// TODO factor out top bar and clean up (play button and generation # visible)
// TODO pass generation up from cellGrid
// TODO toggle visibility of top bar on low resolution & center buttons
// TODO add description and image
// TODO add speed slider

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survivalRules: [],
      birthRules: [],
      isRunning: false
    };
  }

  componentWillMount() {
    this.setState({
      birthRules: [false, false, false, true, false, false, false, false, false],
      survivalRules: [false, false, true, true, false, false, false, false, false]
    })
  }

  render() {
    return (
      <div>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='push' direction='top' visible={true} stackable={true}>
            <Menu.Item name='play'>
              <Button.Group basic>
              <Button
                icon={(this.state.isRunning && "stop") || "play"}
                onClick={() => {
                  if (!this.state.isRunning) {
                    this.setState({isRunning: true});
                  } else {
                    this.setState({isRunning: false});
                  }
                }}
              />
              <Button
                icon='step forward'
                onClick={() => {!this.state.isRunning && this.cellGrid.evolve();}}
              />
              <Button
                icon='erase'
                onClick={() => {!this.state.isRunning && this.cellGrid.clear();}}
              />
              <Button
                icon='random'
                onClick={() => {!this.state.isRunning && this.cellGrid.randomize();}}
              />
              </Button.Group>
            </Menu.Item>
            <Menu.Item name='birthRules'>
              <Label basic color='olive' horizontal>Birth:</Label>
              <Button.Group>
                {this.state.birthRules.map((rule, i) =>
                  <Button
                    color={(rule && 'green') || 'red'}
                    content={i}
                    key={i}
                    onClick={() => {this.setState(prevState => {
                      prevState.birthRules[i] = !rule;
                      return {birthRules: prevState.birthRules};
                    })}} />
                )}
              </Button.Group>
            </Menu.Item>
            <Menu.Item name='survivalRules'>
              <Label basic color='olive' horizontal>Survival:</Label>
              <Button.Group>
                {this.state.survivalRules.map((rule, i) =>
                  <Button
                    color={(rule && 'green') || 'red'}
                    content={i}
                    key={i}
                    onClick={() => {this.setState(prevState => {
                      prevState.survivalRules[i] = !rule;
                      return {survivalRules: prevState.survivalRules};
                    })}} />
                )}
              </Button.Group>
            </Menu.Item>
            <Menu.Item name='generation'>
              <Label content={"Generation: 0"} />
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <CellGrid
              isRunning={this.state.isRunning}
              birthRules={this.state.birthRules}
              survivalRules={this.state.survivalRules}
              ref={(input) => { this.cellGrid = input; }}
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Main;
