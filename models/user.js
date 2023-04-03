const { DataTypes } = require('sequelize');
const sequelize = require('../config/database/database_connection');
const bcrypt = require('bcryptjs');

const User = sequelize.define(
  'user',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      },
      validate: {
        isEmail: { msg: 'Please provide a valid email address' },
        notNull: { msg: 'Please provide a valid email address' },
        notEmpty: { msg: 'Please provide a valid email address' },
        notUnique: { msg: 'Please provide a valid email address' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, Infinity],
          msg: 'Password should be at least 6 characters long',
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide first name' },
        notEmpty: { msg: 'First name cannot be empty' },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide last name' },
        notEmpty: { msg: 'Last name cannot be empty' },
      },
    },
  },
  {
    timestamps: false,
  }
);

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
