import express, { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors'


import accountRouter from '../routes/account';

// uses dependency injection to get the express object to add the route handling middlewares
export default function configRoute(app: Application) {
    /* add the middlewares */
    // use the cors middlware to add cros origin request
    app.use(cors());
    // used to add security headers to protect against well known vulnerabilities
    app.use(helmet());
    // add the json middlware to parse the body to json and replace the body with parsed json content
    app.use(express.json());
    // add the compression middlware to reduce the size of the response
    app.use(compression());
    // add the logging middelware
    app.use(morgan("combined"));


    // config the routers
    app.use("/api/v1/accounts", accountRouter);
}
