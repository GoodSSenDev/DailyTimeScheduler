import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import ScheduleDataControl from './Model/ScheduleDataControl'

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


  //method that get the data by fetching from the server
  async getScheduleDataFromServerAsync() {
    const response = await fetch(`api/TimeData/LoadSchedules`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },

    });
    console.log(response.status)
    //if unauthorized 
    if (response.status === 200) {
      let value = await response.json();
      console.log(value.schedules[0].no);
      console.log(value.schedules[0].title);
      console.log(JSON.stringify(value).toString());
      let controller = new ScheduleDataControl()
      console.log(controller.convertDataToAppointments(value))
      console.log(controller.convertDataToAppointments(value).toString())
      return await response.json
    }
    else {
      console.log("Error occur on getScheduleDataFromServer")
      return null
    }
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
  async createNewScheduleAsync() {

    let scheduleDto = {
      Schedule: {
        Title: 'Testing1',
        Description: `This is testing`,
        IsScheduleEnd: false,
        UserNo: 0,
        Type: 0
      },
      TimeBlocks: [{
        IntialUTCTime: ((new Date().getTime() * 10000) + 621355968000000000),
        BlockSize: 6000000000,
        RepeatPeriod: 0,
        EndUTCTime: 0,
        IsAllDay: false,
        ScheduleNo: -1
      }]
    }


    const response = await fetch(`api/TimeData/CreateSchedule`, {
      method: 'POST',

      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scheduleDto)
    });

    console.log(response)
    //if unauthorized 
    if (response.status === 200) {
      console.log(response.json.toString());
      return await response.json
    }
    else {
      console.log("Error occur on TimeData Creating new Schedule")
      return null
    }
  }

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
