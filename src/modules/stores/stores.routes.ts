import { Router } from "express";
import { authToken} from "../../common/middlewares/validateAuth";
import GetStoresController from "./getStores.controller";

const router = Router();
const getStoresController = new GetStoresController();

router.post("/get/closer", [authToken], getStoresController.getClosestStore);

export default router;