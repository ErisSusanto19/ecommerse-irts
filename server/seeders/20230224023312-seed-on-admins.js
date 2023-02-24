'use strict';

const { hashPwd } = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const admins = require('../db/admin.json').map(el => {
    el.password = hashPwd(el.password)
    el.createdAt = el.updatedAt = new Date()
    return el
   })
   await queryInterface.bulkInsert("Admins", admins)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Admins')
  }
};
