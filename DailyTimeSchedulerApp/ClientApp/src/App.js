import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/PageComponents/Home';
import { Counter } from './components/Counter';
import TimeTablePage from './components/PageComponents/TimeTablePage';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  constructor(props){
    super(props)
    
  }

  async componentDidMount() {
    await this.checkIsSignedIn()
  } 

  async checkIsSignedIn() {
    if(window.sessionStorage.getItem('user') === null){
      return null;
    }
    const response = await fetch(`api/Auth/checkSignedIn`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
    });
    if(response.status === 200){
      window.sessionStorage.setItem('user',await response.json())
    } 
    else {
      window.sessionStorage.removeItem('user')
    }
  }

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/calendar' component={TimeTablePage} />
        <Route path='/analysis' component={Counter} />
      </Layout>
    );
  }
}
