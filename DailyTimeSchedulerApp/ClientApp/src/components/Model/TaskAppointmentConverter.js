
export default class TaskAppointmentConverter {



    constructor(){

    }

    isDataLoaded(){

    }
    

    async loadData(){
        let scheduleData = await this.getScheduleDataFromServer()
        let timeBlockData = await this.getTimeBlockDataFromServer()

        this.convertDataToAppointments(scheduleData,timeBlockData)

    }

    //method that get the data by fetching from the server
    async getScheduleDataFromServer(){   
        const response = await fetch(`api/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,'Accept': 'application/json'},
        });

        //if unauthorized 
        if(response.status === 200){
            return await response.json 
        }
        else {
            console.log("Error occur on getScheduleDataFromServer")
            return null
        }
    }


    //method that get the TimeBlockData(Schedule has TimeBlocks) by fetching from the server
    async getTimeBlockDataFromServer(){
        const response = await fetch(`api/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,'Accept': 'application/json'},
        });

        //if unauthorized 
        if(response.status === 200){
            return await response.json 
        }
        else {
            console.log("Error occur on getTimeBlockDataFromServer")
            return null
        }
    }



    //method that gets(scheduleData, timeblocks)data and returns Appointments 
    convertDataToAppointments(scheduleData,timeBlockdata){
        


    }


}