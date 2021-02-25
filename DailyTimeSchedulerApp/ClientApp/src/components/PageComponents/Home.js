import React, { Component } from 'react';
import { Button } from "@material-ui/core";

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Home Page</h1>
        <Button color="secondary" variant="outlined">
          This is button
        </Button>
      </div>
    );
  }
}
