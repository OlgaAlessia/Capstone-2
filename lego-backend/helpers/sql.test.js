
const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

test("works: example w/users", function () {
  const { setCols, values } = sqlForPartialUpdate({
    firstName: "Banana",
    email: "banana@aol.com"
  }, {
    firstName: "first_name",
    lastName: "last_name"
  });
  expect(setCols).toEqual('"first_name"=$1, "email"=$2');
  expect(values).toEqual(["Banana", "banana@aol.com"]);
});

test("BadRequestError: example w/users", function () {
  try {
    const { setCols, values } = sqlForPartialUpdate({}, {
      firstName: "first_name",
      lastName: "last_name"
    });
  } catch (err) {
    expect(err instanceof BadRequestError).toBeTruthy();
  }
});