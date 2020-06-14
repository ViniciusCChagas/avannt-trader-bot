const cron = require("node-cron");
const panoram = require("./panoram");

const { bot, chatId } = require("./teleramBot");

function startCronJobs() {
  //Cron Schedule for senPanoram (Every weekday at 8:30am)

  const cronPanoram = cron.schedule("30 8 * * 1-5", () => {
    panoram.sendPanoram();
  });
  cronPanoram.start();
}

module.exports = {
    startCronJobs
}