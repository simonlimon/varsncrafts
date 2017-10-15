import React from 'react'
import vis from 'vis'
import wiki from 'wikijs'
import { Loader } from 'semantic-ui-react'

//TODO Add automatic crawling
//TODO Add option to go to wikipedia articles

class Main extends React.Component {
  constructor() {
    super();
    this.state = {loading: false};
    this.wiki = wiki();
    this.nodes = new vis.DataSet([{id: 'Bananas', label: 'Bananas', fixed: true}]);
    this.edges = new vis.DataSet([]);
  }

  componentDidMount() {
    const options = {
      edges:{
        arrows: 'to',
        smooth: true,
        width: 1
      },
      nodes: {
        color: '#FFFFFF',
        font: {
          face: 'Lato'
        },
        shadow: true,
        shape: 'box',
      }
    };

    const container = document.getElementById('wikinetwork');
    const network = new vis.Network(
      container,
      {nodes: this.nodes, edges: this.edges},
      options
    );

    network.on("doubleClick", (params) => {
      if (params.nodes.length > 0) {
        this._addWikiNode(params.nodes[0])
      }
    });

    this.interval = setInterval(() => {
      let nodes = this.nodes.get()
      let rand = nodes[Math.floor(Math.random()*nodes.length)];
      this._addWikiNode(rand.id)
      console.log(rand.id)
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  _addWikiNode(fromNodeTitle) {
    this.setState({loading: true});
    this.wiki.page(fromNodeTitle).then(page =>
      page.links()
    ).then(links => {
      this.setState({loading: false});
      const randomLink = links[Math.floor(Math.random()*links.length)];
      this.nodes.add({id:randomLink, label:randomLink});
      this.edges.add({from: fromNodeTitle, to: randomLink});
    }).catch(error =>
      this.setState({loading: false})
    )
  }

  render() {
    return (
      <div>
        <div
          id="wikinetwork"
          style={{width: window.innerWidth, height: window.innerHeight}}/>
        <Loader active={this.state.loading} style={{position: 'absolute', top:25}}/>
      </div>
    );
  }

}

export default Main;