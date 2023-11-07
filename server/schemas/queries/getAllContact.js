const graphql = require("graphql");
const { GraphQLList } = graphql;
const { Contact } = require("../../models");
const ContactType = require("../TypeDefinition/ContactType");

const getAllContact = {
  type: new GraphQLList(ContactType),
  args: {
    userId: { type: graphql.GraphQLInt },
  },
  resolve(parent, args) {
    return Contact.findAll(
      { where: { userId: args.userId, isActive: true } },
      { order: [["id", "ASC"]] }
    )
      .then((contacts) => {
        return contacts;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = getAllContact;
