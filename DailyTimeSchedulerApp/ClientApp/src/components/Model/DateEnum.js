

//time variable to 100 nano 
//tickDiffValue due to The JavaScript Date type's origin is the Unix epoch: midnight on 1 January 1970.
//but The .NET DateTime type's origin is midnight on 1 January 0001.
//so 621355968000000000 =  Differnce with 100nano second as unit 
const timeValueTickEnum = {'tickDiffValue':621355968000000000,'day':864000000000,'hour':36000000000,'minutes':600000000,'second':10000000}

const dayOfWeekTwoLetterEnum = {'SU':0,'MO':1,'TU':2,'WE':3,'TH':4,'FR':5,'SA':6}

const repeatPeriodEnum = {'DAILY':0,'WEEKLY':1,'MONTHLY':2,'YEARLY':3}



export {timeValueTickEnum, dayOfWeekTwoLetterEnum, repeatPeriodEnum} 