const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const upload = require('express-fileupload');
const cors = require("cors");
const rotas = require("./routes/routes");
const userRotas = require("./routes/userRoute");
const uploadDownload = require("./routes/upDownRoutes");

const app = express();

app.use(bodyParser.json());
app.use(upload());
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.use("/ficheiro", uploadDownload);
app.use("/teste", rotas);
app.use("/users", userRotas);

/*
app.post('/', (req, res) => {
    if (req.files) {
        const file = req.files.file;
        const filename = file.name;
        file.mv(path.join(__dirname, "/files/", filename), (err) => {
            if (err) res.send({ message: err });
            else res.send({ message: "File Upload" });
        });
    }
});
*/

app.use("/download", (req, res) => {
    res.download(path.join(__dirname, "/files/2018_BD2_Ficha2.pdf"), (err) => {
        if (err) console.log("ocorreu um erro no download");
        else console.log("download com sucesso");
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

//https://www.w3schools.com/nodejs/nodejs_mysql.asp
//caso queira mudar de sqlite para mysql