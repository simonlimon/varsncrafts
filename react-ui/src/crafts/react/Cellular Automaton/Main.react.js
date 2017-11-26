import React from 'react';
import Cell from './Cell.react';
import { Button, Label } from 'semantic-ui-react';

// TODO make top bar prettier
// TODO add description and image
// TODO deal with warnings for maps


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: 0,
      rows: 0,
      cellMatrix: [],
      survivalRules: [],
      birthRules: [],
      isRunning: false,
      generation: 0,
    };
  }

  updateDimensions = () => {
    let cellMatrix = [];
    const cols = window.innerWidth / 20;
    const rows = (window.innerHeight - 75) / 20;
    for (let i = 0; i < cols; i++) {
      cellMatrix.push([]);
      let wasCol = this.state.cellMatrix[i];
      for (let j = 0; j < rows; j++) {
        if (wasCol && this.state.cellMatrix[i][j]) {
          cellMatrix[i].push(this.state.cellMatrix[i][j]);
        } else {
          cellMatrix[i].push({alive: false, neighbors: 0});
        }
      }
    }
    this.setState({rows: rows, cols: cols, cellMatrix: cellMatrix});
  }

  componentWillMount() {
    this.setState({
      birthRules: [false, false, false, true, false, false, false, false, false],
      survivalRules: [false, false, true, true, false, false, false, false, false]
    })
    this.updateDimensions(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  inGrid(i,j) {
    return i >= 0 && i < this.state.cols && j >= 0 && j < this.state.rows;
  }

  countNeighbors(col,row) {
    let neighbors = 0;
    for (var i = col - 1; i < col + 2; i++) {
      for (var j = row - 1; j < row + 2; j++) {
        if (this.inGrid(i,j)) {
          neighbors += this.state.cellMatrix[i][j].alive
        }
      }
    }
    return neighbors - this.state.cellMatrix[col][row].alive;
  }

  evolve() {
    this.state.cellMatrix.map((row, i) => {
      row.map((cell, j) => {
        cell.neighbors = this.countNeighbors(i,j);
      })
    });

    this.state.cellMatrix.map((row, i) => {
      row.map((cell, j) => {
        if (cell.alive && !this.state.survivalRules[cell.neighbors]) {
          cell.alive = false;
        } else if (!cell.alive && this.state.birthRules[cell.neighbors]) {
          cell.alive = true;
        }
      })
    });

    this.setState(prevState => {
      prevState.generation += 1;
      return {generation: prevState.generation};
    });
  }

  render() {
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
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
              this.setState({isRunning: setInterval(function(e) {e.evolve(); }, 100, this)});
            } else {
              clearInterval(this.state.isRunning);
              this.setState({isRunning: null});
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
          onClick={() => {!this.state.isRunning && this.evolve();}}
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
          onClick={() => {
            !this.state.isRunning && this.state.cellMatrix.map((row, i) => {
              row.map((cell, j) => {
                cell.alive = false;
              })
            });
            this.setState({generation: 0});
          }}
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
          onClick={() => {
            !this.state.isRunning && this.state.cellMatrix.map((row, i) => {
              row.map((cell, j) => {
                cell.alive = Math.random() > 0.8;
              })
            });
            this.setState({generation: 0});
          }}
        />
        <Label
          style={{
            position: 'absolute',
            left: 300,
            top: 24,
          }}
          content={'Generation: ' + this.state.generation}
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
        {this.state.cellMatrix.map((row, i) =>
          this.state.cellMatrix[i].map((cell, j) =>
            <Cell
              handleClick={() => {
                !this.state.isRunning && this.setState(prevState => {
                    prevState.cellMatrix[i][j].alive = !prevState.cellMatrix[i][j].alive;
                    return {cellMatrix: prevState.cellMatrix}});
              }}
              size={20}
              alive={this.state.cellMatrix[i][j].alive}
              row={i}
              col={j}/>
          )
        )}
      </div>
    )
  }
}

export default Main;
