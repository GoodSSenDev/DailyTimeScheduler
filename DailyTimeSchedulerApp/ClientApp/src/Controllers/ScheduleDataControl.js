import { timeValueTickEnum, dayOfWeekTwoLetterEnum, twoLetterDayOfWeekEnum, prefixOnMonthEnum, repeatPeriodEnum } from '../components/Model/DateEnum'

export default class ScheduleDataControl {

    constructor() {
        this.state = {
            isDataLoaded: false,
        }
    }

    //this function required a user to login first else gives error  
    updateDataOnLocalStorage(appointmentList) {
        let userNickName = window.sessionStorage.getItem('user');
        if (userNickName === null) {
            return false;
        }
        window.localStorage.setItem(userNickName + '_AppointmentData', JSON.stringify(appointmentList));
    }

    //Function that check Data exist in local storage else load the data in the server.
    async loadData() {
        let userNickName = window.sessionStorage.getItem('user');
        if (userNickName !== null) {
            let appointmentData = window.localStorage.getItem(userNickName + '_AppointmentData');
            if (appointmentData != null) {
                return JSON.parse(appointmentData);
            }
        }
        let rawData = await this.getScheduleRawDataFromServerAsync();
        let appointmentData = this.convertDataToAppointments(rawData);

        if (appointmentData == null) {
            return null;
        }

        window.localStorage.setItem(userNickName + '_AppointmentData', JSON.stringify(appointmentData));
        return appointmentData;
    }   
    async UpdateEditedSchedule(changedAppointment) {
        let scheduleDto = this.convertAppointmentsToScheduleData(changedAppointment);
        scheduleDto.Schedule.No = changedAppointment.scheduleNo;
        console.log('scheduleDto: ', scheduleDto);

        const response = await fetch(`api/TimeData/UpdateSchedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scheduleDto),
        });

        console.log('response.status: ', response.status);
        if (response.status === 200) {
            return true;
        }
        if (response.status === 409) { // unauthorized
            console.log("409 occur on a schedule updating");
            return false;
        }
        if (response.status === 404) {
            console.log("404 occur on a schedule updating");
            return false;
        }
        else {
            console.log("Error occur on a schedule updating");
            return false;
        }
        // update request 

    }

    //method that get the data by fetching from the server
    async getScheduleRawDataFromServerAsync() {

        const response = await fetch(`api/TimeData/LoadSchedules`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },

        });
        //if success 

        if (response.status === 200) {
            return await response.json();
        }
        if (response.status === 409) { // unauthorized
            return null;
        }
        if (response.status === 404) {
            return {};
        }
        else {
            console.log("Error occur on getScheduleDataFromServer")
            return null;
        }
    }

    //return true if success else false 
    async deleteScheduleAsync(scheduleNo) {
        let userNickName = window.sessionStorage.getItem('user');
        let appointmentData = window.localStorage.getItem(userNickName + '_AppointmentData');
        let appointmentJsonList = JSON.parse(appointmentData);


        const response = await fetch(`api/TimeData/DeleteSchedule=${scheduleNo}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            window.localStorage.setItem(userNickName + '_AppointmentData',
                JSON.stringify(appointmentJsonList.filter(appointment => appointment.scheduleNo !== scheduleNo)));
            return true;
        }


        return false;
    }

