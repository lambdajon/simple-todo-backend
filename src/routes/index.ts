import { NextFunction, Router } from "express";
const router = Router({ mergeParams: true });
import authRoutes from "./auth";
import todoGroup from "./todoGroup";
import todo from "./todo";
import Auth from "../middlewares/auth";
router.use("/auth", authRoutes);
router.use("/todo-groups", Auth.checkAuth, todoGroup);
router.use("/todo", Auth.checkAuth, todo);

export default router;
