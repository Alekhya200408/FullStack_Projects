import express from "express"
import { CreatePost,GetAllPost,updatePost,LikePost,DeletePost } from "../controllers/post.controllers.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router=express.Router()

router.post("/",authMiddleware,CreatePost)
router.get("/",GetAllPost)
router.put("/:id",authMiddleware,updatePost)
router.put("/:id/like",authMiddleware,LikePost)
router.delete("/:id",authMiddleware,DeletePost)

export default router