const crypto = require('crypto');

//Geração da variável com 32 bytes randômicos
var chavePrivada = crypto.randomBytes(32);
console.log(chavePrivada);

//Mostra em Hexadecimal
var chavePrivadaHex = chavePrivada.toString('hex').toUpperCase();
console.log(chavePrivadaHex);
