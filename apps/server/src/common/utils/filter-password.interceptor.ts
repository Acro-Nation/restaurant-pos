import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { EncryptDecryptService } from '../encrypt-decrypt/encrypt-decrypt.service'

@Injectable()
export class FilterPasswordInterceptor implements NestInterceptor {
  constructor(private readonly encryptionService: EncryptDecryptService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async (response) => {
        if (!response || !response.data) return

        try {
          // Decrypt the data
          const decryptedData = this.encryptionService.decryptData(
            response.data,
          )

          let parsedData
          try {
            parsedData = JSON.parse(decryptedData)
          } catch (parseError) {
            console.error('Failed to parse decrypted data:', parseError.message)
            return
          }

          // Remove all password fields
          const filteredData = this.removeSensitiveData(parsedData)

          // Encrypt filtered data
          response.data = this.encryptionService.encryptData(
            JSON.stringify(filteredData),
          )
        } catch (error) {
          console.error('Error processing response:', error.message)
        }
      }),
    )
  }

  private removeSensitiveData(data: any): any {
    // Handle null/undefined
    if (!data) return data

    // Handle arrays
    if (Array.isArray(data)) {
      return data.map((item) => this.removeSensitiveData(item))
    }

    // Handle objects
    if (typeof data === 'object') {
      const filteredData = { ...data }

      // List of sensitive fields to remove
      const sensitiveFields = [
        'password',
        'pwd',
        'pass',
        'hashedPassword',
        'passwordHash',
        'password_hash',
        'userPassword',
        'user_password',
      ]

      // Remove all variations of password fields
      sensitiveFields.forEach((field) => {
        delete filteredData[field]
      })

      // Recursively process nested objects
      Object.keys(filteredData).forEach((key) => {
        if (filteredData[key] && typeof filteredData[key] === 'object') {
          filteredData[key] = this.removeSensitiveData(filteredData[key])
        }
      })

      return filteredData
    }

    return data
  }
}
