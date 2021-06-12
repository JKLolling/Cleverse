'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lyrics: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      band: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      featuring: {
        type: Sequelize.STRING(100)
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      albumCover: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      albumTitle: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      seedGenerated: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tracks');
  }
};
