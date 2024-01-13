/* Your Code Here */
// createEmployeeRecord function
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
      createTimeInEvent: createTimeInEvent,
      createTimeOutEvent: createTimeOutEvent,
      hoursWorkedOnDate: hoursWorkedOnDate,
      wagesEarnedOnDate: wagesEarnedOnDate,
      allWagesFor: allWagesFor,
    };
  }
  
  // function createEmployeeRecords
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  // function: createTimeInEvents
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date: date,
    });
    return this;
  }
  
  // timeOutEvents
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date: date,
    });
    return this;
  }
  
  // hoursWorkedOnDate
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
  
    // Check if both timeIn and timeOut events are present
    if (timeIn && timeOut) {
      // Calculate worked hours
      const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
      return hoursWorked;
    } else {
      // Handle the case when either timeIn or timeOut event is missing
      console.error("Missing timeIn or timeOut event for the specified date");
      return 0;
    }
  }
  
  // wages earned on date
  function wagesEarnedOnDate(date) {
    const workingHours = this.hoursWorkedOnDate(date);
    return workingHours * this.payPerHour;
  }
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + employee.allWagesFor(), 0);
  }
    
   
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

