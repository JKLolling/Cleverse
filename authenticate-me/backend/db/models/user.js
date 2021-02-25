'use strict';
const { Validator } = require('sequelize')
const bcrypt = require('bcryptjs')

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
      ],
      defaultScope: {
        attributes: {
          exclude: ['email', 'hashedPassword', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: ['hashedPassword']
          }
        },
        loginUser: {
          attributes: {}
        }
      },
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Annotation, { foreignKey: 'userId' })
  };

  // This is a way to add class methods to user
  // There is alternative syntax in the docs that allows us to add the methods directly
  User.prototype.toSafeObject = function () {
    const { id, username, email } = this
    return { id, username, email }
  }

  User.prototype.validatePassword = function (password) {

    return bcrypt.compareSync(password, this.hashedPassword.toString())
  }

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id)
  }

  //What the fuck is a credential?
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize')
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        }
      }
    })
    if (user && user.validatePassword(password)) {
      return User.getCurrentUserById(user.id)
    }
  }

  User.signup = async function (username, email, password) {
    // The reading says to do it w/ hashSync. Why
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      username,
      email,
      hashedPassword
    })
    return User.getCurrentUserById(user.id)
  }
  return User;
};
