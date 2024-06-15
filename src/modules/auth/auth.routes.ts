import { Router } from "express";
import AuthController from "./auth.controller";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Service for login and create token
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Login]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username
 *                 example: "test@gmail.com"
 *               password:
 *                 type: string
 *                 description: password
 *                 example: "123"
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "666db388ea88728ce9819b4d"
 *                     email:
 *                       type: string
 *                       example: "test@gmail.com"
 *                     name:
 *                       type: string
 *                       example: "Cliente 1"
 *                     timezone:
 *                       type: string
 *                       example: "America/Bogota"
 *                     location:
 *                       type: object
 *                       properties:
 *                         iso3_country:
 *                           type: string
 *                           example: "COL"
 *                         city:
 *                           type: string
 *                           example: "Medellin"
 *                         state:
 *                           type: string
 *                           example: "Antioquia"
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: number
 *                           example: [6.244203, -75.581211]
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *                   example: "eyJhbG..."
 *                 msg:
 *                   type: string
 *                   example: "token success"
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
 *                   example: "Wrong username or password"
 *                 name:
 *                   type: string
 *                   example: "Unauthorized"
 *                 ok:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please provide WWW-Authorization using basic in headers with base 64 encoding"
 *                 name:
 *                   type: string
 *                   example: "Error"
 *                 ok:
 *                   type: boolean
 *                   example: false
 */
router.post("/login", [], authController.login);

export default router;



