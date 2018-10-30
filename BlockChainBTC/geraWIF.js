//http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript
//add 0x80 to the front, https://en.bitcoin.it/wiki/List_of_address_prefixes

var crypto = require('cryptojs').Crypto;
var bs58 = require('bs58');
var versao = '80';

var chavePrivada = '6DB4F5FC99467649F109C7567486439F05B68245494EEF05E379F22B137EEAA0'; // process.argv[2]; //crypto.randomBytes(256);
var versaoEChavePrivada= versao + chavePrivada;
//console.log('Privada + 80 : ',versaoEChavePrivada);

var primeiroSHA = crypto.SHA256(versaoEChavePrivada);
//console.log('Primeiro : ', primeiroSHA);

var segundoSHA = crypto.SHA256(primeiroSHA);
//console.log('Segundo : ', segundoSHA);

var checksum = segundoSHA.substr(0,8).toUpperCase();
//console.log('Checksum: ',checksum);

var wif = versaoEChavePrivada + checksum;
//console.log('WIF     : ', wif);

//Conversão de base 16 para 58

var wifFinal = bs58.encode(crypto.util.hexToBytes(wif));

console.log('WIF_Final: ', wifFinal);
