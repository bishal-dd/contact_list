module.exports = (sequelize, DataTypes) => {
  const validation = {
    notEmpty: true,
  };

  const User = sequelize.define("User", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: validation,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: validation,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: validation,
    },
  });

  return User;
};
