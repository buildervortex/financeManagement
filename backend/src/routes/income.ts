import express from "express"
import jwtAuth from "../middleware/jwtAuth";

const incomeRouter = express.Router();


incomeRouter.post("/addIncome",jwtAuth, async (request: express.Request, response: express.Response) => {

});

incomeRouter.post("/updateIncome",jwtAuth, async (request: express.Request, response: express.Response) => {

});

incomeRouter.post("/deleteIncome",jwtAuth, async (request: express.Request, response: express.Response) => {

});


export default incomeRouter;