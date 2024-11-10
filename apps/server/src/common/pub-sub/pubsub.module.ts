//src/common/pub-sub/pubsub.module.ts
import { Global, Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { PUB_SUB } from '../interfaces/payload'

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
