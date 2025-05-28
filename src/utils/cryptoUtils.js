import CryptoJS from "crypto-js";

export function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}

export function encryptData(data, password) {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
  return ciphertext;
}

export function decryptData(ciphertext, password) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
}
