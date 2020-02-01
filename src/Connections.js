import React , { Component } from "react";
import fakeData from "./fake.js";
import { List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ForceGraph2D from 'react-force-graph-2d';


class Connections extends Component {
  constructor(props) {
    super(props)
    // let _data = this.fuckIt(fakeData);
    // console.log(_data);
    this.state ={
      showData:false
    }
    this.fuckIt = this.fuckIt.bind(this);
    this.showTheData = this.showTheData.bind(this);
  }

  componentDidMount() {
    console.log(this.fuckIt(fakeData));
  }

  showTheData(){
    this.setState({
      showData:true
    })
  }

  fuckIt(data) {
    let nodeAcc= {};
    let nodes = [];
    let links = [];
    for (let i =0; i<data.length;i++) {
      for (let j=0; j<data[i].length; j++) {
        if (!nodeAcc[data[i][j]]) {
          nodeAcc[data[i][j]] = true;
          let node = {
            id: data[i][j],
            name: data[i][j]
          }
          nodes.push(node);
        }
        let link = {
          source: data[i][j],
          target: data[i][j+1]
        }
        if (link.target != undefined) {
          links.push(link)
        }
      }
    }
    // for (let i=0;i<nodes.length;i++) {
    //   for (let j=0;j<data.length;j++) {

    //     if (nodes['id'] === data[i][j]) {
    //       let link = {
    //         source: data[i][j],
    //         target: data[i][j+1]
    //       }
    //       links.push(link)
    //     }
    //   }
    // }
    let ret = {nodes:nodes,links:links}
    return ret

    // return data.map((connections, i) => {
    //   return connections((name, j) => {
    //     if (!nodeAcc[name]) {
    //       nodeAcc[name] = true;
    //       return {
    //         id: i+j,
    //         name:name
    //       }
    //     }
    //   })
    // })

  }

  render() {
    return (
      
      <div className="container">
        <Link to="/">Go Back         </Link>
        <button onClick={this.showTheData}>Show Data</button>
        {this.state.showData ? 
        <List>
          {fakeData.map(connections => {
            const labelId = `list-label-${connections.join()}`;
            return(
              <ListItem key={labelId}>
                {connections.join("-->")}
              </ListItem>
            )
          })
          }
        </List>
        : ""}
        <ForceGraph2D
          graphData={this.fuckIt(fakeData)}
        />, 
  
      </div>
    )
  }
}
export default Connections;
