var crypto = require('cryptojs').Crypto;
var bs58 = require('bs58');
var bitcoin = require('bitcoinjs-lib');

var versao = '00'; //Versão para rede de teste 
//var versao = '6F'; //Versão para rede principal

var chavePublica = '042D2DE0FE60C5B8BB440FCE95C81669A22C8BD46F4BC1BED2A81C13E293529A0DCCEEFFD996D2ECAA92ED6949F49D3D76E5A5F05B6A639550A0E80487DF5D5D1B'; // process.argv[2]; //crypto.randomBytes(32);

var chavePublicaBytes = crypto.util.hexToBytes(chavePublica);

var chavePublicaSHA256 = crypto.SHA256(chavePublicaBytes);

var hash160 = bitcoin.crypto.ripemd160(Buffer(crypto.util.hexToBytes(chavePublicaSHA256)));

var hashEBytes = Array.prototype.slice.call(hash160,0);
hashEBytes.unshift(crypto.util.hexToBytes(versao));

var primeiroSHA256 = crypto.SHA256(hashEBytes);

var segundoSHA256 = crypto.SHA256(crypto.util.hexToBytes(primeiroSHA256));

var checksum = segundoSHA256.substr(0,8);

var endereco = versao + (hash160.toString('hex')) + checksum;

var enderecoFinal = bs58.encode(crypto.util.hexToBytes(endereco));

console.log(enderecoFinal);

