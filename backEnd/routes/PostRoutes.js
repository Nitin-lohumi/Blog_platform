const express = require('express');
const getpost = express.Router();
const validateBlogPost = require("../middleware/validateBlogPost");
const GetAllposts = require("../controlers/GetAllposts");
const ControlAddRemoveLikes = require("../controlers/ControlAddRemoveLikes");
getpost.get("/BlogPosts/:id",validateBlogPost,GetAllposts);
getpost.post("/BlogPost/like/:id",validateBlogPost,ControlAddRemoveLikes);
module.exports = getpost;