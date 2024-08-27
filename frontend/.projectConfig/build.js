const fs = require("fs");

const configJsonFile = fs.readFileSync("src/config/backend.json", "utf-8");
let jsonData = JSON.parse(configJsonFile);

jsonData.apiBaseUrl = process.env.FMAPIBASEURL || "http://localhost:4040/api/v1";

const updatedJsonData = JSON.stringify(jsonData, null, 2);

fs.writeFileSync("src/config/backend.json", updatedJsonData);