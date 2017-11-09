import React from 'react'
import GoogleImages from 'google-images'
import Keys from './_keys.json'

//TODO Add automatic crawling
//TODO Add option to go to wikipedia articles

class Main extends React.Component {
  constructor() {
    super();
    this.imageSearch = new GoogleImages(Keys.search, Keys.api);
    this.state = { 'images': [] }
  }

  componentWillMount() {
    this.imageSearch.search('Nutella').then(images => {
      console.log(images)
      this.setState({ images })
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