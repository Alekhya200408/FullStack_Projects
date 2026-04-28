import express from "express"
import { CreatePost,GetAllPost,updatePost,LikePost,DeletePost } from "../controllers/post.controllers.js"

const router=express.Router()

router.post("/",CreatePost)
router.get("/",GetAllPost)
router.put("/:id",updatePost)
router.put("/:id/like",LikePost)
router.delete("/:id",DeletePost)

export default router