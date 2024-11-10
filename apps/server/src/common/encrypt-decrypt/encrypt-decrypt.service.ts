import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as CryptoJS from 'crypto-js'

@Injectable()
export class EncryptDecryptService {
  private readonly secretKey: string
  private readonly iv: string

  constructor(private configService: ConfigService) {
    // Convert hex to base64 for the encryption key
    const hexKey = this.configService.get<string>('DATA_ENCRYPT_KEY')
    this.secretKey = this.hexToBase64(hexKey)

    // Convert hex to base64 for the IV (using only first 32 chars of hex)
    const hexIv = this.configService.get<string>('DATA_ENCRYPT_IV').slice(0, 32)
    this.iv = this.hexToBase64(hexIv)
  }

  /**
   * Convert hex string to base64
   */
  private hexToBase64(hexString: string): string {
    // Convert hex to word array
    const wordArray = CryptoJS.enc.Hex.parse(hexString)
    // Convert word array to base64
    return CryptoJS.enc.Base64.stringify(wordArray)
  }

  encryptData(data: any): string {
    try {
      const dataString =
        typeof data === 'object' ? JSON.stringify(data) : String(data)

      // Parse base64 strings to WordArrays
      const ivWordArray = CryptoJS.enc.Base64.parse(this.iv)
      const keyWordArray = CryptoJS.enc.Base64.parse(this.secretKey)

      const encrypted = CryptoJS.AES.encrypt(dataString, keyWordArray, {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })

      return encrypted.toString()
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`)
    }
  }

  decryptData(encryptedData: string, parseJson: boolean = false): any {
    try {
      // Parse base64 strings to WordArrays
      const ivWordArray = CryptoJS.enc.Base64.parse(this.iv)
      const keyWordArray = CryptoJS.enc.Base64.parse(this.secretKey)

      const decrypted = CryptoJS.AES.decrypt(encryptedData, keyWordArray, {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })

      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8)

      if (parseJson) {
        try {
          return JSON.parse(decryptedString)
        } catch (e) {
          throw new Error('Failed to parse decrypted data as JSON')
        }
      }

      return decryptedString
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`)
    }
  }

  /**
   * JWT-safe encryption
   */
  encryptForJwt(data: any): string {
    const encrypted = this.encryptData(data)
    return this.makeBase64UrlSafe(encrypted)
  }

  /**
   * JWT-safe decryption
   */
  decryptFromJwt(encryptedData: string, parseJson: boolean = false): any {
    const normalizedData = this.fromBase64UrlSafe(encryptedData)
    return this.decryptData(normalizedData, parseJson)
  }

  private makeBase64UrlSafe(str: string): string {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }

  private fromBase64UrlSafe(str: string): string {
    str = str.replace(/-/g, '+').replace(/_/g, '/')
    while (str.length % 4) {
      str += '='
    }
    return str
  }

  /**
   * Utility method to generate new keys in correct format
   */
  generateNewKeys(): { key: string; iv: string } {
    const key = CryptoJS.lib.WordArray.random(32)
    const iv = CryptoJS.lib.WordArray.random(16)

    return {
      key: key.toString(CryptoJS.enc.Hex),
      iv: iv.toString(CryptoJS.enc.Hex),
    }
  }
}
