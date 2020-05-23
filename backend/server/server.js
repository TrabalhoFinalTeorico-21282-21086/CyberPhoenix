const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const upload = require('express-fileupload');
const cors = require("cors");
const userRotas = require("./routes/userRoute");
const uploadDownload = require("./routes/upDownRoutes");
const files = require("./routes/fileRoute");
const subs = require("./routes/subscriptionRoute");
const feed = require("./routes/feedbackRoute");

const app = express();

app.use(bodyParser.json());
app.use(upload());
app.use(cors());

app.use("/ficheiro", files)
app.use("/updown", uploadDownload);
app.use("/users", userRotas);
app.use("/subscription", subs);
app.use("/feedback", feed);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

//https://www.w3schools.com/nodejs/nodejs_mysql.asp