const axios = require("axios");

const cheerio = require("cheerio");

function callInvesting(pairId) {
  return axios({
    method: "GET",
    url:
      "https://www.investing.com/common/modules/js_instrument_chart/api/data.php",
    params: {
      pair_id: pairId,
      pair_interval: "86400", // 1 day
      chart_type: "area", // 'area', 'candlestick'
      candle_count: "90", // days
      volume_series: "yes",
      events: "yes",
      period: "",
    },
    headers: {
      Referer: "https://www.investing.com/",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
}

async function investing(input) {
  try {
    if (!input) {
      throw Error("Parameter input is required");
    }

    const response = await callInvesting(input.pairId);
    if (!response.data.html.chart_info) {
      throw Error("No response.data.html.chart_info found");
    }

    return response.data.html.chart_info;
  } catch (err) {
    console.log(err.message);
  }
}

function formatDate(x, y) {
  var z = {
    M: x.getMonth() + 1,
    d: x.getDate(),
    h: x.getHours(),
    m: x.getMinutes(),
    s: x.getSeconds(),
  };
  y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
    return ((v.length > 1 ? "0" : "") + eval("z." + v.slice(-1))).slice(-2);
  });

  return y.replace(/(y+)/g, function (v) {
    return x.getFullYear().toString().slice(-v.length);
  });
}

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
      reject("Conection Error status: ", response.status);
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
  investing,
  callInvesting,
  formatDate,
  getEconomicCalendarData,
};
