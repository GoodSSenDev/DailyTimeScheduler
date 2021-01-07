import React, { Component } from 'react';
import { Container, Navbar } from 'reactstrap';
// import { NavMenu } from './NavMenu';
import Nav from './Nav';
export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Nav/>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
