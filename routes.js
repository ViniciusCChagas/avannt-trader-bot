const express = require("express");

const PanoramController = require("./src/controllers/PanoramController");
const EconomicCalendarController = require("./src/controllers/EconomicCalendarController");

const routes = express.Router();

routes.get("/sendPanoram", PanoramController.sendPanoram);

routes.get("/sendEC", EconomicCalendarController.sendEconomicCalendar);

module.exports = routes;
