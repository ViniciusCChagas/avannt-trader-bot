const axios = require("axios");
const cheerio = require("cheerio");
/**
 * @description Promise that get Economic Calendar from Investing.com
 * @returns {Promise}
 */
function getEconomicCalendarData() {
  return new Promise(async (resolve, reject) => {
    const countries = [5, 32, 37, 72];
    const importances = [2, 3];

    const response = await axios({
      method: "GET",
      url: "http://br.investing.com/economic-calendar/",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36",
      },
      params: {
        timeZone: 12,
        country: countries,
        importance: importances,
        timeFilter: "timeRemain",
        timeFrame: "today",
        submitFilters: 1,
        limit_from: 0,
      },
    });
    if (response.status != 200) {
      reject("getEconomicCalendarData - Conection error status: ", response.status);
    }

    let events = [];
    const $ = cheerio.load(response.data);
    $(".js-event-item").each(function () {
      var cols = $(this).find("td");
      var econ_event = {
        id: $(this).attr("id"),
        datetime: $(this).attr("data-event-datetime"),
        time: $(cols["0"]).text(),
        country: $(cols["1"]).find("span").attr("title"),
        currency: $(cols["1"]).text().trim(),
        importance: $(cols["2"]).attr("data-img_key"),
        descriptrion: $(cols["3"]).text().trim(),
      };
      events.push(econ_event);
    });
    resolve(events);
  });
}

module.exports = {
  getEconomicCalendarData,
};
