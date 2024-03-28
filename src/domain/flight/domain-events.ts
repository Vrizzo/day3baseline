import { DomainEvent, DomainEventType } from '../core/domain-events';


import {FlightId} from "./flight-id";
import {FlightStatus} from "./flight-status";

export type FlightDomainEvent = DomainEvent<FlightId>;

export type FlightCreated = FlightDomainEvent & {
    type: DomainEventType.FlightCreated,
    caseStatus: FlightStatus
    cabinLayoutId: FlightId
}
