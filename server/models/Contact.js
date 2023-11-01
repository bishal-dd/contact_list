module.exports = (sequelize, DataTypes) => {
  const validation = {
    notEmpty: true,
  };

  const Contact = sequelize.define("Contact", {
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: validation,
    },

    contact_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: validation,
    },

    contact_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: validation,
    },
  });

  Contact.associate = (models) => {
    // Define a one-to-many relationship
    Contact.belongsTo(models.User, {
      foreignKey: "userId", // This is the foreign key in the Contact model
    });
  };

  return Contact;
};
