module.exports = (sequelize, DataTypes) => {
  const ClientInfo = sequelize.define("ClientInfo", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return ClientInfo;
};
