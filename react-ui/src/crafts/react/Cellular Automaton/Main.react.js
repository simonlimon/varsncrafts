import React from 'react';
import CellGrid from './CellGrid.react';
import Menubar from './Menubar.react';
import { Sidebar } from 'semantic-ui-react';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survivalRules: [],
      birthRules: [],
      isRunning: false,
      generation: 0
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

  updateGeneration = () => {
    this.setState(prevState => {return {generation: prevState.generation + 1}});
  }

  resetGeneration = () => {
    this.setState({generation: 0});
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
            generation={this.state.generation}
          />
            <CellGrid
              isRunning={this.state.isRunning}
              birthRules={this.state.birthRules}
              survivalRules={this.state.survivalRules}
              ref={(grid) => { this.cellGrid = grid; }}
              updateGeneration={this.updateGeneration}
              resetGeneration={this.resetGeneration}
              size={20}
            />
        </Sidebar.Pushable>


      </div>
    )
  }
}

export default Main;
