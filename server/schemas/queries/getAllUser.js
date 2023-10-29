const graphql = require("graphql");
const { GraphQLList } = graphql;
const UserType = require("../TypeDefinition/UserType");
const { User } = require("../../models");

const getAllUser = {
  type: new GraphQLList(UserType),
  resolve(parent, args) {
    return User.findAll()
      .then((users) => {
        return users;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = getAllUser;
