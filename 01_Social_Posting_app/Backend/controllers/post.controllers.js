import PostModel from "../models/post.js";
import User from "../models/User.js";

// for creating the posts
export const CreatePost=async (req,res) => {
    try {
        const {name,content}=req.body

        if (!content) {
            return res.status(400).json({message:"Content is required"})
        }

        const post=await PostModel.create({username:req.user.username,name,content})

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// For get all posts together
export const GetAllPost=async (req,res) => {
    try {
        const posts=await PostModel.find().sort({createdAt:-1})
    res.json(posts)  
    } catch (error) {
        res.status(500).json({ error: error.message })
    }  
}

// for like the post
export const LikePost=async (req,res) => {
    try {
         const post = await PostModel.findById(req.params.id)

    // ✅ check post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    const username = req.user.username

    // ✅ safe check
    if (!post.likedBy) {
      post.likedBy = []
    }

    // ❌ already liked
    if (post.likedBy.includes(username)) {
      return res.status(400).json({ message: "Already liked" })
    }

    // ✅ like
    post.likes += 1
    post.likedBy.push(username)

    await post.save()

    res.json(post) 
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const DeletePost=async (req,res) => {
    try {
        const post = await PostModel.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    if (post.username !== req.user.username) {
      return res.status(403).json({ message: "Not allowed" })
    }

    await PostModel.findByIdAndDelete(req.params.id)

    res.json({
      message: "Post deleted successfully",
      post
    })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

// For edit the post 
export const updatePost = async (req, res) => {
  try {
    const { content } = req.body

    if (post.username !== req.user.username) {
  return res.status(403).json({ message: "Not allowed" })
}
    if (!content) {
      return res.status(400).json({ message: "Content is required" })
    }

    const post = await PostModel.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    )

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}