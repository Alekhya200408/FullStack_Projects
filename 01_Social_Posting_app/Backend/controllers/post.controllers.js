import PostModel from "../models/post.js";

// for creating the posts
export const CreatePost=async (req,res) => {
    try {
        const {name,content}=req.body

        if (!name||!content) {
            return res.status(400).json({message:"All fields are required"})
        }

        const post=await PostModel.create({name,content})

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
         const post=await PostModel.findByIdAndUpdate(
            req.params.id,
            {$inc:{likes:1}},
            {new:true}
         )

         if (!post) {
            res.status(404).json({message:"Post nort found"})
         }
         res.json(post)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const DeletePost=async (req,res) => {
    try {
        const post=await PostModel.findByIdAndDelete(
            req.params.id
        )

        if (!post) {
            res.status(404).json({message:"Post is required"})  
        }
        res.json({
            message:"This post is deleted",
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