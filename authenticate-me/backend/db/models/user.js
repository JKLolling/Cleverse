'use strict';
const { Validator } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              // What type of error will this be?
              // Will it be a ValidationError and if so, what sets the type?
              throw new Error('Cannot be an email.')
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail(value) {
            if (!Validator.isEmail(value)) {
              throw new Error('Must be an email')
            }
          }
        }
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['email']
        },
        {
          unique: true,
          fields: ['username']
        }
      ]
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
