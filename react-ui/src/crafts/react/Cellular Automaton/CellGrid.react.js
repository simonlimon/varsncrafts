import React from 'react';
import Cell from './Cell.react';

class CellGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: 0,
      rows: 0,
      cellMatrix: []
    };
  }

  updateDimensions = () => {
    let cellMatrix = [];
    const cols = window.innerWidth / this.props.size;
    const rows = window.innerHeight / this.props.size;
    for (let i = 0; i < rows; i++) {
      cellMatrix.push([]);
      let wasCol = this.state.cellMatrix[i];
      for (let j = 0; j < cols; j++) {
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
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  inGrid(i,j) {
    return i >= 0 && i < this.state.rows && j >= 0 && j < this.state.cols;
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

  clickCell(i,j) {
    this.setState(prevState => {
      prevState.cellMatrix[i][j].alive = !prevState.cellMatrix[i][j].alive;
      return {cellMatrix: prevState.cellMatrix};
    });
  }

  evolve() {
    this.setState(prevState => {
      this.state.cellMatrix.forEach((row, i) => {
        row.forEach((cell, j) => {
          cell.neighbors = this.countNeighbors(i,j);
        }, this);
      }, this);

      this.state.cellMatrix.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell.alive && !this.props.survivalRules[cell.neighbors]) {
            cell.alive = false;
          } else if (!cell.alive && this.props.birthRules[cell.neighbors]) {
            cell.alive = true;
          }
        }, this)
      }, this);

      return {cellMatrix: prevState.cellMatrix};
    })

    this.props.updateGeneration();
  }

  clear() {
    this.setState(prevState => {
      this.state.cellMatrix.forEach((row, i) => {
        row.forEach((cell, j) => {
          cell.alive = false;
        }, this)
      }, this);
      return {cellMatrix: prevState.cellMatrix};
    })

    this.props.resetGeneration();
  }

  randomize() {
    this.setState(prevState => {
      prevState.cellMatrix.forEach((row, i) => {
        row.forEach((cell, j) => {
          cell.alive = Math.random() > 0.8;
        }, this)
      }, this);
      return {cellMatrix: prevState.cellMatrix};
    })

    this.props.resetGeneration();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isRunning && !this.props.isRunning) {
      this.interval = setInterval(function(e) {e.evolve(); }, 100, this);
    } else if (!nextProps.isRunning && this.props.isRunning) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div>
        <table
          width="100%"
          height="100%">
          <tbody>
            {this.state.cellMatrix.map((row, i) =>
              <tr key={i}>
                {this.state.cellMatrix[i].map((cell, j) =>
                  <Cell
                    handleClick={() => { !this.props.isRunning
                                         && this.clickCell(i,j); }}
                    size={this.props.size}
                    alive={this.state.cellMatrix[i][j].alive}
                    key={i * this.state.cols + j}/>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CellGrid;
