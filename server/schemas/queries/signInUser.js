const { GraphQLObjectType, GraphQLString } = require("graphql");
const bcrypt = require("bcrypt"); // For password hashing and comparison
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const signInUser = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const user = await User.findOne({ where: { email: args.email } });

    if (user) {
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(
        args.password,
        user.password
      );

      if (isPasswordValid) {
        // Generate a JWT token
        const token = jwt.sign(
          { userId: user.id, email: args.email },
          process.env.JWT_SECRET
        );
        return token;
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("User not found");
    }
  },
};

module.exports = signInUser;
