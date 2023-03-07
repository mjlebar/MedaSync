const { readFile } = require("./readFile");

const consoleSpy = jest.spyOn(global.console, "log");

afterEach(() => {
  consoleSpy.mockClear();
});
// this makes sure the number of times console.log has been called is reset after each test

test("Expect correct case to output a line for each patient, and check patients' output to make sure it's correct", async () => {
  await readFile("./ex1.txt");
  expect(consoleSpy).toHaveBeenCalledTimes(3);
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient John stayed for 222.0 hours and 13.0 minutes and received 4 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Anne stayed for 123.0 hours and 34.0 minutes and received 1 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Polly stayed for 24.0 hours and 0.0 minutes and received 2 treatments"
  );
});

test("Expect when a discharge is missing for patient John, we should be alerted of that and other patients should output correctly", async () => {
  await readFile("./ex2.txt");
  expect(consoleSpy).toHaveBeenCalledTimes(3);
  expect(consoleSpy).toHaveBeenCalledWith(
    "Error for patient John: no discharge added"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Anne stayed for 123.0 hours and 34.0 minutes and received 1 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Polly stayed for 24.0 hours and 0.0 minutes and received 2 treatments"
  );
});

test("Expect that when an intake is missing for patient Anne, we should be alerted of that and other patients should output correctly", async () => {
  await readFile("./ex3.txt");
  expect(consoleSpy).toHaveBeenCalledTimes(3);
  expect(consoleSpy).toHaveBeenCalledWith(
    "Error for patient Anne: no intake added"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient John stayed for 222.0 hours and 13.0 minutes and received 4 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Polly stayed for 24.0 hours and 0.0 minutes and received 2 treatments"
  );
});

test("Expect that if a discharge takes place before intake, we should be alerted of that, and other patients should be outputted correctly", async () => {
  await readFile("./ex4.txt");
  expect(consoleSpy).toHaveBeenCalledTimes(3);
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient John stayed for 222.0 hours and 13.0 minutes and received 4 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Anne stayed for 123.0 hours and 34.0 minutes and received 1 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Error for patient Polly: discharge takes place before intake"
  );
});

test("Expect to be alerted if a patient has no treatments, other patients should be outputted correctly", async () => {
  await readFile("./ex5.txt");
  expect(consoleSpy).toHaveBeenCalledTimes(3);
  expect(consoleSpy).toHaveBeenCalledWith(
    "Error for patient John: no treatments added"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Anne stayed for 123.0 hours and 34.0 minutes and received 1 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Polly stayed for 24.0 hours and 0.0 minutes and received 2 treatments"
  );
});

test("Expect to be alerted if a line does not start with a type marker or an incorrect type marker, otherwise output should be correct", async () => {
  await readFile("./ex6.txt");
  expect(consoleSpy).toHaveBeenCalledTimes(4);
  expect(consoleSpy).toHaveBeenCalledWith(
    "Error at line 6: Fun Treatment John 2023-01-07T07:11:00Z GG34 \n Invalid type marker"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient John stayed for 222.0 hours and 13.0 minutes and received 3 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Anne stayed for 123.0 hours and 34.0 minutes and received 1 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Polly stayed for 24.0 hours and 0.0 minutes and received 2 treatments"
  );
});

test("Expect to be alerted if a line has an invalid action type, otherwise output should be correct", async () => {
  await readFile("./ex7.txt");
  expect(consoleSpy).toHaveBeenCalledTimes(4);
  expect(consoleSpy).toHaveBeenCalledWith(
    "Error at line 7: Action Win John 2023-01-08T06:24:00Z BZ42 \n Invalid action type"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient John stayed for 222.0 hours and 13.0 minutes and received 3 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Anne stayed for 123.0 hours and 34.0 minutes and received 1 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Polly stayed for 24.0 hours and 0.0 minutes and received 2 treatments"
  );
});

test("Expect our input processor to be able to move through blank lines without a problem", async () => {
  await readFile("./ex8.txt");
  expect(consoleSpy).toHaveBeenCalledTimes(3);
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient John stayed for 222.0 hours and 13.0 minutes and received 4 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Anne stayed for 123.0 hours and 34.0 minutes and received 1 treatments"
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Patient Polly stayed for 24.0 hours and 0.0 minutes and received 2 treatments"
  );
});
