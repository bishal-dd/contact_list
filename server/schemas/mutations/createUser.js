const graphql = require("graphql");
const { GraphQLString } = graphql;
const UserType = require("../TypeDefinition/UserType");
const { User } = require("../../models");

const createUser = {
  type: UserType,
  args: {
    user_name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent, args) {
    User.create({
      user_name: args.user_name,
      email: args.email,
      password: args.password,
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
    return args;
  },
};

module.exports = createUser;
