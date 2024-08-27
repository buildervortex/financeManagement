import mongoose from "mongoose";
import c from "config";
import debug from "debug";

// connect with the mongodb database using the given connection string throug the configurations
export default function configDatabase() {
    mongoose.connect(c.get("database.connectionString")).then(() => { console.log("connected with the database") }).catch(reason => {
        debug("error")(`An error occoured when trying to connect with the database. The reason is "${reason}"`)
    })
}