const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const createUser = require("./createUser");
const createContact = require("./createContact");
const updateContact = require("./updateContact");
const deleteContact = require("./deleteContact");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUser,
    createContact: createContact,
    updateContact: updateContact,
    deleteContact: deleteContact,
  },
});

module.exports = Mutation;
