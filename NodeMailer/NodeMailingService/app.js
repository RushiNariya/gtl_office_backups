var express = require("express");
const mailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");

var app = express();

async function mailjet() {
  const transport = mailer.createTransport(
    smtp({
      host: "in-v3.mailjet.com",
      port: 587,
      auth: {
        user: "ba525dcb0d4b72db3551c59270a7285c",
        pass: "f54f17fda4c71327c722d94cf909c189",
      },
    })
  );

  const json = await transport.sendMail({
    from: "rushipatel9650@gmail.com", // From address
    to: "rushi.nariya@thegatewaycorp.co.in", // To address
    subject: "Team Horsella", // Subject
    text: "Welcome to Horsella", // Content
  });
  console.log(json);
  return json;
}

app.use("/sendmail", async function (req, res, next) {
  const response = await mailjet();
  res.status(200).json(response);
});

app.listen(3000);
