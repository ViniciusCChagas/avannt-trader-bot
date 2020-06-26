const { formatDate } = require("../utils/AVNDate");
const {
  getEconomicCalendarData,
} = require("../services/EconomicCalendarService");
const { countryFlags, telegramChatId } = require("../../env");
const { telegramBot } = require("../models/TelegramBot");

/**
 * @description Function that sends the economic calendar for the Telegram Channel
 * @returns {String} plain text of the message.
 */
async function sendEconomicCalendar(req, res) {
  let events = await getEconomicCalendarData();

  let ibovSended = false;
  let ibovOpening = `🇧🇷 10:00h - Abertura do Mercado à vista (Brasileiro).\n`;
  let usaOpenig = `🇺🇸 10:30h - Abertura do Mercado à vista (Americano).\n`;
  let usaSended = false;

  let date = formatDate(new Date(), "dd/MM/yyyy");
  let text = `<b>—— Calendário Econômico ${date} ——</b> \n`;
  console.log("Enviando:  Calendário Econômico " + date);

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

  await telegramBot.sendMessage(telegramChatId, text, { parse_mode: "HTML" });
  console.log("Calendário Econômico enviado!");
  return res ? res.json({ text }) : text;
}

module.exports = {
  sendEconomicCalendar,
};
