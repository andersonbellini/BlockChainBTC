var Crypto = require('cryptojs').Crypto;
var ec = require('eccrypto');

var chavePrivada = '6DB4F5FC99467649F109C7567486439F05B68245494EEF05E379F22B137EEAA0'; // process.argv[2]; //crypto.randomBytes(32);
var chavePublica = ec.getPublic(Buffer(Crypto.util.hexToBytes(chavePrivada)));

console.log('Chave Pública',chavePublica.toString('hex').toUpperCase());

