import {timeValueTickEnum, dayOfWeekTwoLetterEnum, repeatPeriodEnum} from './DateEnum'

export default class ScheduleDataControl {


    constructor() {
        this.state = {
            isDataLoaded :false,
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
        if(schedulesData.schedules.length <= 0) 
            return null;
    
        let schedulesMap = new Map();

        for(const schedule in schedulesData.schedules) {
            schedulesMap.set(schedule.no,{schedule: schedule})
        }
        
        let appointmentsData = []

        for(const timeBlock in schedulesData.timeBlocks)
        {
            // schedulesMap.get(timeBlock.scheduleNo).timeBlocks.push(timeBlock);
            // /10000 for 100nano seconds to milli seconds
            let startDate = new Date((timeBlock.intialUTCTime -timeValueTickEnum.tickDiffValue) / 10000)
            let endDate = new Date((timeBlock.intialUTCTime+timeBlock.blockSize -timeValueTickEnum.tickDiffValue) / 10000)

            if(timeBlock.blockSize >= timeValueTickEnum.day) { // check is it all day event 
                
            }
        }

        // for(const scheduleData in schedulesMap)
        // {
        //     for(const timeblock in scheduleData.timeBlocks)
        // }

    }

    getRepeatedRRuleFormat(number){
        if(number === 0){
            return "";
        }
        let returnSting ="";

        if(number > 0){
            
        }
    }    
}