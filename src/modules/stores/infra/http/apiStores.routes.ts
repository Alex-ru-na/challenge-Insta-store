import { Router } from "express";
import GetStoresController from "../../app/controller/getStores.controller";

const router = Router();

const getStoresController = new GetStoresController();

router.post("/get-stores/closer", [], getStoresController.getClosestStore);

export default router;