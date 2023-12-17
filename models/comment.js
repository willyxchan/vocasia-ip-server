"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
       
    }
    Comment.init(
        {
            postId: DataTypes.UUID,
            userId: DataTypes.UUID,
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Comment",
        }
    );
    return Comment;
};