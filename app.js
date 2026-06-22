require("./db");

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();


app.get("/", (req, res) => {
  res.send("CBPBU Scraper Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const CBPBU = require("./models/cbpbu");

const URL =
  "https://cbpbu.ac.in/news-updates.php";

async function fetchNotices() {
  try {

    console.log(
      "Checking:",
      new Date().toLocaleString()
    );

    const { data } = await axios.get(URL);

    const $ = cheerio.load(data);

    const notices = [];

    $(".eachNewsB").each((i, el) => {

      const date = $(el)
        .find(".evDate")
        .text()
        .trim();

      const title = $(el)
        .find(".eatag")
        .text()
        .trim();

      let link = $(el)
        .find(".eatag")
        .attr("href");

      if (
        link &&
        !link.startsWith("http")
      ) {
        link =
          "https://cbpbu.ac.in" + link;
      }

      notices.push({
        title,
        date,
        link
      });
    });

    for (const notice of notices) {

      const exists =
        await CBPBU.findOne({
          link: notice.link
        });

      if (!exists) {

        await CBPBU.create({
          title: notice.title,
          date: notice.date,
          link: notice.link
        });

        console.log(
          "NEW NOTICE SAVED"
        );

        console.log(
          notice.title
        );

      }
    }

    console.log(
      "Finished Checking"
    );

  } catch (err) {

    console.log(
      err.message
    );

  }
}

fetchNotices();

setInterval(
  fetchNotices,
  5 * 60 * 1000
);