//requerimos mongoose
const mongoose = require('mongoose')
//funcion a exportar para llamar
const conexionBD = () => {
    //llamamos url de env
    const URLDB = process.env.URLDB;
    //ip version 4 es lo de family
    mongoose.connect(URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4
    }).then((res) => {
        console.log('Conectado');
    }).catch((ex) => {
        console.log('Error en la ruta establecida para la conexion DB');
    });
}
module.exports = { conexionBD };