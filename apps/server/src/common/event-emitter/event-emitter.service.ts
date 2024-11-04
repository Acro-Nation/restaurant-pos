import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { EventPayloads } from '../interfaces/payload'

@Injectable()
export class CustomEventEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit<K extends keyof EventPayloads>(
    event: K,
    payload: EventPayloads[K],
  ): boolean {
    return this.eventEmitter.emit(event, payload)
  }
}
