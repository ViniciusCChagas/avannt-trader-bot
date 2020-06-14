const cheerio = require("cheerio");

const { investing, formatDate } = require("./functions");
const { portfolio } = require("./mapping");

const { bot, chatId } = require("./teleramBot");

async function sendPanoram() {
  let country = { us: "🇺🇸", br: "🇧🇷", eu: "🇪🇺", cn: "🇨🇳" };

  let data = formatDate(new Date(), "dd/MM/yyyy");

  let texto = `<b>—— PANORAMA ${data} ——</b> \n`;

  console.log("Enviando: " + texto);

  for (let i = 0; i < portfolio.length; i++) {
    var categoria = portfolio[i];

    var contryAnterior = categoria.itens[0].country;

    texto += `\n<b>—— ${categoria.name} ——</b>\n`;
    for (let j = 0; j < categoria.itens.length; j++) {
      var item = categoria.itens[j];
      const $ = cheerio.load(await investing(item));

      var diference = $("#chart-info-change").text();
      var percent = $("#chart-info-change-percent").text() + "%";

      if (item.country && contryAnterior != item.country) {
        contryAnterior = item.country;
        texto += `\n—————\n`;
      }

      texto += `${item.country ? country[item.country] + " " : ""}${
        item.name
      }  -  ${percent}`;

      if (diference >= 0) {
        texto += ` 🟢\n`;
      } else {
        texto += ` 🔴\n`;
      }
    }
  }
  await bot.sendMessage(chatId, texto, { parse_mode: "HTML" });
  return texto;
}

module.exports = {
  sendPanoram,
};
