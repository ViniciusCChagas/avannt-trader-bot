const cron = require("node-cron");
const PanoramController = require("../controllers/PanoramController");
const EconomicCalendarController = require("../controllers/EconomicCalendarController");
const PlayersPositionController = require("../controllers/PlayersPositionController");

/**
 * @description inits the cronJobService
 */
function init() {
  //Cron Schedule for senPanoram  and sendEC (Every weekday at 8:30am)
  const cronPanoram = cron.schedule("30 8 * * 1-5", async () => {
    await PanoramController.sendPanoram();
    await PlayersPositionController.sendPlayersPosition();
    await EconomicCalendarController.sendEconomicCalendar();
  });
  cronPanoram.start();
}

module.exports = {
  init,
};
