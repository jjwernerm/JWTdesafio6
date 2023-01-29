const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

const indexRoutes = require("./routes/routes");

app.use(cors());
app.use("/", indexRoutes);

app.listen(3000, console.log("SERVER ON..."));

module.exports = app;