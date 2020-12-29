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
  return encrypt.encrypt(data);
}

/**
 * 私钥解密
 * data 加密数据
 * privateKey 私钥
 */
export function getDecrypt(data, privateKey) {
  let decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);
  return decrypt.decrypt(data);
}
