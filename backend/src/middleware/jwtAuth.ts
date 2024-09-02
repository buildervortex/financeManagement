import jwt from "jsonwebtoken";
import config from "config";
import express from "express"
import ErrorMessage from "../model/error";

export default function jwtAuth(request: express.Request, response: express.Response, next: express.NextFunction) {
    if (!config.get("jwtEnable")) {
        return next();
    }

    const token = request.header("x-auth-token");
    if (!token) return response.status(401).send(ErrorMessage.errorMessageFromString("Access denided.No token Provided"));

    try {
        const decoded = jwt.verify(token, config.get("jwtSymerticKey"));
        // decoded = {_id:<accountId>}
        // inject the decoded into the request object.
        // request.account = decoded.
        (request as any).account = decoded;
    }
    catch (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromString("Access denided. Invalid token"));
    }
    next();
}

