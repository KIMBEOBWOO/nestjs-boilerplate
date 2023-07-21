import { DomainEvent } from './domain-event.interface';

export interface DomainEventListener {
  handleEvent(event: DomainEvent): unknown;
}
