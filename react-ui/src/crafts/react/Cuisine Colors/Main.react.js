import React from 'react'
import Axios from 'axios'
//TODO Add automatic crawling
//TODO Add option to go to wikipedia articles

class Main extends React.Component {
  componentWillMount() {
    const term = 'italian'
    Axios.get('/api/cuisine_colors/' + term).then(result => {
      console.log(result.data)
      this.setState(result.data)
    });
  }

  render() {
    return (
      <div>
        {this.state && Object.keys(this.state).map(item => 
          <div key={item}> {item} </div>
        )}
      </div>
    );
  }

}

export default Main;