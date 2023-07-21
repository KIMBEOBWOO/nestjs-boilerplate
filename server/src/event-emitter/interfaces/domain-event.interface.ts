type DomainEventMetadata = {
  /** Timestamp(milliseconds) when this domain event occurred */
  readonly timestamp: number;
};

export type DomainEventProps<T> = Omit<T, 'metadata'> & {
  metadata?: DomainEventMetadata;
};

export abstract class DomainEvent {
  public readonly metadata: DomainEventMetadata;

  constructor(props: DomainEventProps<unknown>) {
    this.metadata = {
      timestamp: props?.metadata?.timestamp || Date.now(),
    };
  }
}
