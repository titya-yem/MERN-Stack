import { Router } from "express";
import {
    createService,
    deleteService,
    getAllServices,
    updateService,
} from "../controllers/service.controller";
import admin from "../middlewares/admin.middleware";
import auth from "../middlewares/auth.middleware";

const router = Router()

router.get("/", getAllServices);
router.post("/create", auth, admin, createService);
router.put("/:id", auth, admin, updateService);
router.delete("/:id", auth, admin, deleteService);

export default router