import {
  JSEncrypt
} from "jsencrypt";

/**
 * 公钥加密
 * data 要加密的数据
 * publicKey 公钥
 */
export function getEncrypt(data, publicKey) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  let getrsadata = arrayBufferToBase64(encrypt.encryptLong2(data)); //将加密的数据转码为base64
  return getrsadata
  //   return encrypt.encrypt(data);
}

/**
 * 私钥解密
 * data 加密数据
 * privateKey 私钥
 */
export function getDecrypt(data, privateKey) {
  let decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);
  //   let aa = decrypt.decrypt(data);
  let decrsadata = decrypt.decryptLong2(base64ToArrayBuffer(data)) // password要解密的数据 先转为byte数组在进行解码
  return decrsadata;
}

// btye数组转base64
function arrayBufferToBase64(buffer) {

  var binary = '';

  var bytes = new Uint8Array(buffer);

  var len = bytes.byteLength;

  for (var i = 0; i < len; i++) {

    binary += String.fromCharCode(bytes[i]);

  }

  return window.btoa(binary);

}

// base64转btye数组
function base64ToArrayBuffer(base64) {

  var binary_string = window.atob(base64);

  var len = binary_string.length;

  var bytes = new Uint8Array(len);

  for (var i = 0; i < len; i++) {

    bytes[i] = binary_string.charCodeAt(i);

  }

  return bytes;

}
