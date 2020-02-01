import React from "react";
import fakeData from "fake.js";
import { List, ListItem } from '@material-ui/core';

const Connections = props => {
  
  return (
    <div className="container">
        <List>
          {fakeData.map(connections => {
            <ListItem>
              {connections.join(" ")}
            </ListItem>
          })}
        </List>
      }
    </div>
  )
}
