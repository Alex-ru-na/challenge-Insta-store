import { Router } from "express";
import { authToken} from "../../common/middlewares/validateAuth";
import GetStoresController from "./stores.controller";

const router = Router();
const getStoresController = new GetStoresController();

/**
 * @swagger
 * /api/v1/stores/get/closer:
 *   post:
 *     summary: Get the closest store
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   timezone:
 *                     type: string
 *                     example: "America/Bogota"
 *                   location:
 *                     type: object
 *                     properties:
 *                       iso3_country:
 *                         type: string
 *                         example: "COL"
 *                       city:
 *                         type: string
 *                         example: "Medellin"
 *                       state:
 *                         type: string
 *                         example: "Antioquia"
 *                       coordinates:
 *                         type: array
 *                         items:
 *                           type: number
 *                         example: [40.7128, -74.0060]
 *     responses:
 *       200:
 *         description: Store found success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 storeId:
 *                   type: string
 *                   example: "666d4c3f7f9d2943dfc9b876"
 *                 storeName:
 *                   type: string
 *                   example: "Tienda A"
 *                 isOpen:
 *                   type: boolean
 *                   example: true
 *                 coordinates:
 *                   type: array
 *                   items:
 *                     type: number
 *                   example: [-99.133209, 19.432608]
 *                 nextDeliveryTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-15T23:00:00.000Z"
 *                 ok:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Invalid Bearer token"
 *                 ok:
 *                   type: boolean
 *                   example: false
 */
router.post("/get/closer", [authToken], getStoresController.getClosestStore);

export default router;