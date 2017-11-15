import React from 'react';
import Cell from './Cell.react';
// TODO deal with resize
// TODO deal with cells slightly off screen (change cell dimentions?)
// TODO implement bar at top with buttons: one step, one play

class Main extends React.Component {
  constructor(props) {
    super(props);
    let aliveMatrix = [];
    const cols = window.innerWidth / 20;
    const rows = window.innerHeight / 20;
    for (let i = 0; i < cols; i++) { // best way to declare 50
      aliveMatrix.push([]);
      for (let j = 0; j < rows; j++) {
        aliveMatrix[i].push(false);
      }
    }
    this.state = {
      cols: cols,
      rows: rows,
      aliveMatrix: aliveMatrix
    };
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

  handleKey(e) {
    console.log("bla");
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
          return e.keyCode === 32 && this.handleKey(e)}}
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
        <button
          style={{
            position: 'absolute',
            left: 50,
            top: 20,
            width: 40,
            height: 40}}
          onMouseDown={() => this.handleKey()}>
          <img
            src={require('./step.jpg')}
            style={{
              height: '100%',
              width: 'auto',
              //position: 'absolute',
              //left: 0
            }}
          />
        </button>
        </div>
        {this.state.aliveMatrix.map((row, i) =>
          this.state.aliveMatrix[i].map((isAlive, j) =>
            <Cell
              handleClick={() => {
                return this.setState(prevState => {
                  prevState.aliveMatrix[i][j] = !prevState.aliveMatrix[i][j];
                  return {aliveMatrix: prevState.aliveMatrix}});
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
