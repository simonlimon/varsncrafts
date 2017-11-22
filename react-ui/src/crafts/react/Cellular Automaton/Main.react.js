import React from 'react';
import Cell from './Cell.react';
import { Button, Modal } from 'semantic-ui-react';

// TODO better resize (don't clear everything)
// TODO implement bar at top with buttons: one step, one play

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: 0,
      rows: 0,
      aliveMatrix: [],
      isRunning: false
    };
  }

  updateDimensions = () => {
    console.log("BLAAAA");
    let aliveMatrix = [];
    const cols = window.innerWidth / 20;
    const rows = window.innerHeight / 20;
    for (let i = 0; i < cols; i++) {
      aliveMatrix.push([]);
      for (let j = 0; j < rows; j++) {
        aliveMatrix[i].push(false);
      }
    }
    this.setState({rows: rows, cols: cols, aliveMatrix: aliveMatrix});
  }


  componentWillMount() {
    this.updateDimensions(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }


  countNeighbors(i,j) {
    let neighbors = 0;
    if (i > 0) {
      neighbors += Boolean(this.state.aliveMatrix[i-1][j-1])
                + Boolean(this.state.aliveMatrix[i-1][j])
                + Boolean(this.state.aliveMatrix[i-1][j+1])
    }
    neighbors += Boolean(this.state.aliveMatrix[i][j-1]) + Boolean(this.state.aliveMatrix[i][j+1])
    if (i < this.state.cols - 1) {
      neighbors += Boolean(this.state.aliveMatrix[i+1][j-1])
                + Boolean(this.state.aliveMatrix[i+1][j])
                + Boolean(this.state.aliveMatrix[i+1][j+1])
    }
    return neighbors;
  }

  evolve() {
    let neighbors = 0;
    return this.setState(prevState => ({
      aliveMatrix: prevState.aliveMatrix.map((row, i) => {
        return row.map((isAlive, j) => {
          neighbors = this.countNeighbors(i,j);
          if (isAlive && (neighbors < 2 || neighbors > 3)) {
            return false;
          } else if (!isAlive && neighbors === 3) {
            return true;
          }
          return isAlive;
        })
      })
    }));
  }

  render() {
    return (
      <div
        onKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return e.keyCode === 32 && this.evolve()}}
        tabIndex='0'
      >
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
              this.setState({isRunning: setInterval(function(e) {e.evolve(); }, 200, this)});
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
            !this.state.isRunning && this.setState(prevState => ({
              aliveMatrix: prevState.aliveMatrix.map((row, i) => {
                return row.map((isAlive, j) => {
                  return false;
                })
              })
            }));
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
            !this.state.isRunning && this.setState(prevState => ({
              aliveMatrix: prevState.aliveMatrix.map((row, i) => {
                return row.map((isAlive, j) => {
                  return Math.random() > 0.8;
                })
              })
            }));
          }}
        />
        </div>
        {this.state.aliveMatrix.map((row, i) =>
          this.state.aliveMatrix[i].map((isAlive, j) =>
            <Cell
              handleClick={() => {
                if (!this.state.isRunning) {
                  return this.setState(prevState => {
                    prevState.aliveMatrix[i][j] = !prevState.aliveMatrix[i][j];
                    return {aliveMatrix: prevState.aliveMatrix}});
                }
              }}
              size={20}
              alive={this.state.aliveMatrix[i][j]}
              row={i}
              col={j}/>
          )
        )}
      </div>
    )
  }
}

export default Main;
