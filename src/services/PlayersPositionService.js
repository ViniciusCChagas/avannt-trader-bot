const axios = require("axios");
const cheerio = require("cheerio");
/**
 * @description Promise that get Economic Calendar from Investing.com
 * @returns {Promise}
 */
function getPlayersPositionData() {
  return new Promise(async (resolve, reject) => {
    const positions = ["Pessoa Jurídica Financeira", "Bancos", "Investidor Institucional", "Investidores Não Residentes", "Pessoa Jurídica Não Financeira"]

    const response = await axios({
      method: "GET",
      url:
        "http://www2.bmf.com.br/pages/portal/bmfbovespa/lumis/lum-tipo-de-participante-ptBR.asp",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
      },
      responseType: "arraybuffer",
      reponseEncoding: "binary",
    });
    if (response.status != 200) {
      reject(
        "getForeignersPositionData - Conection error status: ",
        response.status
      );
    }

    let positionsList = [];
    const $ = cheerio.load(response.data.toString("latin1"));

    var captions = $("caption");
    var searchText = "MERCADO FUTURO DE DÓLAR";
    var table;

    for (var i = 0; i < captions.length; i++) {
      if ($(captions[i]).text().trim() == searchText) {
        table = $(captions[i]).parent();
        break;
      }
    }

    $(table)
      .find("tbody tr")
      .each(function () {
        var cols = $(this).find("td");

        let description = $(cols["0"]).text().trim();
        let position =
          parseInt($(cols["1"]).text().trim().replace(".", "")) -
          parseInt($(cols["3"]).text().trim().replace(".", ""));

        if(positions.includes(description)){
          positionsList.push({
            description,
            position,
          });
        }
      });

    resolve(positionsList);
  });
}

module.exports = {
  getPlayersPositionData,
};
