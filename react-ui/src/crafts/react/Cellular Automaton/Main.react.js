import React from 'react';
import Cell from './Cell.react';
import { Button } from 'semantic-ui-react';

// TODO better resize (don't clear everything)
// TODO implement dropdown menu for settings
// TODO implement generation #
// TODO fix performance (more)

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: 0,
      rows: 0,
      cellMatrix: [],
      isRunning: false
    };
  }

  updateDimensions = () => {
    console.log("BLAAAA");
    let cellMatrix = [];
    const cols = window.innerWidth / 20;
    const rows = window.innerHeight / 20;
    for (let i = 0; i < cols; i++) {
      cellMatrix.push([]);
      for (let j = 0; j < rows; j++) {
        cellMatrix[i].push({alive: false, neighbors: 0});
      }
    }
    this.setState({rows: rows, cols: cols, cellMatrix: cellMatrix});
  }

  componentWillMount() {
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
          if (cell.alive && (cell.neighbors < 2 || cell.neighbors > 3)) {
            cell.alive = false;
          } else if (!cell.alive && cell.neighbors === 3) {
            cell.alive = true;
          }
        })
        });
      this.forceUpdate();
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
            height: window.innerHeight / 10,
            backgroundColor: "#D3D3D3"}}
        >
        <Button
        style={{
          position: 'absolute',
          left: 100,
          top: 20,
        }}
          size='large'
          icon={this.state.isRunning && "stop" || "play"}
          className="play_button"
          onClick={() => {
            if (!this.state.isRunning) {
              this.setState({isRunning: setInterval(function(e) {e.evolve(); }, 150, this)});
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
            !this.state.isRunning && this.cellMatrix.map((row, i) => {
              return row.map((cell, j) => {
                cell.alive = false;
              })
            });
            this.forceUpdate();
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
            this.forceUpdate();
          }}
        />
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
