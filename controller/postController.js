const { ResponseError } = require("../error/error_Response");
const { Post, User } = require("../models/assosiation");
const {
    createPostValidation,
    getPostValidation,
    updatePostValidation,
} = require("../validator/postValidate");
const { validate } = require("../validator/validation");

const index = () => {
    return Post.findAll({
        where: {
            published: true,
            deletedAt: null,
        },
        attributes: {
            exclude: ["userId"],
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["name", "username", "email"],
            },
        ],
    });
};

const create = (user, request) => {
    const post = validate(createPostValidation, request);
    post.userId = user.id;
    post.slug = post.title.toLowerCase().split(" ").join("-");

    return Post.create(post);
};

const get = (postId) => {
    postId = validate(getPostValidation, postId);
    return Post.findOne({
        where: {
            id: postId,
        },
        attributes: ["id", "title", "content", "slug"],
        include: [
            {
                model: User,
                as: "user",
                attributes: ["name", "username", "email"],
            }
        ],
    });
};

const update = async (request) => {
    const postRequest = validate(updatePostValidation, request);
    const post = await Post.findByPk(postRequest.id, {
        where: {
            deletedAt: null,
        },
    });

    if (!post) {
        throw new ResponseError(404, "Post not found");
    }

    post.title = postRequest.title || post.title;
    post.content = postRequest.content || post.content;
    post.slug =
        postRequest.title.toLowerCase().split(" ").join("-") ||
        post.title.toLowerCase().split(" ").join("-");
    post.published = postRequest.published;

    return post.save();
};

const remove = (postId) => {
    postId = validate(getPostValidation, postId);
    return Post.update({
        deletedAt: new Date(),
    }, {
        where: {
            id: postId,
        },
    });
};

module.exports = postService = { index, create, get, update, remove };