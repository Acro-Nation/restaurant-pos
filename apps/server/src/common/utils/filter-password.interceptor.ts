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
        if (
          response &&
          (typeof response.data === 'string' ||
            typeof response.data === 'object')
        ) {
          try {
            // Decrypt and filter data
            const decryptedData = this.encryptionService.decryptData(
              response.data,
            )
            let parsedData

            try {
              parsedData = JSON.parse(decryptedData)
            } catch (parseError) {
              console.error(
                'Failed to parse decrypted data:',
                parseError.message,
              )
              return
            }

            const filteredData = this.removeSensitiveData(parsedData)

            // Encrypt filtered data
            response.data = this.encryptionService.encryptData(
              JSON.stringify(filteredData),
            )
          } catch (decryptError) {
            console.error('Decryption error:', decryptError.message)
          }
        }
      }),
    )
  }

  private removeSensitiveData(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.removeSensitiveData(item))
    }

    if (data && typeof data === 'object') {
      const filteredData = { ...data }
      if (filteredData.password) {
        delete filteredData.password
      }
      Object.keys(filteredData).forEach((key) => {
        filteredData[key] = this.removeSensitiveData(filteredData[key])
      })
      return filteredData
    }

    return data
  }
}
