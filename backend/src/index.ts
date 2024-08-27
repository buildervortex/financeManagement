import express, { Application } from "express";
import configRoute from "./startups/routes";
import setupConfigure from "./startups/config";
import c from "config";
import configDatabase from "./startups/db";

// check for application configurations such as environment variables
setupConfigure();

// create the express application
const app: Application = express();

// configure all middlware routes
configRoute(app);

// configure the database. connect with the mongodb database.
configDatabase();

// configure the server and the port number
const PORT = parseInt(c.get("port")) || 4050;
app.listen(PORT, () => {
    console.log(`The application listen on port ${PORT}`);
})