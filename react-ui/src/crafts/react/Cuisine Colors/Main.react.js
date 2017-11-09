import React from 'react'
import Axios from 'axios'
//TODO Add automatic crawling
//TODO Add option to go to wikipedia articles

class Main extends React.Component {
  constructor() {
    super();
    this.state = { 'images': [] }
  }

  componentWillMount() {
    const term = 'italian'
    const that = this
    Axios.get('/api/cuisine_colors/' + term).then(function (result) {
      console.log(result)
      that.setState(result.data)
    });
  }

  render() {
    return (
      <div>
        {this.state.images.map(image => 
          <div key={image.url}> {image.url} </div>
        )}
      </div>
    );
  }

}

export default Main;