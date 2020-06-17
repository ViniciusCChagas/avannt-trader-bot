const express = require("express");
const routes = require("./routes");
const CronJobService = require("./src/services/CronJobService");

const app = express();

app.use(express.json());
app.use(routes);

//port for Avannt Trader Bot = 3334
app.listen(3334);

CronJobService.init();
