import { Router } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    updateUser,
} from "../controllers/user.controller";

const router = Router()

router.get("/", getAllUsers);
router.post("/create", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router