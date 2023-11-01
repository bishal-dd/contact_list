const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const createUser = require("./createUser");
const createContact = require("./createContact");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUser,
    createContact: createContact,
  },
});

module.exports = Mutation;
