import Router from "koa-router";
import { authMiddleware } from "../middlewares/auth";
import * as methods from "../controllers/gamblingController";

const router: Router = new Router();

router.prefix("/gambling");

router.post("/", authMiddleware, methods.createGambling);
router.post("/:gamblingId/vote", authMiddleware, methods.voteGambling);
router.get("/:gamblingId", methods.getGambling);
router.get("/", methods.getGamblings);

export default router;
