import React from 'react';

import GraphView from 'react-digraph'

const styles = {
  graph: {
    height: '100%',
    width: '100%'
  }
};

const GraphConfig = {
  NodeTypes: {
    default: {
      typeText: "None",
      shapeId: "#empty",
      shape: (
        <symbol viewBox="0 0 100 100" id="empty" key="0">
          <circle cx="50" cy="50" r="45"/>
        </symbol>
      )
    }
  },
  NodeSubtypes: {},
  EdgeTypes: {
    default: {
      shapeId: "#emptyEdge",
      shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
        </symbol>
      )
    }
  }
};

const sample = {
  "nodes": [
    {
      "id": 1,
      "title": "Node A",
      "x": 258.3976135253906,
      "y": 331.9783248901367,
      "type": "default"
    },
    {
      "id": 2,
      "title": "Node B",
      "x": 593.9393920898438,
      "y": 260.6060791015625,
      "type": "default",
    },
    {
      "id": 3,
      "title": "Node C",
      "x": 237.5757598876953,
      "y": 61.81818389892578,
      "type": "default"
    },
    {
      "id": 4,
      "title": "Node C",
      "x": 600.5757598876953,
      "y": 600.81818389892578,
      "type": "default"
    }
  ],
  "edges": [
    {
      "source": 1,
      "target": 2,
      "type": "default"
    },
    {
      "source": 2,
      "target": 4,
      "type": "default"
    }
  ]
}

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      graph: sample,
      selected: {}
    }
  }

  // Helper to find the index of a given node
  getNodeIndex(searchNode) {
    return this.state.graph.nodes.findIndex((node)=>{
      return node['id'] === searchNode['id']
    })
  }

  // Given a nodeKey, return the corresponding node
  getViewNode = (nodeKey) => {
    const searchNode = {};
    searchNode['id'] = nodeKey;
    const i = this.getNodeIndex(searchNode);
    return this.state.graph.nodes[i]
  }

  render() {

    return (
      <div id='graph' style={styles.graph}>
        <GraphView ref='GraphView'
                   nodeKey={'id'}
                   emptyType={"default"}
                   nodes={this.state.graph.nodes}
                   edges={this.state.graph.edges}
                   selected={this.state.selected}
                   nodeTypes={GraphConfig.NodeTypes}
                   nodeSubtypes={GraphConfig.NodeSubtypes}
                   edgeTypes={GraphConfig.EdgeTypes}
                   getViewNode={this.getViewNode}
                   onSelectNode={this.onSelectNode}
                   onCreateNode={this.onCreateNode}
                   onUpdateNode={this.onUpdateNode}
                   onDeleteNode={this.onDeleteNode}
                   onSelectEdge={this.onSelectEdge}
                   onCreateEdge={this.onCreateEdge}
                   onSwapEdge={this.onSwapEdge}
                   onDeleteEdge={this.onDeleteEdge}/>
      </div>
    );
  }

}

export default Main;