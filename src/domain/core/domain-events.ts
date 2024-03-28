import {FlightCreated} from "../flight/domain-events";

export type DomainEvent<TAggregateId> = {
    aggregateId: TAggregateId,
    type: DomainEventType,
    timestamp: Date,
    metadata: { [key: string]: any };
}

export enum DomainEventType {
    FlightCreated = "FlightCreated",
    CabinLayoutCreated = "CabinLayoutCreated",
    MessageSent = "MessageSent",
    StatusChanged = "StatusChanged",
    AgentAssigned = "AgentAssigned"
}