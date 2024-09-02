import express from "express"
import jwtAuth from "../middleware/jwtAuth";

const incomeRouter = express.Router();


incomeRouter.get("/:id", jwtAuth, async (request: express.Request, response: express.Response) => {

});

incomeRouter.get("/", jwtAuth, async (request: express.Request, response: express.Response) => {

});
incomeRouter.post("/", jwtAuth, async (request: express.Request, response: express.Response) => {
    // retriev the accountId from the request object which added by the jwtAuth.js
    // const accountId = request.account._id;
});

incomeRouter.put("/:id", jwtAuth, async (request: express.Request, response: express.Response) => {

});

incomeRouter.delete("/:id", jwtAuth, async (request: express.Request, response: express.Response) => {

});



export default incomeRouter;