"use strict";

module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define(
    "Message",
    {
      msg: { type: DataTypes.STRING(30), allowNull: false },
      username: { type: DataTypes.STRING(30), allowNull: false },
    },
    { tableName: "messages", freezeTableName: true, timestamps: false }
  );

  return Message;
};
