import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;
const key = CryptoJS.enc.Utf8.parse(secretKey);
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412");

const encrypt = (word: string) => {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

const decrypt = (word: string) => {
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

export { encrypt, decrypt };
