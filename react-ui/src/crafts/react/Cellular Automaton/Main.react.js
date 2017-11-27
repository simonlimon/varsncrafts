import React from 'react';
import CellGrid from './CellGrid.react';
import Menubar from './Menubar.react';
import { Sidebar } from 'semantic-ui-react';

// TODO place cell grid correctly within its div (and get it pushed down correctly)
// TODO clean up top bar (play button and generation # visible)
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

  setBirthRule = (i, rule) => {
    this.setState(prevState => {
      prevState.birthRules[i] = !rule;
      return {birthRules: prevState.birthRules};
    });
  }

  setSurvivalRule = (i, rule) => {
    this.setState(prevState => {
      prevState.survivalRules[i] = !rule;
      return {survivalRules: prevState.survivalRules};
    });
  }

  render() {
    return (
      <div>
        <Sidebar.Pushable>
          <Menubar
            isRunning={this.state.isRunning}
            birthRules={this.state.birthRules}
            survivalRules={this.state.survivalRules}
            play={() => {this.setState({isRunning: !this.state.isRunning});}}
            step={() => {!this.state.isRunning && this.cellGrid.evolve();}}
            clear={() => {!this.state.isRunning && this.cellGrid.clear();}}
            randomize={() => {!this.state.isRunning && this.cellGrid.randomize();}}
            setBirthRule={this.setBirthRule}
            setSurvivalRule={this.setSurvivalRule}
          />
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
