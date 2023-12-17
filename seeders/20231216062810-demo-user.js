/* VERSI BAWAAN */
// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };

/* sudah diisi */
'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          name: 'John Doe',
          username: 'john_doe',
          email: 'john.doe@example.com',
          password: await bcrypt.hash('password123', 10), // Ganti dengan password yang diinginkan
        },
        {
          name: 'Jane Doe',
          username: 'jane_doe',
          email: 'jane.doe@example.com',
          password: await bcrypt.hash('securepassword', 10), // Ganti dengan password yang diinginkan
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};
