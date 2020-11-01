/** @function calculateIntakeEndDate */
/**
 * Object with intake details
 * @typedef {Object} Intake
 * @property {string} time - time of intake (must be in the 'HH:mm' format)
 * @property {number} pills - amount of pills
 */
/**
 * Object with selected days of intakes
 * @typedef {Object} WeekDays
 * @property {boolean} monday
 * @property {boolean} tuesday
 * @property {boolean} wednesday
 * @property {boolean} thursday
 * @property {boolean} friday
 * @property {boolean} saturday
 * @property {boolean} sunday
 */
/**
 * @param {Intake[]} intakes - number of pills and time of intake (per day)
 * @param {number} stock - total number of pills
 * @param {'daily', 'weekly', 'eachOtherDay'} frequency - the frequency of taking
 * @param {WeekDays} [weekDays] - required only for 'weekly' frequency
 * @return {Date} - the end date of taking the pills
 */

function calculateIntakeEndDate(intakes, stock, frequency, weekDays) {
  // const testStartDate = new Date('2020.04.22 16:06'); // only for testing
  // const startDate = testStartDate; // only for testing
  const startDate = new Date(); // uncomment this line after testing !!!!
  const startDayOfMonth = startDate.getDate();
  const startDayOfWeek = startDate.getDay(); // Sunday=0, Monday=1, 2, 3, 4, 5, 6
  const startAllInMinutes = startDate.getHours() * 60 + startDate.getMinutes();

  // make weekDaysArray for week loop
  const weekDaysArr = makeWeekDaysArr(frequency, startDayOfWeek, weekDays);

  let countOfPills = 0;
  let isFirstDayNotFounded = true; // flag
  let isFirstTimeNotFounded = true; // flag

  let curDayOfMonth = startDayOfMonth;
  let curHours = 0;
  let curMinutes = 0;

  // loop until break
  outer: while (true) {
    // week loop
    for (let weekDaysInd = 0; weekDaysInd < weekDaysArr.length; weekDaysInd++) {
      const isActiveDay = weekDaysArr[weekDaysInd];

      // find the first day of the week that matches the start date
      if (isFirstDayNotFounded) {
        // if (weekDaysInd + 1 < startDayOfWeek) {
        if (weekDaysInd < startDayOfWeek) {
          continue;
        } else {
          // next day, so
          isFirstDayNotFounded = false;
        }
      }

      // if a day without taking pills
      if (!isActiveDay) {
        curDayOfMonth++;
        isFirstTimeNotFounded = false;
        continue;
      }

      // day loop
      for (let intakesInd = 0; intakesInd < intakes.length; intakesInd++) {
        const intake = intakes[intakesInd];

        if (isFirstTimeNotFounded) {
          const intakeMinutes = calcMinutesFromHHMM(intake.time);
          if (intakeMinutes < startAllInMinutes) {
            continue;
          } else {
            isFirstTimeNotFounded = false;
          }
        }
        
        countOfPills += intake.pills;
        if (countOfPills >= stock) {
          [curHours, curMinutes] = hhMMStringToNumbers(intake.time);
          break outer;
        }
      }
      // next day, so
      isFirstTimeNotFounded = false;
      curDayOfMonth++;
    }
  }
  const endDate = getEndDate(startDate, curDayOfMonth, curHours, curMinutes);
  // console.log(`stock=${stock} countOfPills=${countOfPills}`);
  // console.log(`endDate=${endDate}`);
  return endDate;
}

function getEndDate(startDate, d, h, m) {
  // clone startDate
  const endDate = new Date(startDate.getTime());
  endDate.setDate(d);
  endDate.setHours(h);
  endDate.setMinutes(m);
  endDate.setSeconds(0);
  endDate.setMilliseconds(0);
  return endDate;
}

function makeWeekDaysArr(frequency, startDayOfWeek, weekDays) {
  switch (frequency) {
    case 'daily':
      return Array.from(Array(7)).map(() => true);
    // break;
    case 'eachOtherDay':
      return Array.from(Array(14)).map((_, ind) =>
        (ind) % 2 === startDayOfWeek % 2 ? true : false
      );
    // break;
    case 'weekly':
      const weekDaysArr = [];
      weekDaysArr.push(weekDays.sunday);
      weekDaysArr.push(weekDays.monday);
      weekDaysArr.push(weekDays.tuesday);
      weekDaysArr.push(weekDays.wednesday);
      weekDaysArr.push(weekDays.thursday);
      weekDaysArr.push(weekDays.friday);
      weekDaysArr.push(weekDays.saturday);
      return weekDaysArr;
    // break;
  }
}

function hhMMStringToNumbers(hhmm) {
  const hhMMArr = hhmm.split(':').map((item) => Number(item));
  return hhMMArr;
}

function calcMinutesFromHHMM(hhmm) {
  const [h, m] = hhMMStringToNumbers(hhmm);
  return h * 60 + m;
}

module.exports = calculateIntakeEndDate;
