const cheerio = require("cheerio");
const { formatDate } = require("../utils/AVNDate");
const { getPanoramData } = require("../services/PanoramService");
const { countryFlags, portfolio, telegramChatId } = require("../../env");
const { telegramBot } = require("../models/TelegramBot");

/**
 * @description Function that sends the Panoram (Portfolio) for the Telegram Channel
 */
async function sendPanoram(req, res) {
  let data = formatDate(new Date(), "dd/MM/yyyy");

  let texto = `<b>—— Panorama ${data} ——</b> \n`;
  console.log("Enviando: Panorama " + data);

  for (let i = 0; i < portfolio.length; i++) {
    var categoria = portfolio[i];

    var contryAnterior = categoria.itens[0].country;

    texto += `\n<b>—— ${categoria.name} ——</b>\n`;
    for (let j = 0; j < categoria.itens.length; j++) {
      var item = categoria.itens[j];
      const $ = cheerio.load(await getPanoramData(item));

      var diference = $("#chart-info-change").text();
      var percent = $("#chart-info-change-percent").text() + "%";

      if (item.country && contryAnterior != item.country) {
        contryAnterior = item.country;
        texto += `\n—————\n`;
      }

      texto += `${item.country ? countryFlags[item.country] + " " : ""}${
        item.name
      }  -  ${percent}`;

      if (diference >= 0) {
        texto += ` 🟢\n`;
      } else {
        texto += ` 🔴\n`;
      }
    }
  }
  await telegramBot.sendMessage(telegramChatId, texto, { parse_mode: "HTML" });
  console.log("Panorama enviado!");
  return res.json({ texto });
}

module.exports = {
  sendPanoram,
};
