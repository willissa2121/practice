module.exports = (function (sequelize, DataTypes) {
  var users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    weightGoal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.STRING,
      allowNull: true
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userBorn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userBornToday: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })
  return users;
});