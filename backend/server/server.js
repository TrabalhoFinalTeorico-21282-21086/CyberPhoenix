const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const upload = require('express-fileupload');
const cors = require("cors");
const rotas = require("./routes/routes");
const userRotas = require("./routes/userRoute");

const app = express();

app.use(bodyParser.json());
app.use(upload());
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.use("/home", (req, res) => { res.send("se estas ler isto é porque esta tudo bem") });
app.use("/teste", rotas);
app.use("/users", userRotas);

app.post('/', (req, res) => {
    if (req.files) {
        const file = req.files.File;
        const filename = file.name;
        file.mv(path.join(__dirname, "/files/", filename), (err) => {
            if (err) res.send(err);
            else res.send("File Upload");
        });
    }
});

app.use("/download", (req, res) => {
    res.download(path.join(__dirname, "/files/imagem.jpg"), (err) => {
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