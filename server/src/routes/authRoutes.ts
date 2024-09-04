import Router from "koa-router";

import { getAuthCode, verifyAuthCode } from "../controllers/authController";

const router: Router = new Router();

router.prefix("/auth");

router.get("/", getAuthCode);
router.post("/", verifyAuthCode);

export default router;
