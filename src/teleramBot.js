const TelegramBot = require("node-telegram-bot-api");

const token = "1234527235:AAEeLxkELjSVft3bdRh1YbWV05IYnmYHd_A";

const bot = new TelegramBot(token, { polling: true, parse_mode: "HTML" });

const chatId = "-1001232919318";

module.exports = {
  bot,
  chatId,
};
