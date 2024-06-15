import { Router } from "express";
import GetStoresController from "./getStores.controller";

const router = Router();

const getStoresController = new GetStoresController();

router.post("/get/closer", [], getStoresController.getClosestStore);

export default router;