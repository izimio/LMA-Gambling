import Router from "koa-router";

const router: Router = new Router();

router.get("/", async (ctx) => {
    ctx.body = {
        message: "Bienvenue sur notre API",
        documentation: "http://votre-domaine/documentation",
        version: "1.0.0",
        status: "OK",
    };
});

router.get("/version", async (ctx) => {
    ctx.body = {
        version: "1.0.0",
        isAlive: true,
    };
});

export default router;
