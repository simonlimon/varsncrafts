import React from 'react';
import CellGrid from './CellGrid.react';
import Menubar from './Menubar.react';
import { Sidebar } from 'semantic-ui-react';

// TODO place cell grid correctly within its div (and get it pushed down correctly)
// TODO make dropdown for birth/survival rules
// TODO pass generation up from cellGrid
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
            generation={0}
          />
            <CellGrid
              isRunning={this.state.isRunning}
              birthRules={this.state.birthRules}
              survivalRules={this.state.survivalRules}
              ref={(grid) => { this.cellGrid = grid; }}
              size={20}
            />
        </Sidebar.Pushable>


      </div>
    )
  }
}

export default Main;
