import { Router } from "express";
import {
    createComment,
    deleteComment,
    getAllComments,
    updateComment,
} from "../controllers/comment.controller";
import auth from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllComments)
router.post("/create", auth, createComment)
router.put("/:id", auth, updateComment)
router.delete("/:id", auth, deleteComment)

export default router;