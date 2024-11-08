// src/common/encrypt-decrypt/encrypt-decrypt.service.ts
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as CryptoJS from 'crypto-js'

@Injectable()
export class EncryptDecryptService {
  private readonly key: string
  private readonly iv: CryptoJS.lib.WordArray

  constructor(private readonly configService: ConfigService) {
    // Key must be 32 bytes (256 bits) for AES-256
    this.key = CryptoJS.SHA256(
      this.configService.get<string>('DATA_ENCRYPT_KEY'),
    ).toString()
    // Generate a consistent IV from the key instead of random
    const keyBytes = CryptoJS.enc.Hex.parse(this.key)
    this.iv = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4))
  }

  /**
   * Encrypts an object or string using AES-256
   * @param data - Object or string to encrypt
   * @returns Encrypted string
   */
  encryptData<T>(data: T): string {
    const serializedData =
      typeof data === 'string' ? data : JSON.stringify(data)

    const encrypted = CryptoJS.AES.encrypt(serializedData, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    // Return just the encrypted data in base64
    return encrypted.toString()
  }

  /**
   * Decrypts an encrypted string and parses it into the original object type using AES-256
   * @param cipherText - Encrypted string to decrypt
   * @returns Decrypted data (parsed JSON object or string)
   */
  decryptData<T = any>(cipherText: string): T {
    try {
      const decrypted = CryptoJS.AES.decrypt(cipherText, this.key, {
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })

      const decryptedData = decrypted.toString(CryptoJS.enc.Utf8)

      // Attempt to parse the decrypted data as JSON; if it fails, return as a string
      try {
        return JSON.parse(decryptedData) as T
      } catch {
        return decryptedData as unknown as T
      }
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`)
    }
  }
}
