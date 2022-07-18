import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  console.log("Adding new post...");
  const newPost = new PostMessage(
    post
    //   {
    //   title: "Memory2611",
    //   message: "my 3rd memory of hill side",
    //   creator: "ehsaan2611",
    //   tags: ["mountain"],
    //   selectedFile: "abc",
    //   likeCount: 0,
    //   createdAt: "2023-07-15T13:13:16.412Z"
    // }
  );
  newPost
    .save()
    .then(() => {

      res.json(newPost);
    })
    .catch((error) => {

      res.json({ message: error.message });
    });
};
