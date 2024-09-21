import express, { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors'

import incomeRouter from '../routes/income';
import accountRouter from '../routes/account';
import expenseRouter from '../routes/expense';
import subscriptionRouter from '../routes/subscription';
import goalRouter from '../routes/goal';
import notificationRouter from '../routes/notification';
import HealthCheckRoute from '../routes/healthcheck';

// uses dependency injection to get the express object to add the route handling middlewares
export default function configRoute(app: Application) {
    /* add the middlewares */
    // use the cors middlware to add cros origin request
    app.use(cors());
    // configure the headers
    app.use((req, res, next) => {
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
        res.header("Access-Control-Expose-Headers", "x-auth-token");
        next();
    })

    // used to add security headers to protect against well known vulnerabilities
    app.use(helmet());
    // add the json middlware to parse the body to json and replace the body with parsed json content
    app.use(express.json());
    // add the compression middlware to reduce the size of the response
    app.use(compression());
    // add the logging middelware
    app.use(morgan("combined"));

    // add health check route
    app.use("/health", HealthCheckRoute)

    // config the routers
    app.use("/api/v1/accounts/notification", notificationRouter)
    app.use("/api/v1/accounts", accountRouter);
    app.use("/api/v1/incomes", incomeRouter);
    app.use("/api/v1/expenses", expenseRouter)
    app.use("/api/v1/subscriptions", subscriptionRouter)
    app.use("/api/v1/goals", goalRouter)
}
