import { Router } from "express";
import {
    createAppointment,
    deleteAppointment,
    getAllAppointments
} from "../controllers/appointment.controller";
import admin from "../middlewares/admin.middleware";
import auth from "../middlewares/auth.middleware";

const router = Router();

router.get("/", auth, getAllAppointments)
router.post("/create", auth, admin, createAppointment)
router.delete("/:id", auth, admin, deleteAppointment)

export default router;