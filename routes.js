const express = require("express");

const PanoramController = require("./src/controllers/PanoramController");
const EconomicCalendarController = require("./src/controllers/EconomicCalendarController");
const PlayersPositionController = require("./src/controllers/PlayersPositionController");

const routes = express.Router();

routes.get("/sendPanoram", PanoramController.sendPanoram);

routes.get("/sendEC", EconomicCalendarController.sendEconomicCalendar);

routes.get("/sendPP", PlayersPositionController.sendPlayersPosition);

routes.get("/sendAll", async (req, res)=>{
    let text = '';
    text += await PanoramController.sendPanoram();
    text += await PlayersPositionController.sendPlayersPosition();
    text += await EconomicCalendarController.sendEconomicCalendar();
    return res.json({ text });
});

module.exports = routes;
