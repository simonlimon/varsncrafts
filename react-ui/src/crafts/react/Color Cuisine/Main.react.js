import React from 'react'
import GoogleImages from 'google-images'
import { Loader } from 'semantic-ui-react'
import Keys from './_keys.json'

//TODO Add automatic crawling
//TODO Add option to go to wikipedia articles

class Main extends React.Component {
  constructor() {
    super();
    this.imageSearch = new GoogleImages(Keys.search, Keys.api);
  }

  componentDidMount() {
    this.imageSearch.search('Nutella').then(images => {
        console.log(images)
    });
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        
      </div>
    );
  }

}

export default Main;