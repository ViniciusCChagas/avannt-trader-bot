const { formatDate } = require("../utils/AVNDate");
const {
  getPlayersPositionData,
} = require("../services/PlayersPositionService");
const { telegramChatId } = require("../../env");
const { telegramBot } = require("../models/TelegramBot");

/**
 * @description Function that sends the Foreigner's Position for the Telegram Channel
 * @returns {String} plain text of the message.
 */
async function sendPlayersPosition(req, res) {
  let positions = await getPlayersPositionData();
  let date = formatDate(new Date(), "dd/MM/yyyy");
  console.log("Enviando:  Posição dos Players " + date);

  let text = `<b>—— Posição dos Players ${date} ——</b> \n`;

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    let position = new Number(pos.position).toLocaleString("pt-BR").replace(",", ".");

    text += `${pos.description}: ${position}`;

    if (pos.position > 0) {
      text += ` 🟢\n`;
    } else if (pos.position < 0) {
      text += ` 🔴\n`;
    } else {
      text += ` ⚪️\n`;
    }
  }

  await telegramBot.sendMessage(telegramChatId, text, { parse_mode: "HTML" });
  console.log("Posição dos Players enviado!");
  return res ? res.json({ text }) : text;
}

module.exports = {
  sendPlayersPosition,
};
