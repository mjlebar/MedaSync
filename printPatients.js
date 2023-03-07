function printPatients(patients) {
  // Iterates through each patient, and either prints out their information, or prints out an error if there's something wrong in the input. At most one error message will be printed, even if there are multiple things wrong

  for (let patient of Object.keys(patients)) {
    const actions = patients[patient];

    // The repeated if/else logic here simply checks for a number of possible errors on input, and logs an error as soon as it finds one
    if (actions.treatments.length == 0) {
      console.log(`Error for patient ${patient}: no treatments added`);
    } else if (!actions.intake) {
      console.log(`Error for patient ${patient}: no intake added`);
    } else if (!actions.discharge) {
      console.log(`Error for patient ${patient}: no discharge added`);
    } else {
      const timeStayed = timeDiff(actions.discharge, actions.intake);
      // calculates the time between discharge and intake and returns it in a nice string format
      if (!timeStayed) {
        // if we set an intake date after a discharge date, the timeDiff function will return -1 and we will log an error
        console.log(
          `Error for patient ${patient}: discharge takes place before intake`
        );
      } else {
        //   This is the good case, where no errors are found!
        console.log(
          `Patient ${patient} stayed for ${timeStayed} and received ${actions.treatments.length} treatments`
        );
      }
    }
  }
}

function timeDiff(laterTime, earlierTime) {
  // given two times, this helper function returns the difference between them in hours and minutes, formatted as a string

  const milliseconds = laterTime.getTime() - earlierTime.getTime();
  // first we calculate the exact difference in time

  if (milliseconds < 0) return false;
  //   if we have a negative answer, one of the times has been entered correctly, so we return false to get an error from printPatients

  const hours = Math.floor(milliseconds / 3600000).toFixed(1);
  // There are 3,600,000 milliseconds in an hour, so we just find how many whole hours are in this period of time...
  const minutes = ((milliseconds % 3600000) / 60000).toFixed(1);
  // and then the remainder is just our number of minutes. We need to divide by 60,000 since the remainder will initially be in milliseconds, and there are 60,000 milliseconds in a minute
  return `${hours} hours and ${minutes} minutes`;
}

module.exports = { printPatients };
