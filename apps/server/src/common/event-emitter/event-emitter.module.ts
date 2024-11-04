import { Global, Module } from '@nestjs/common'
import { CustomEventEmitter } from './event-emitter.service'

@Global()
@Module({
  providers: [CustomEventEmitter],
  exports: [CustomEventEmitter],
})
export class CustomEventEmitterModule {}
