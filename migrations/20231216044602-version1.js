'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * termasuk membuat table baru , menambah column baru
     * NOTE :
     * VERSION 1 : Membuat table user , post dan comment
     */

    // Menambah Table User 
    await queryInterface.createTable( "User", {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING(200),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
    } ) ,

    // Menambah Table Post
    await queryInterface.createTable( "Post", {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: "id",
            }
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    } ) ,

    // Menambah Table Comment
    await queryInterface.createTable("Comment", {
      id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
      },
      postId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "Post",
              key: "id",
          },
      },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "User",
              key: "id",
          },
      },
      content: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
    } );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.dropTable("Comments");
      await queryInterface.dropTable("Post");
      await queryInterface.dropTable("User");
  }
};
