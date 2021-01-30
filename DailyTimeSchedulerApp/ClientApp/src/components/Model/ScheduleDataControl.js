
export default class ScheduleDataControl {



    constructor() {

    }

    isDataLoaded() {

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



    }


}