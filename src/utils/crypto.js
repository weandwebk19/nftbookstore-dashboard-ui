import { convertArrayToHexString } from "./convert";

export const Crypto = {
  lengthOfGenerator: 16,

  async sha256(message) {
    try {
      // encode as UTF-8
      const msgBuffer = new TextEncoder().encode(message);

      // hash the message
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

      // convert ArrayBuffer to Array
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      // convert bytes to hex string
      return convertArrayToHexString(hashArray);
    } catch (error) {
      console.error("Error hash(sha256): ", error.message);
    }
  },

  async encryption(message, key, iv) {
    try {
      const cipherArrayBuffer = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv },
        key,
        message
      );
      return new Uint8Array(cipherArrayBuffer);
    } catch (error) {
      console.error("Error encryption: ", error.message);
    }
  },

  async decryption(message, key, iv) {
    try {
      const plainArrayBuffer = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv },
        key,
        message
      );
      return new Uint8Array(plainArrayBuffer);
    } catch (error) {
      console.error("Error decryption: ", error.message);
    }
  },

  generateIVValue() {
    try {
      return crypto.getRandomValues(new Uint8Array(this.lengthOfGenerator));
    } catch (error) {
      console.error("Error generate IV value: ", error.message);
    }
  },

  async generateKey(key) {
    try {
      const keyHash = await this.sha256(key);
      const keyHashBuffer = new TextEncoder().encode(keyHash);
      const keyData = await new Uint8Array(keyHashBuffer);
      const rs = await crypto.subtle.importKey(
        "raw",
        keyData.slice(0, 32),
        { name: "AES-CBC" },
        true,
        ["decrypt", "encrypt"]
      );
      return rs;
    } catch (error) {
      console.error("Error generate Key: ", error.message);
    }
  },
};
