//**** * Esse é o código reduzido para geração rápida
//*Bibliotecas JS utilizadas
var crypto = require('cryptojs').Crypto;
var bs58 = require('bs58');
var ec = require('eccrypto');
var bitcoin = require('bitcoinjs-lib');

//*Chamada das funções principais
// 1) node cria-chave-privada
var chave_privada=criar_chave_privada();
console.log('Chave Privada :', chave_privada);

// 2) node geraWIF
var wif = geraWIF(chave_privada);
console.log('WIF           :', wif);

//3) node gera-chave-publica
var chave_publica = gera_chave_publica(chave_privada);
console.log('Chave Pública :', chave_publica);

//4) node gera-endereco-bitcoin
var endereco_bitcoin = gera_endereco_bitcoin(chave_publica);
console.log('Endereço Final:', endereco_bitcoin);

//* Funções principais
//1) Função para geração da chave privada
function criar_chave_privada() {
    var crypto = require('crypto');
    var chavePrivadaHex = crypto.randomBytes(32).toString('hex').toUpperCase();
    return chavePrivadaHex;
}

//2) Função para gerar o WIF
function geraWIF(chavePrivada){    
    var versao = '80';
    var versaoEChavePrivada= versao + chavePrivada;
    var primeiroSHA = crypto.SHA256(versaoEChavePrivada);
    var segundoSHA = crypto.SHA256(primeiroSHA);
    var checksum = segundoSHA.substr(0,8).toUpperCase();
    var wif = versaoEChavePrivada + checksum;
    var wifFinal = bs58.encode(crypto.util.hexToBytes(wif));
    return wifFinal;
}
// 3) função criada para gerar a chave pública
function gera_chave_publica(chavePrivada){
    var chavePublica = ec.getPublic(Buffer(crypto.util.hexToBytes(chavePrivada))).toString('hex').toUpperCase();
    return chavePublica;
}

// 4) node gera-endereco-bitcoin 
function gera_endereco_bitcoin(chavePublica){
    var versao = '00';
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
    return enderecoFinal;
}