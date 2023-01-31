'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'User_1',
        email: 'user1@email.com',
        password: '123456'
      },
      {
        username: 'User_2',
        email: 'user2@email.com',
        password: '123456'
      },
      {
        username: 'User_3',
        email: 'user3@email.com',
        password: '123456'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
