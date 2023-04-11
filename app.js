// import express, { response } from "express";
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "0d64fb573727409f3804540f2565f075";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    " &units=" +
    unit +
    "&appid=" +
    apiKey;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(`<h1>The weather is currently ${weatherDescription}.</h1>`);
      res.write(
        `<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`
      );
      res.write(`<img src=${imageURL}>`);
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("server is runing");
});
