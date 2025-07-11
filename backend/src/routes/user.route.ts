import { Router } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    updateUser,
} from "../controllers/user.controller";
import admin from "../middlewares/admin.middleware";
import auth from "../middlewares/auth.middleware";

const router = Router()

router.get("/", auth, admin, getAllUsers);
router.post("/signup", createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router