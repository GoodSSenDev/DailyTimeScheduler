import { timeValueTickEnum, dayOfWeekTwoLetterEnum, twoLetterDayOfWeekEnum, prefixOnMonthEnum, repeatPeriodEnum } from './DateEnum'

export default class ScheduleDataControl {


    constructor() {
        this.state = {
            isDataLoaded: false,
        }
    }

    checkIsDataExist() {

    }


    async loadData() {
        let schedulesData = await this.loadDataFromServer()

        this.convertDataToAppointments(schedulesData)

    }

    //method that get the data by fetching from the server
    async loadDataFromServer() {
        const response = await fetch(`api/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        });

        //if unauthorized 
        if (response.status === 200) {
            return await response.json
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
            return await response.json
        }
        else {
            console.log("Error occur on getTimeBlockDataFromServer")
            return null
        }
    }

    //method that gets(scheduleData, timeblocks)data and returns Appointments 
    convertAppointmentsToScheduleData(scheduleData, timeBlockdata) {



    }

    //method that getsdata and returns Appointments 

    convertDataToAppointments(schedulesData) {
        if (schedulesData.schedules.length <= 0)
            return null;

        let schedulesMap = new Map();

        for (const schedule in schedulesData.schedules) {
            schedulesMap.set(schedule.no, { schedule: schedule })
        }

        let appointmentsData = []

        for (const timeBlock in schedulesData.timeBlocks) {
            // schedulesMap.get(timeBlock.scheduleNo).timeBlocks.push(timeBlock);
            // /10000 for 100nano seconds to milli seconds
            let startDate = new Date((timeBlock.intialUTCTime - timeValueTickEnum.tickDiffValue) / 10000)
            let endDate = new Date((timeBlock.intialUTCTime + timeBlock.blockSize - timeValueTickEnum.tickDiffValue) / 10000)

            if (timeBlock.blockSize >= timeValueTickEnum.day) { // check is it all day event 

            }
        }

        // for(const scheduleData in schedulesMap)
        // {
        //     for(const timeblock in scheduleData.timeBlocks)
        // }

    }

    getRepeatedRRuleFormat(repeatPeriod, intialUTCTime, endUTCTime) {
        if (repeatPeriod === 0) {
            return "";
        }
        let returnSting = "";

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