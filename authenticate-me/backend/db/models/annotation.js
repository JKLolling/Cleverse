'use strict';
module.exports = (sequelize, DataTypes) => {
  const Annotation = sequelize.define('Annotation', {
    userId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER,
    annotation: DataTypes.TEXT,
    lyric: DataTypes.TEXT,
    startIndex: DataTypes.INTEGER,
    endIndex: DataTypes.INTEGER,
    seedGenerated: DataTypes.BOOLEAN
  }, {});
  Annotation.associate = function (models) {
    Annotation.belongsTo(models.Track, { foreignKey: 'trackId' })
    Annotation.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Annotation;
};
