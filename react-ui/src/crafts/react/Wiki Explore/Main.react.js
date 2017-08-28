import React from 'react'
import vis from 'vis'
import wiki from 'wikijs'

//TODO: Migrate to axios link fetching using wikipedia http API
//TODO: Improve Graph style
//TODO: Implement a better way of interacting with the graph to add a new node

class Main extends React.Component {
  constructor() {
    super();
    this.wiki = wiki();
    this.nodes = new vis.DataSet([{id: 'New York City', label: 'New York City'}]);
    this.edges = new vis.DataSet([]);
  }

  componentDidMount() {
    const options = {
      edges:{
        arrows: 'to',
        smooth: true,
        width: 1
      }
    };

    const container = document.getElementById('wikinetwork');
    const network = new vis.Network(
      container,
      {nodes: this.nodes, edges: this.edges},
      options
    );

    network.on("selectNode", (params) => {
      this._addWikiNode(params.nodes[0])
    });
  }

  _addWikiNode(fromNodeTitle) {
    this.wiki.page(fromNodeTitle).then(page =>
      page.links()
    ).then(links => {
      const randomLink = links[Math.floor(Math.random()*links.length)];
      this.nodes.add({id:randomLink, label:randomLink});
      this.edges.add({from: fromNodeTitle, to: randomLink});
    })
  }

  render() {
    return (
      <div id="wikinetwork" style={{width: '100%', height: '100%'}}/>
    );
  }

}

export default Main;