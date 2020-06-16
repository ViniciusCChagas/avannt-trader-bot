const express = require("express");
const panoram = require("./src/panoram");
const { startCronJobs } = require("./src/cronJob");

const app = express();

app.get("/sendPanoram", async (request, response) => {
  const panorama = await panoram.sendPanoram();
  return response.json({ panorama });
});

app.get("/sendEconomicCalendar", async (request, response) => {
  const economicCalendar = await panoram.sendEconomicCalendar();
  return response.json({ economicCalendar });
});

//port for Avannt Trader Bot = 3334
app.listen(3334);

startCronJobs();
