const axios = require("axios");

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

module.exports = {
  investing,
  callInvesting,
  formatDate,
};
