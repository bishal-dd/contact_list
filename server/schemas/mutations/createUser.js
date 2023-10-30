const graphql = require("graphql");
const { GraphQLString } = graphql;
const UserType = require("../TypeDefinition/UserType");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const createUser = {
  type: UserType,
  args: {
    user_name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const hashedPassword = await bcrypt.hash(args.password, 10); // 10 is the number of salt rounds

    User.create({
      user_name: args.user_name,
      email: args.email,
      password: hashedPassword,
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
    return args;
  },
};

module.exports = createUser;
