'use strict';
const faker = require('faker')
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fakePeople = []
    for (let i = 0; i < 10; i++) {
      fakePeople.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync('password'),
        seedGenerated: true,
      })
    }
    fakePeople.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync('password')
    })
    return queryInterface.bulkInsert('Users', fakePeople, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Users', {
      seedGenerated: true
    }, {});
  }
};
