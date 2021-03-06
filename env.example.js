exports.countryFlags = { EUA: "🇺🇸", BR: "🇧🇷", EUR: "🇪🇺", CN: "🇨🇳" };

exports.portfolio = [
  {
    index: "indices-closed",
    name: "Índices Mundiais (Fechamento Anterior)",
    itens: [
      {
        index: "indices/us-spx-500",
        pairId: "166",
        title: "S&P 500 (NYSE)",
        name: "S&P 500",
        country: "EUA",
      },
      {
        index: "indices/us-30",
        pairId: "169",
        title: "Dow Jones Industrial Average (NYSE)",
        name: "Dow Jones",
        country: "EUA",
      },
      {
        index: "indices/nasdaq-composite",
        pairId: "14958",
        title: "Nasdaq",
        name: "Nasdaq",
        country: "EUA",
      },
      {
        index: "indices/smallcap-2000",
        pairId: "170",
        title: "Small Caps 2000",
        name: "Small Caps 2000",
        country: "EUA",
      },
      {
        index: "indices/bovespa",
        pairId: "17920",
        title: "IBOVESPA",
        name: "IBOVESPA",
        country: "BR",
      },
      {
        index: "indices/bovespa-win-futures",
        pairId: "941613",
        title: "Ibovespa FUT",
        name: "Ibovespa FUT",
        country: "BR",
      },
      {
        index: "indices/shanghai-composite",
        pairId: "40820",
        title: "Shanghai",
        name: "Shanghai",
        country: "CN",
      },
      {
        index: "indices/dj-shanghai",
        pairId: "954522",
        title: "DJ Shanghai",
        name: "DJ Shanghai",
        country: "CN",
      },
      {
        index: "indices/szse-component",
        pairId: "942630",
        title: "SZSE Component",
        name: "SZSE Component",
        country: "CN",
      },
      {
        index: "indices/ftse-china-a50",
        pairId: "28930",
        title: "China A50",
        name: "China A50",
        country: "CN",
      },
    ],
  },
  {
    index: "indices-futures",
    name: "Índices Mundiais (Futuros)",
    itens: [
      {
        index: "indices/us-spx-500-futures",
        pairId: "8839",
        title: "S&P 500 (NYSE) Ft",
        name: "S&P 500 Fut",
        country: "EUA",
      },
      {
        index: "indices/us-30-futures",
        pairId: "8839",
        title: "Dow Jones Industrial Average (NYSE) Fut",
        name: "Dow Jones Fut",
        country: "EUA",
      },
      {
        index: "indices/nq-100-futures",
        pairId: "8874",
        title: "Nasdaq Fut",
        name: "Nasdaq Fut",
        country: "EUA",
      },
      {
        index: "indices/smallcap-2000-futures",
        pairId: "8864",
        title: "Small Caps 2000 Fut",
        name: "Small Caps 2000 Fut",
        country: "EUA",
      },
    ],
  },
  {
    index: "currency",
    name: "Moedas  (Fechamento)",
    itens: [
      {
        index: "currencies/usd-brl",
        pairId: "2103",
        title: "USD/BRL",
        name: "🇺🇸 USD/🇧🇷 BRL",
      },
      {
        index: "currencies/eur-usd",
        pairId: "1",
        title: "EUR/USD",
        name: "🇪🇺 EUR/🇺🇸 USD",
      },
      {
        index: "currencies/us-dollar-index",
        pairId: "8827",
        title: "Indice Dolar Futuro",
        name: "🇺🇸 Índice Dolar Futuro",
      },
    ],
  },
  {
    index: "other",
    name: "Outros",
    itens: [
      {
        index: "commodities/crude-oil",
        pairId: "8849",
        title: "Crude Oil WTI Futures",
        name: "🛢 Petróleo WTI",
      },
      {
        index: "commodities/brent-oil",
        pairId: "8833",
        title: "Brent Oil Futures",
        name: "🛢 Petróleo Brent",
      },
      {
        index: "indices/volatility-s-p-500",
        pairId: "44336",
        title: "S&P 500 VIX",
        name: "🇺🇸 S&P 500 VIX",
      },
    ],
  },
];

exports.telegramToken = "1236754345:AAasekLLJkdasftdRh1YbWV05IYnmYHd_A"; //Telgram BOT Token

exports.telegramChatId = "-10012332546574"; //Chat id Telegram channel
