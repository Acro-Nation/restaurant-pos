import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as CryptoJS from 'crypto-js'

@Injectable()
export class EncryptDecryptService {
  private readonly key: string

  constructor(private readonly configService: ConfigService) {
    this.key = this.configService.get<string>('DATA_ENCRYPT_KEY')
  }

  encryptData(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, this.key).toString()
    return encrypted
  }

  decryptData(cipherData: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherData, this.key)
      const decrypted = bytes.toString(CryptoJS.enc.Utf8)
      return decrypted
    } catch (error) {
      console.error('Decryption error:', error.message)
      return ''
    }
  }
}
