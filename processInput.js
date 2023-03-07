const { printPatients } = require("./printPatients");

function processInput(input) {
  const patients = {};
  // this will contain the list of patients, with each key a patient's name and each value an object listing the actions corresponding to that patient

  for (let i = 0; i < input.length; i++) {
    // this for loop goes through line by line and fills in the patients object
    const words = input[i].split(" ");
    const type = words[0];
    // At each line, we break it into words and check to see if the first word is action or patient

    if (type === "Patient") {
      patients[words[1]] = { treatments: [] };
      // If it's a new patient, words[1] will be that patient's name. So we add the new patient to the patients object
    } else if (type === "Action") {
      // otherwise, we first need to find the patient corresponding to the action
      const name = words[2];
      const actions = patients[name];

      // once we've found them, we want to add the appropriate type of action
      switch (words[1]) {
        case "Intake":
          actions.intake = new Date(words[3]);
          break;
        case "Discharge":
          actions.discharge = new Date(words[3]);
          break;
        case "Treatment":
          // if it's a treatment, we just add it to the already existing treatments array
          actions.treatments.push(words[4]);
          break;
        default:
          // If it's not one of those three, it's not a legitimate action, and we have an error
          console.log(
            `Error at line ${i + 1}: ${input[i]} \n Invalid action type`
          );
          break;
      }
    } else {
      // If the type is not patient or action, we have an error
      console.log(
        `Error at line ${i + 1}: ${input[i]} \n No type marker specified`
      );
    }
  }

  // now that the patients object has been filled in, we want to print it
  printPatients(patients);

  return patients;
}

module.exports = { processInput };
