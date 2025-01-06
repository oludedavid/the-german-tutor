import CryptoJS from "crypto-js";

function generateSecureKey(): string {
  const randomBytes = CryptoJS.lib.WordArray.random(16);
  return randomBytes.toString(CryptoJS.enc.Base64);
}

const SECURE_STORAGE_SECRET_KEY =
  process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_APP_SECRET_KEY ||
  generateSecureKey();

export class SecureStorageHelper {
  private static readonly SECRET_KEY =
    SECURE_STORAGE_SECRET_KEY || "default-secret-key";

  static encrypt<T>(data: T): string {
    if (!this.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }

    if (data === undefined || data === null) {
      throw new Error("Data to encrypt is undefined or null");
    }

    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.SECRET_KEY
    ).toString();
  }

  static decrypt<T>(encryptedData: string): T | null {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  }

  static setItem<T>(key: string, value: T): void {
    const encryptedData = this.encrypt(value);
    localStorage.setItem(key, encryptedData);
  }

  static getItem<T>(key: string): T | null {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    return this.decrypt<T>(encryptedData);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}
