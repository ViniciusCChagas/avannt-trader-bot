process.env.NTBA_FIX_319 = 1;

const TelegramBot = require("node-telegram-bot-api");
const { telegramToken } = require("../../env");

const telegramBot = new TelegramBot(telegramToken, {
  polling: true,
  parse_mode: "HTML",
});

module.exports = {
  telegramBot,
};
