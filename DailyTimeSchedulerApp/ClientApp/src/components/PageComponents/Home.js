import React, { Component } from 'react';
import { Button } from "@material-ui/core";

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <Button color="secondary" variant="outlined">
          This is button
        </Button>
      </div>
    );
  }
}
