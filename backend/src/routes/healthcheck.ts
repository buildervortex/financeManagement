import express from "express"

const HealthCheckRoute = express.Router();

HealthCheckRoute.get("/", async (request: express.Request | any, response: express.Response) => {
    response.send({
        "status": "ok"
    })
});

export default HealthCheckRoute;