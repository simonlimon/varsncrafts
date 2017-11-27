import React from 'react';
import CellGrid from './CellGrid.react';
import { Button, Label } from 'semantic-ui-react';

// TODO factor out code
// TODO make top bar prettier
// TODO add description and image
// TODO add speed slider


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survivalRules: [],
      birthRules: [],
      isRunning: false,
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
        <div
          style={{
            width: window.innerWidth,
            height: 75,
            backgroundColor: "#D3D3D3"}}
        >
        <Button
          style={{
            position: 'absolute',
            left: 100,
            top: 20,
          }}
          size='large'
          icon={(this.state.isRunning && "stop") || "play"}
          className="play_button"
          onClick={() => {
            if (!this.state.isRunning) {
              this.setState({isRunning: true});
            } else {
              this.setState({isRunning: false});
            }
          }}
        />
        <Button
          style={{
            position: 'absolute',
            left: 150,
            top: 20,
          }}
          size='large'
          icon='step forward'
          className="step_button"
          onClick={() => {!this.state.isRunning && this.cellGrid.evolve();}}
        />
        <Button
          style={{
            position: 'absolute',
            left: 200,
            top: 20,
          }}
          size='large'
          icon='erase'
          className="clear_button"
          onClick={() => {!this.state.isRunning && this.cellGrid.clear();}}
        />
        <Button
          style={{
            position: 'absolute',
            left: 250,
            top: 20,
          }}
          size='large'
          icon='random'
          className="random_button"
          onClick={() => {!this.state.isRunning && this.cellGrid.randomize();}}
        />
        <Label
          style={{
            position: 'absolute',
            left: 300,
            top: 24,
          }}
          content={"Generation: 0"}
        />
        <Button.Group
          style={{
            position: 'absolute',
            left: 400,
            top: 20,
          }}
        >
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
        </ Button.Group>
        <Button.Group
          style={{
            position: 'absolute',
            left: 880,
            top: 20,
          }}
        >
          {this.state.survivalRules.map((rule, i) =>
            <Button
              color={(rule && 'green') || 'red'}
              content={i}
              key={i}
              onClick={() => {this.setState(prevState => {
                prevState.survivalRules[i] = !rule;
                return {survivalRules: prevState.survivalRules};
              })}}
            />
          )}
        </ Button.Group>
        </div>
        <CellGrid
          isRunning={this.state.isRunning}
          birthRules={this.state.birthRules}
          survivalRules={this.state.survivalRules}
          ref={(input) => { this.cellGrid = input; }}
        />
      </div>
    )
  }
}

export default Main;
