import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import TimeTable from './components/TimeTable';
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
    const response = await fetch(`api/Auth/checkSignedIn`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
    });
    if(response.status == 200){
      localStorage.setItem('user',await response.json())
    } 
    else {
      localStorage.removeItem('user')
    }
  }

  render() {
    return (
      <Layout>
        <Route exact path='/' component={TimeTable} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
