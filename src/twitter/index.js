const Twit = require("twit");
const moment = require("moment");
const { write, push } = require("../database/");

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
      const value = {
        created_at: moment().toISOString(),
        text: tweet.text,
        user: JSON.stringify(tweet.user)
      };
      console.log(tweet.created_at);
      write(
        moment()
          .utc()
          .startOf("hour")
          .format("DD_MM_YY_hh")
      );
      push(value);
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  streaming
};
