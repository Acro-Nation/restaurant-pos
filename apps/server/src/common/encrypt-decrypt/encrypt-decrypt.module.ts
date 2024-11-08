// src/common/encrypt-decrypt/encrypt-decrypt.module.ts
import { Module, Global } from '@nestjs/common'
import { EncryptDecryptService } from './encrypt-decrypt.service'

@Global()
@Module({
  providers: [EncryptDecryptService],
  exports: [EncryptDecryptService],
})
export class EncryptDecryptModule {}
