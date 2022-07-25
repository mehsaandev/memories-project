import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const {id} =  req.params;
    console.log(id)
    const postMessage = await PostMessage.findById(id);
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSinglePost = async (req, res) => {
  try {
    const post = req.body
    const postMessage = await PostMessage.findOne({_id: post._id });
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date()});
  console.log("Adding new post...", newPost);
  newPost
    .save()
    .then(() => {
      console.log("Saved")
      res.json(newPost);
    })
    .catch((error) => {
      console.log(error)
      res.json({ message: error.message });
    });
};

export const updatePost = async (req, res) => {
  console.log(req.params);
  const { id: _id } = req.params;
  console.log(_id);
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.send("no post with that id");

  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatePost);
};
export const deletePost = async (req, res) => {
  console.log(req.params);
  const { id: _id } = req.params;
  console.log(_id);
  // const post = req.body
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.send("no post with that id");

  const removePost = await PostMessage.findOneAndRemove({ _id: _id });
  res.json(removePost);
};
export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.send("no post with that id");

  const post = await PostMessage.findById(_id);
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index == -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatePost);
};
