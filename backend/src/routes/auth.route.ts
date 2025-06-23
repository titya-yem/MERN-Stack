import { Router } from "express";
import {
    signIn,
    signOut
} from "../controllers/auth.controller";

const router = Router()

router.post("/signin", signIn)
router.post("/signout", signOut)
router.post("/me", )

export default router;