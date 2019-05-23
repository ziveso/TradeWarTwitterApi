const Twit = require("twit");
const moment = require("moment");
const { write } = require("../database/");

const Twitter = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});

const streaming = () => {
  try {
    var stream = Twitter.stream("statuses/filter", { track: "#tradewar" });
    stream.on("tweet", async function(tweet) {
      console.log("tweet at", tweet.created_at);
      //   console.log(tweet.text);
      write(
        moment()
          .utc()
          .startOf("hour")
          .format("DD_MM_YY_hh_mm")
      );
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  streaming
};
