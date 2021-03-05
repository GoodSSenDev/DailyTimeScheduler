import React, { Component } from 'react';
// import { NavMenu } from './NavMenu';
import Nav from './Nav';
export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Nav height={90}/>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
