'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('messages', [
      {
        username: "hamtaro",
        msg: "I like ham and taro!"
      },
      {
        username: "Queen of England",
        msg: "Get those plebs away!"
      },
      {
        username: "Scotch Egg",
        msg: "Yolk is good."
      }
  ], {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('messages', null, {});
  }
};
