// import the mutation
const createUser = require("../../schemas/mutations/createUser");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

// mock the User model
jest.mock("../../models", () => {
  const User = jest.fn();
  User.create = jest.fn().mockResolvedValue({
    user_name: "test_user",
    email: "test@example.com",
    password: "hashed_password",
  });
  return { User };
});

// mock the bcrypt library
jest.mock("bcrypt", () => {
  const bcrypt = jest.fn();
  bcrypt.hash = jest.fn().mockResolvedValue("hashed_password");
  return bcrypt;
});

// define the test
describe("createUser mutation", () => {
  it("should create a new user", async () => {
    // define the mutation variables
    const variables = {
      user_name: "test_user",
      email: "test@example.com",
      password: "test_password",
    };

    // execute the mutation
    const result = await createUser.resolve(null, variables);

    // // expect the mutation to succeed
    expect(await bcrypt.compare(result.password, variables.password)).toBe(
      true
    ); // hash the password before comparing it to the expected password

    // expect the User model to be called
    expect(User.create).toHaveBeenCalledWith({
      user_name: "test_user",
      email: "test@example.com",
      password: "hashed_password",
    });

    // expect the bcrypt library to be called
    expect(bcrypt.hash).toHaveBeenCalledWith("test_password", 10);
  });
});
