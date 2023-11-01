const graphql = require("graphql");
const { GraphQLString, GraphQLInt, GraphQLID } = graphql;
const ContactType = require("../TypeDefinition/ContactType");
const { Contact } = require("../../models");

const createContact = {
  type: ContactType,
  args: {
    contact_name: { type: GraphQLString },
    contact_email: { type: GraphQLString },
    contact_number: { type: GraphQLInt },
    userId: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    Contact.create({
      contact_name: args.contact_name,
      contact_email: args.contact_email,
      contact_number: args.contact_number,
      userId: args.userId,
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
    return args;
  },
};

module.exports = createContact;
