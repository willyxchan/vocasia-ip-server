"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
       
    }
    Post.init(
        {
            userId: DataTypes.UUID,
            title: DataTypes.STRING,
            slug: DataTypes.STRING,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    return Post;
};