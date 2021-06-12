'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track',
    {
      lyrics: DataTypes.TEXT,
      band: DataTypes.STRING,
      featuring: DataTypes.STRING,
      title: DataTypes.STRING,
      albumCover: DataTypes.STRING,
      albumTitle: DataTypes.STRING,
      seedGenerated: DataTypes.BOOLEAN,
    }, {});
  Track.associate = function (models) {
    Track.hasMany(models.Annotation, { foreignKey: 'trackId' })
  };
  return Track;
};
