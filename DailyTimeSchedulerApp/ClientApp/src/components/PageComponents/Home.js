import React, { Component } from 'react';
import { Paper } from "@material-ui/core";

export class Home extends Component {

  render() {
    return (
      <div>
        <br />
        <Paper>
          <h1>Daily Scheduler Web App</h1>
          <br />
          <p>This web app is currently working progress</p>
        </Paper>
        <br />
        <Paper>
          <h2>Functionalities</h2>
          <ol>
            <ul>Calendar - adding a schedule</ul>
            <ul>Calendar - saving a schedule</ul>
            <ul>Calendar - deleting a schedule</ul>
            <ul>Calendar - updating a schedule</ul>
          </ol>
        </Paper>
        <br />
        <Paper>
          <h2>Future Functionalities</h2>
          <ol>
            <ul>Analyse schedules(pattern, rate)</ul>
            <ul>Calendar - having different types of schedule e.g. (bool, progress, milestone ...)</ul>
          </ol>
        </Paper>
      </div>
    );
  }
}
