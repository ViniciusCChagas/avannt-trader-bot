const cheerio = require("cheerio");

const {
  investing,
  formatDate,
  getEconomicCalendarData,
} = require("./functions");
const { portfolio } = require("./mapping");

const { bot, chatId } = require("./teleramBot");

const countryFlags = { EUA: "🇺🇸", BR: "🇧🇷", EUR: "🇪🇺", CN: "🇨🇳" };

async function sendPanoram() {
  let data = formatDate(new Date(), "dd/MM/yyyy");

  let texto = `<b>—— Panorama ${data} ——</b> \n`;

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
  await bot.sendMessage(chatId, texto, { parse_mode: "HTML" });
  return texto;
}

async function sendEconomicCalendar() {
  let events = await getEconomicCalendarData();

  let ibovSended = false;
  let ibovOpening = `🇧🇷 10:00h - Abertura do Mercado à vista (Brasileiro).\n`;
  let usaOpenig = `🇺🇸 10:30h - Abertura do Mercado à vista (Americano).\n`;
  let usaSended = false;

  let date = formatDate(new Date(), "dd/MM/yyyy");
  let text = `<b>—— Calendário Econômico ${date} ——</b> \n`;
  console.log("Enviando: " + text);

  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    let [our, minutes] = event.time.split(":");
    if (parseInt(our) >= 8 && parseInt(our) <= 18) {
      if (parseInt(our) >= 10 && parseInt(minutes) >= 00 && !ibovSended) {
        ibovSended = true;
        text += ibovOpening;
      }

      if (parseInt(our) >= 10 && !usaSended) {
        if (
          (parseInt(our) == 10 && parseInt(minutes) >= 30) ||
          parseInt(our) > 10
        ) {
          usaSended = true;
          text += usaOpenig;
        }
      }
      let flag = "";
      if (event.country == "Zona Euro") {
        flag = countryFlags["EUR"];
      } else if (event.country == "Brasil") {
        flag = countryFlags["BR"];
      } else if (event.country == "China") {
        flag = countryFlags["CN"];
      } else {
        flag = countryFlags[event.country];
      }

      text += `${flag} ${event.time}h -  ${event.descriptrion}.\n`;
    }
  }

  if (!ibovSended) {
    text += ibovOpening;
  }

  if (!usaSended) {
    text += usaOpenig;
  }

  await bot.sendMessage(chatId, text, { parse_mode: "HTML" });
  return text;
}

module.exports = {
  sendPanoram,
  sendEconomicCalendar,
};
