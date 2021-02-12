import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }


  // { "schedules": 
  //     [{ "no": 2, "title": "Testing1", 
  //     "description": "This is testing", 
  //     "isScheduleEnd": false, 
  //     "userNo": 4, 
  //     "appUser": null, 
  //     "type": 0 }],

  //     "timeblocks": 
  //     [{ "no": 1, 
  //     "intialUTCTime": 637475701635460000, 
  //     "blockSize": 6000000000, 
  //     "repeatPeriod": 0, "scheduleNo": 2, 
  //     "schedule": null }] }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={async () => { await this.createNewScheduleAsync() }}>Test ButtonCreate</button>
        <button className="btn btn-primary" onClick={async () => { await this.getScheduleDataFromServerAsync() }}>Test ButtonGetData</button>
      </div>
    );
  }
}
