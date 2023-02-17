// Your code here
// The payroll system
//     populates a record from an Array
//       1) has a function called createEmployeeRecord
//       createEmployeeRecord
//         2) populates a firstName field from the 0th element
//         3) populates a familyName field from the 1th element
//         4) populates a title field from the 2th element
//         5) populates a payPerHour field from the 3th element
//         6) initializes a field, timeInEvents, to hold an empty Array
//         7) initializes a field, timeOutEvents, to hold an empty Array
function createEmployeeRecord(recordArr) {
    return {
        firstName: recordArr[0],
        familyName: recordArr[1],
        title: recordArr[2],
        payPerHour: recordArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

//     process an Array of Arrays into an Array of employee records
//       8) has a function called createEmployeeRecords
//       createEmployeeRecords
//         9) creates two records
//         10) correctly assigns the first names
//         11) creates more than 2 records
const createEmployeeRecords = (recordsArr) => {
    return recordsArr.map((record) => createEmployeeRecord(record))
}
// or
// function createEmployeeRecords(arrOfArr){
//     let employeeRecords = []

//     for (let i=0; i < arrOfArr.length; i++){
//         employeeRecords.push(createEmployeeRecord(arrOfArr[i]))
//     }
//     return employeeRecords
// }
 
//     it adds a timeIn event Object to an employee's record of timeInEvents 
//      when provided an employee record and Date/Time String and returns the updated record
//       12) has a function called createTimeInEvent
//       createTimeInEvent
//         13) creates the correct type
//         14) extracts the correct date
//         15) extracts the correct hour
function createTimeInEvent(employeeObjRec, dateStamp) {
    const obj= {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    employeeObjRec.timeInEvents.push(obj)
    return employeeObjRec
}

//     it adds a timeOut event Object to an employee's record of timeOutEvents 
//     when provided an employee record and Date/Time String and returns the updated record
//       16) has a function called createTimeOutEvent
//       createTimeOutEvent
//         17) creates the correct type
//         18) extracts the correct date
//         19) extracts the correct hour
function createTimeOutEvent(employeeObjRec, dateStamp) {
    const obj= {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    employeeObjRec.timeOutEvents.push(obj)
    return employeeObjRec
}

//     Given an employee record with a date-matched timeInEvent and timeOutEvent
//       20) hoursWorkedOnDate calculates the hours worked when given an employee record and a date
//       hoursWorkedOnDate
//         21) calculates that the employee worked 2 hours
function hoursWorkedOnDate(employeeObjRec, date) {
    let hours;
    for (let i = 0; i < employeeObjRec.timeInEvents.length; i++){
        if (employeeObjRec.timeInEvents[i].date === date){
            if (employeeObjRec.timeOutEvents[i].date === date){
                hours = employeeObjRec.timeOutEvents[i].hour - employeeObjRec.timeInEvents[i].hour
            }
        }
    }
    return hours/100
}

//     Given an employee record with a date-matched timeInEvent and timeOutEvent
//       22) wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
//       wagesEarnedOnDate
//         23) calculates that the employee earned 54 dollars
function wagesEarnedOnDate(employeeObjRec, date) {
    return (hoursWorkedOnDate(employeeObjRec, date)) * employeeObjRec.payPerHour
}

//     Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
//       24) allWagesFor aggregates all the dates' wages and adds them together
//       allWagesFor
//         25) calculates that the employee earned 378 dollars
function allWagesFor(employeeObjRec){
    const allPay =[]
    const allDates = []

    for (let i = 0; i < employeeObjRec.timeInEvents.length; i++){
        allDates.push(employeeObjRec.timeInEvents[i].date)
    }

    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(employeeObjRec, date))
    })

    return allPay.reduce((previousValue, currnetValue) => previousValue + currnetValue)
}

//     Given an array of multiple employees
//       26) calculatePayroll aggregates all the dates' wages and adds them together
//       calculatePayroll
//         27) calculates that the employees earned 770 dollars

//     runs payroll using the mock data provided by Ultron data systems
//       Dependent functions: createEmployeeRecords
//         takes CSV data, returns an array of employee records
//           28) exists
//           29) returns an Array with 2 records for Loki and Natalia

//       Full Payroll Test
//         from several imported CSV structures
//           calculatePayroll
//             30) exists
//             31) correctly sums the payroll burden to $11,880 when passed an array of employee records
function calculatePayroll(arrOfEmployeeObjRec){
    const payroll = []

    arrOfEmployeeObjRec.forEach(employee => {
        payroll.push(allWagesFor(employee))
    })
    
    return payroll.reduce((previousValue, currnetValue) => previousValue + currnetValue)
}