import { timeValueTickEnum, dayOfWeekTwoLetterEnum, twoLetterDayOfWeekEnum, prefixOnMonthEnum, repeatPeriodEnum } from './DateEnum'

export default class ScheduleDataControl {


    constructor() {
        this.state = {
            isDataLoaded: false,
        }
    }


    //Function that check Data exist in local storage else load the data in the server.
    async loadData() {
        let appointmentData = window.localStorage.getItem('AppointmentData');
        if (appointmentData != null) {
            return JSON.parse(appointmentData);
        }

        let appointmentDataFromServer = await this.loadDataFromServerAsync()
        
        if(appointmentDataFromServer == null){
            return null;
        }

        window.localStorage.setItem('AppointmentData',JSON.stringify(appointmentDataFromServer))
        return appointmentDataFromServer
    }

    async loadDataFromServerAsync() {

        let result = await this.getScheduleDataFromServerAsync()

        if (result == null) {
            return null;
        }

        let appointmentData = this.convertDataToAppointments(result)
        console.log(appointmentData)
        return appointmentData;
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
            return await response.json()
        }
        else {
            console.log("Error occur on getScheduleDataFromServer")
            return null
        }
    }

    //method that get the TimeBlockData(Schedule has TimeBlocks) by fetching from the server
    async getTimeBlockDataFromServer() {
        const response = await fetch(`api/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        });

        //if unauthorized 
        if (response.status === 200) {
            return (await response.json())
        }
        else {
            console.log("Error occur on getTimeBlockDataFromServer")
            return null
        }
    }

    //method that gets(scheduleData, timeblocks)data and returns Appointments 
    convertAppointmentsToScheduleData(appointment) {




    }

    //method that getsdata and returns Appointments 
    convertDataToAppointments(schedulesData) {
        if (schedulesData.schedules.length <= 0) {
            return [];
        }

        let schedulesMap = new Map();
        for (const schedule in schedulesData.schedules) {

            schedulesMap.set(schedulesData.schedules[schedule].no, { schedule: schedulesData.schedules[schedule] })
        }
        console.log(schedulesMap)
        let appointmentsData = []

        for (const timeBlock in schedulesData.timeblocks) {
            // schedulesMap.get(timeBlock.scheduleNo).timeBlocks.push(timeBlock);
            // /10000 for 100nano seconds to milli seconds
            let appointment = {
                id: schedulesData.timeblocks[timeBlock].no,
                startDate: new Date((schedulesData.timeblocks[timeBlock].intialUTCTime - timeValueTickEnum.tickDiffValue) / 10000),
                endDate: new Date(((schedulesData.timeblocks[timeBlock].intialUTCTime + schedulesData.timeblocks[timeBlock].blockSize) - timeValueTickEnum.tickDiffValue) / 10000),
                allDay: false,
                title: (schedulesMap.get(schedulesData.timeblocks[timeBlock].scheduleNo)).schedule.title,
                notes: (schedulesMap.get(schedulesData.timeblocks[timeBlock].scheduleNo)).schedule.description,
            }
            let rRule = this.getRepeatedRRuleFormat(schedulesData.timeblocks[timeBlock].repeatPeriod, schedulesData.timeblocks[timeBlock].intialUTCTime, schedulesData.timeblocks[timeBlock].endUTCTime);
            if (rRule !== "") {
                appointment.rRule = rRule
            }
            if (schedulesData.timeblocks[timeBlock].blockSize == timeValueTickEnum.day) { // check is it all day event 
                appointment.allDay = true
            }
            appointmentsData.push(appointment)
        }

        // for(const scheduleData in schedulesMap)
        // {
        //     for(const timeblock in scheduleData.timeBlocks)
        // }
        return appointmentsData
    }

    getRepeatPeriodFromRRuleFormat(repeatPeriod, intialUTCTime, endUTCTime) {

    }

    getRepeatedRRuleFormat(repeatPeriod, intialUTCTime, endUTCTime) {
        if (repeatPeriod === 0) {
            return "";
        }

        if (repeatPeriod > 0) { //Daily 
            let repeatPeriodValue = repeatPeriod % timeValueTickEnum.day
            // var count  = intialUTCTime-endUTCTime
            if (endUTCTime === 0) {// never stop
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=DAILY`;
            }

            let numberOfRepeat = (intialUTCTime - endUTCTime) / (repeatPeriodValue * timeValueTickEnum.day)

            return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=DAILY;COUNT=${numberOfRepeat.toString()}`;
        }

        repeatPeriod = repeatPeriod * -1

        let typeValue = (repeatPeriod % 10)


        if (typeValue === repeatPeriodEnum.WEEKLY) {
            let bitDayOfWeekValue = Math.floor((repeatPeriod / 10) % 1000)
            let i;
            let rRule = "";
            for (i = 0; i < 7; i++) {
                if ((bitDayOfWeekValue & (1 << i)) > 0) {
                    rRule = rRule + twoLetterDayOfWeekEnum[i] + ','
                }
            }
            let repeatPeriodValue = Math.floor((repeatPeriod / 10000))
            let numberOfRepeat = (intialUTCTime - endUTCTime) / (repeatPeriodValue * timeValueTickEnum.week)

            if (rRule !== "") {
                rRule = rRule.slice(0, -1) //remove ',' at the end
                rRule = `;BYDAY=` + rRule
            }

            if (endUTCTime === 0)
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=WEEKLY${rRule}`
            else
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=WEEKLY;COUNT=${numberOfRepeat.toString()}${rRule}`
        }
        else if (typeValue === repeatPeriodEnum.MONTHLY) {
            let subType = Math.floor((repeatPeriod / 10) % 10)
            if (subType === 0) { // ofEveryMonth option on AppointmnetFormTask
                let ofEveryMonth = Math.floor((repeatPeriod / 100) % 100)
                let repeatPeriodValue = Math.floor((repeatPeriod / 10000))
                let count = "";
                if (endUTCTime !== 0) {
                    count = `;COUNT=${((intialUTCTime - endUTCTime) / (repeatPeriodValue * timeValueTickEnum.month)).toString()}`
                }
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=MONTHLY${count};BYMONTHDAY=${ofEveryMonth}`

            } else if (subType === 1) {//

                let dayOfWeek = twoLetterDayOfWeekEnum[Math.floor((repeatPeriod / 100) % 10)]
                let prefixOfMonth = prefixOnMonthEnum[Math.floor((repeatPeriod / 1000) % 10)]
                let repeatPeriodValue = Math.floor(repeatPeriod / 10000)

                let count = "";
                if (endUTCTime !== 0) {
                    count = `;COUNT=${((intialUTCTime - endUTCTime) / (repeatPeriodValue * timeValueTickEnum.month)).toString()}`
                }
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=MONTHLY${count};BYDAY=${prefixOfMonth}${dayOfWeek}`
            }
        }
        else if (typeValue === repeatPeriodEnum.YEARLY) {
            let subType = Math.floor((repeatPeriod / 10) % 10)
            if (subType === 0) {//eg Yearly repeat may 27 1 never
                let month = Math.floor((repeatPeriod / 100) % 100)
                let dayOfMonth = Math.floor((repeatPeriod / 10000) % 100)
                let repeatPeriodValue = Math.floor(repeatPeriod / 1000000)
                let count = "";
                if (endUTCTime !== 0) {
                    count = `;COUNT=${((intialUTCTime - endUTCTime) / (repeatPeriodValue * timeValueTickEnum.year)).toString()}`
                }
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=YEARLY${count};BYMONTHDAY=${dayOfMonth};BYMONTH=${month}`
            } else if (subType === 1) {//eg Yearly First Tuesday of March"

                let dayOfWeek = twoLetterDayOfWeekEnum[Math.floor((repeatPeriod / 100) % 10)]
                let prefixOfMonth = prefixOnMonthEnum[Math.floor((repeatPeriod / 1000) % 10)]
                let month = Math.floor((repeatPeriod / 10000) % 100)
                let repeatPeriodValue = Math.floor(repeatPeriod / 1000000)
                let count = "";
                if (endUTCTime !== 0) {
                    count = `;COUNT=${((intialUTCTime - endUTCTime) / (repeatPeriodValue * timeValueTickEnum.year)).toString()}`
                }
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=YEARLY${count};BYMONTH=${month};BYDAY=${prefixOfMonth}${dayOfWeek}`
            }
        }
    }

}