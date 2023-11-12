const express = require("express");
const webPush = require("web-push");
const mongoose = require("mongoose");
const subscriptionModel = require("./model");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://sahul:jLrnfHMGIhtzlMgj@cluster0.alht5.mongodb.net/pushDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB not connected"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/subscribe", async (req, res, next) => {
  const { ...subscriptionDetails } = req.body;

  const subscription = await subscriptionModel.create({ ...req.body });

  const options = {
    vapidDetails: {
      subject: "mailto:test@mail.com",
      publicKey:
        "BC4i0hkffG8rIoJvfkEzioE5y9pnQbnNv3MiRp-QcdZY5a6PODoEAapOSM6v8VT0qKlB0sahDrdXEMdvR-LZbNE",
      privateKey: "Fs244lvaQkf8DONQ2uKOBADvo5N6pm369VjbWkpg-cs",
    },
  };
  try {
    const pushRes = await webPush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Title from Server ,",
        description: "Desc from server",
        image:
          "https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg",
      }),
      options
    );

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(7000, () => {
  console.log("server started successfully");
});
