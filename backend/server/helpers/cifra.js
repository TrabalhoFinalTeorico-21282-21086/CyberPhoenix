const crypto = require("crypto");
require("dotenv").config();
const key = process.env.CIFRA_KEY;

//gera um Iv para a encryptação
exports.generateIv = () => {
    return crypto.randomBytes(8).toString("hex");
};

//encripta a data em função da chave e do Iv
exports.encrypt = (data, iv) => {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    return cipher.update(Buffer.from(data), "utf8", "hex") + cipher.final("hex");
}

//desencripta a data em função da chave e do Iv
exports.decrypt = (data, iv) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    return decipher.update(data, "hex", "utf8") + decipher.final("utf8");
}