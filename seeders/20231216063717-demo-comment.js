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

// Sudah diisi
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query('SELECT id FROM User;');
    const userIds = users[0].map(user => user.id);

    const posts = await queryInterface.sequelize.query('SELECT id FROM Post;');
    const postIds = posts[0].map(post => post.id);

    const comments = Array.from({ length: 10 }).map((_, index) => ({
      userId: userIds[index % userIds.length],
      postId: postIds[index % postIds.length],
      content: `This is comment ${index + 1}.`,
    }));

    await queryInterface.bulkInsert('Comment', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comment', null, {});
  },
};
