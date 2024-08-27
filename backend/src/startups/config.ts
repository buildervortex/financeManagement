import c from "config";
import debug from "debug";

export default function setupConfigure() {

    /* check for the required configurations are available */
    if (!c.get("port")) {
        debug("error")("The port number is not defined in the configurations");
        process.exit(4);
    }
    if (!c.get("database.connectionString")) {
        debug("error")("The connection string for the mongodb database is not defined in the configurations");
        process.exit(5);
    }
}