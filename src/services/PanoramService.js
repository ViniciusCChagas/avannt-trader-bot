const axios = require("axios");
/**
 * @description Promise that get Panoram (Potfolio) data from Investing.com
 * @returns {Promise}
 */
function getPanoramData({pairId}) {
  return new Promise(async (resolve, reject) => {
    const response = await axios({
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
    if (response.status != 200) {
      reject("getPanoramData - Conection error status: ", response.status);
    }
    resolve(response.data.html.chart_info);
  });
}

module.exports = {
  getPanoramData,
};
