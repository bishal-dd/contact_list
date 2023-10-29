const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const createUser = require("./createUser");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUser,
  },
});

module.exports = Mutation;
