require("dotenv").load();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const app = express();

// load port
const PORT = process.env.PORT || 8888;

app.use(bodyParser.json());
app.use(cors());

// serve static content
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/css", express.static(path.join(__dirname, "css")));

app.get("*", (req, res) => {
  res.sendFile("hello.html", { root: __dirname });
});

// app.get("/time", (req, res) => {
//   const time = new Date().toLocaleTimeString();
//   res.status(200).send(`Local time is ${time}`);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const users = [
  { id: 1, username: "DianaPrince", password: "themyscira" },
  { id: 2, username: "SteveTrevor", password: "maaadworld" },
];

app.post("/login", (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  if (!username || !password) {
    res
      .status(400)
      .send("Error. Please enter the correct username and password");
    return;
  }

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
    },
    "accesskey",
    { expiresIn: "3 hours" }
  );

  res.status(200).send({ access_token: token });
});
