import { Router } from "express";
import { createContact, getAllContacts } from "../controllers/contact.controller";
import admin from "../middlewares/admin.middleware";
import auth from "../middlewares/auth.middleware";

const router = Router();

router.get("/", auth, admin, getAllContacts);
router.post("/create", auth, createContact);

export default router;