    //method that create new Schedule from appointmentFrom server 
    async createNewScheduleAsync(appointment) {
        let scheduleDto = this.convertAppointmentsToScheduleData(appointment);
        if (scheduleDto == null) {
            return null;
        }

        const response = await fetch(`api/TimeData/CreateSchedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scheduleDto),
        });

        console.log(response)
        //if unauthorized 
        if (response.status === 200) {
            console.log(response.json.toString());
            return await response.json();
        }
        else {
            console.log("Error occur on TimeData Creating new Schedule")
            return null;
        }
    }

    //#region AppointmentConverter
    //method that gets(scheduleData, timeblocks)data and returns Appointments 
    convertAppointmentsToScheduleData(appointment) {
        if (!appointment) {
            return null;
        }
        let title = ""
        let description = ""
        let repeatPeriod = 0
        let endUTCTime = 0
        let startDateInTicks = ((appointment.startDate.getTime() * 10000) + 621355968000000000)
        if (appointment.title) {
            title = appointment.title
        }
        if (appointment.notes) {
            description = appointment.notes
        }

        if ("rRule" in appointment) {
            var rRuleNumberForm = this.getRepeatPeriodFromRRuleFormat(appointment.rRule, startDateInTicks)
        }

        console.log(rRuleNumberForm)

        if (rRuleNumberForm !== undefined) {
            repeatPeriod = rRuleNumberForm.repeatPeriod
            endUTCTime = rRuleNumberForm.endUTCTime
        }

        let scheduleDto = {
            Schedule: {
                Title: title,
                Description: description,
                IsScheduleEnd: false,
                UserNo: 0,
                Type: 0
            },
            TimeBlocks: [{
                IntialUTCTime: startDateInTicks,
                BlockSize: (appointment.endDate.getTime() - appointment.startDate.getTime()) * 10000,
                RepeatPeriod: repeatPeriod,
                EndUTCTime: endUTCTime,
                IsAllDay: appointment.allDay,
                ScheduleNo: -1
            }]
        }

        return scheduleDto
    }

    getRepeatPeriodFromRRuleFormat(rRuleFormat, startDateInTicks) {

        if (rRuleFormat == null) {
            return null
        }

        let rRuleArray = rRuleFormat.split(/[;=:]/)

        let interval = parseInt(rRuleArray[2])
        if (rRuleArray[4] === 'DAILY') {
            let count = 0;
            let repeatPeriod = interval * timeValueTickEnum.day
            if (rRuleArray[5] === 'COUNT') {
                count = parseInt(rRuleArray[6])
                return { repeatPeriod: (interval * timeValueTickEnum.day), endUTCTime: (startDateInTicks + (repeatPeriod * count)) }
            }
            else {
                return { repeatPeriod: (interval * timeValueTickEnum.day), endUTCTime: count }// 0 if it never end (or count)
            }

        }
        else if (rRuleArray[4] === 'WEEKLY') {
            let count = 0;
            let repeatPeriod = 1;
            let countCoefficient = 0; //if count exist then it is 2
            if (rRuleArray[5] === 'COUNT') {
                count = parseInt(rRuleArray[6])
                countCoefficient = 2;
            }
            if (rRuleArray[5 + countCoefficient] === 'BYDAY') {
                let rDayOfWeeks = rRuleArray[6 + countCoefficient].split(',')
                let i = 0;
                let rDayOfWeekInBit = 0;
                for (i = 0; i < rDayOfWeeks.length; i++) {
                    rDayOfWeekInBit = rDayOfWeekInBit + (1 << dayOfWeekTwoLetterEnum[rDayOfWeeks[i]])
                }
                repeatPeriod = repeatPeriod + (rDayOfWeekInBit * 10)
            }
            return {
                repeatPeriod: -1 * (repeatPeriod + (10000 * interval)),
                endUTCTime: ((count === 0) ? count : (startDateInTicks + (count * interval * timeValueTickEnum.week)))
            }

        }
        else if (rRuleArray[4] === 'MONTHLY') {
            let count = 0;
            let repeatPeriod = 2;
            let countCoefficient = 0; //if count exist then it is 2
            if (rRuleArray[5] === 'COUNT') {
                count = parseInt(rRuleArray[6])
                countCoefficient = 2;
            }
            if (rRuleArray[5 + countCoefficient] === 'BYMONTHDAY') {
                repeatPeriod = repeatPeriod + (100 * parseInt(rRuleArray[6 + countCoefficient]))
                repeatPeriod = repeatPeriod + (10000 * interval)

                return {
                    repeatPeriod: -1 * (repeatPeriod),
                    endUTCTime: ((count === 0) ? count : (startDateInTicks + (count * interval * timeValueTickEnum.month)))
                }
            }
            if (rRuleArray[5 + countCoefficient] === 'BYDAY') {
                let prefixOfMonth = parseInt((rRuleArray[6 + countCoefficient]).substring(0, 2));

                if (prefixOfMonth < 0) {
                    prefixOfMonth = 0
                }
                let dayOfWeek = dayOfWeekTwoLetterEnum[rRuleArray[6 + countCoefficient].substring(2)]
                repeatPeriod = repeatPeriod + (1 * 10) //indicate subtype 2 
                repeatPeriod = repeatPeriod + (dayOfWeek * 100)
                repeatPeriod = repeatPeriod + (prefixOfMonth * 1000)
                repeatPeriod = repeatPeriod + (10000 * interval)
                return {
                    repeatPeriod: -1 * (repeatPeriod),
                    endUTCTime: ((count === 0) ? count : (startDateInTicks + (count * interval * timeValueTickEnum.month)))
                }
            }
        }
        else if (rRuleArray[4] === 'YEARLY') {
            let count = 0;
            let repeatPeriod = 3;
            let countCoefficient = 0; //if count exist then it is 2
            if (rRuleArray[5] === 'COUNT') {
                count = parseInt(rRuleArray[6])
                countCoefficient = 2;
            }
            if (rRuleArray[5 + countCoefficient] === 'BYMONTHDAY') {
                repeatPeriod = repeatPeriod + (10000 * parseInt(rRuleArray[6 + countCoefficient]))//Which Day of Month
                repeatPeriod = repeatPeriod + (100 * parseInt(rRuleArray[8 + countCoefficient]))//which Month
                repeatPeriod = repeatPeriod + (1000000 * interval)

                return {
                    repeatPeriod: -1 * (repeatPeriod),
                    endUTCTime: ((count === 0) ? count : (startDateInTicks + (count * interval * timeValueTickEnum.year)))
                }
            }
            if (rRuleArray[5 + countCoefficient] === 'BYMONTH') {
                let prefixOfMonth = parseInt(rRuleArray[8 + countCoefficient].substring(0, 2))
                if (prefixOfMonth < 0) {
                    prefixOfMonth = 0
                }
                let dayOfWeek = dayOfWeekTwoLetterEnum[rRuleArray[8 + countCoefficient].substring(2)]
                repeatPeriod = repeatPeriod + (10000 * parseInt(rRuleArray[6 + countCoefficient]))//Which Month
                repeatPeriod = repeatPeriod + (1 * 10) //indicate subtype 2 
                repeatPeriod = repeatPeriod + (dayOfWeek * 100)
                repeatPeriod = repeatPeriod + (prefixOfMonth * 1000)
                repeatPeriod = repeatPeriod + (1000000 * interval)

                return {
                    repeatPeriod: -1 * (repeatPeriod),
                    endUTCTime: ((count === 0) ? count : (startDateInTicks + (count * interval * timeValueTickEnum.year)))
                }
            }
        }

        return null;

    }

    //A method that gets data and returns Appointments 
    convertDataToAppointments(schedulesData) {
        if (schedulesData.schedules.length <= 0) {
            return [];
        }

        let schedulesMap = new Map();
        for (const schedule in schedulesData.schedules) {
            schedulesMap.set(schedulesData.schedules[schedule].no, { schedule: schedulesData.schedules[schedule] })
        }
        let appointmentsData = [];
        for (const timeBlock in schedulesData.timeblocks) {
            // schedulesMap.get(timeBlock.scheduleNo).timeBlocks.push(timeBlock);
            // /10000 for 100nano seconds to milli seconds
            let appointment = {
                id: schedulesData.timeblocks[timeBlock].no,
                scheduleNo: schedulesData.timeblocks[timeBlock].scheduleNo,
                startDate: new Date((schedulesData.timeblocks[timeBlock].intialUTCTime - timeValueTickEnum.tickDiffValue) / 10000),
                endDate: new Date(((schedulesData.timeblocks[timeBlock].intialUTCTime + schedulesData.timeblocks[timeBlock].blockSize) - timeValueTickEnum.tickDiffValue) / 10000),
                allDay: schedulesData.timeblocks[timeBlock].isAllDay,
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


    getRepeatedRRuleFormat(repeatPeriod, intialUTCTime, endUTCTime) {
        if (repeatPeriod === 0) {
            return "";
        }

        if (repeatPeriod > 0) { //Daily 
            let repeatPeriodValue = repeatPeriod / timeValueTickEnum.day
            // var count  = intialUTCTime-endUTCTime
            if (endUTCTime === 0) {// never stop
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=DAILY`;
            }

            let numberOfRepeat = (endUTCTime - intialUTCTime) / (repeatPeriodValue * timeValueTickEnum.day)

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
            let numberOfRepeat = (endUTCTime - intialUTCTime) / (repeatPeriodValue * timeValueTickEnum.week)

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
                    count = `;COUNT=${((endUTCTime - intialUTCTime) / (repeatPeriodValue * timeValueTickEnum.month)).toString()}`
                }
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=MONTHLY${count};BYMONTHDAY=${ofEveryMonth}`

            } else if (subType === 1) {//

                let dayOfWeek = twoLetterDayOfWeekEnum[Math.floor((repeatPeriod / 100) % 10)]
                let prefixOfMonth = prefixOnMonthEnum[Math.floor((repeatPeriod / 1000) % 10)]
                let repeatPeriodValue = Math.floor(repeatPeriod / 10000)

                let count = "";
                if (endUTCTime !== 0) {
                    count = `;COUNT=${((endUTCTime - intialUTCTime) / (repeatPeriodValue * timeValueTickEnum.month)).toString()}`
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
                    count = `;COUNT=${((endUTCTime - intialUTCTime) / (repeatPeriodValue * timeValueTickEnum.year)).toString()}`
                }
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=YEARLY${count};BYMONTHDAY=${dayOfMonth};BYMONTH=${month}`
            } else if (subType === 1) {//eg Yearly First Tuesday of March"

                let dayOfWeek = twoLetterDayOfWeekEnum[Math.floor((repeatPeriod / 100) % 10)]
                let prefixOfMonth = prefixOnMonthEnum[Math.floor((repeatPeriod / 1000) % 10)]
                let month = Math.floor((repeatPeriod / 10000) % 100)
                let repeatPeriodValue = Math.floor(repeatPeriod / 1000000)
                let count = "";
                if (endUTCTime !== 0) {
                    count = `;COUNT=${((endUTCTime - intialUTCTime) / (repeatPeriodValue * timeValueTickEnum.year)).toString()}`
                }
                return `RRULE:INTERVAL=${repeatPeriodValue.toString()};FREQ=YEARLY${count};BYMONTH=${month};BYDAY=${prefixOfMonth}${dayOfWeek}`
            }
        }
    }
    //#endregion

}