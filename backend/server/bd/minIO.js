var Minio = require('minio');


var mC = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
}, (err) => {
    console.log(err);
});


module.exports = mC;

//https://github.com/minio/minio-js