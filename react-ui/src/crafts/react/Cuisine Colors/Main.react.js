import React from 'react';
import Axios from 'axios';
import Chroma from 'chroma-js';
import ColorCircle from './ColorCircle.react';
import ColorWheel from './ColorWheel.react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const CUISINES = [
  { value: 'Italian', label: 'Italian' },
  { value: 'Moroccan', label: 'Moroccan' },
  { value: 'Chinese', label: 'Chinese' }
];

class Main extends React.Component {
  constructor() {
    super();
    this.setState({ selectedCuisine: null });
  }

  // ----- Helpers  -----

  updateDimensions = () => {
    this.setState(prevState => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        colors: prevState.colors
      };
    });
  };

  sortColors(colorArray) {
    return colorArray.sort(function(colorA, colorB) {
      return colorA[1].lch()[0] - colorB[1].lch()[0];
    });
  }

  onSelectCuisine = cuisine => {
    console.log(cuisine.value);
    this.setState({
      selectedCuisine: cuisine.value
    });
    this.fetchCuisineColors(cuisine.value);
  };

  fetchCuisineColors(cuisine) {
    Axios.get('/api/cuisine_colors/' + cuisine).then(result => {
      // console.log(result.data)

      // move colors into array
      let colors = [];
      Object.keys(result.data).map(image => {
        colors = colors.concat(
          result.data[image].slice(0, 3).map(color => {
            return [
              image,
              Chroma(
                color.color.red,
                color.color.green,
                color.color.blue
              ).alpha(0.75)
            ];
          })
        );
      });

      //sort
      colors = this.sortColors(colors);
      this.setState({ colors });
      this.updateDimensions();
    });
  }

  // ----- Component life cycle -----

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          verticalAlign: 'middle',
          fontSize: '1.5em'
        }}
      >
        <ColorWheel
          colors={this.state.colors}
          center_x={this.state.width / 2}
          center_y={this.state.height / 2}
          radius={this.state.height / 4}
          subcircle_radius={this.state.height / 10}
        />

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: this.state.height / 4
          }}
        >
          <Select
            clearable={false}
            name="form-field-name"
            value={this.state.selectedCuisine}
            options={CUISINES}
            onChange={this.onSelectCuisine}
          />
        </div>
      </div>
    );
  }
}

export default Main;
