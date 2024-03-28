import { DomainEvent, DomainEventType } from '../core/domain-events';


import {CabinLayoutId} from "./cabin-layout-id";
import {CabinLayoutStatus} from "./cabin-layout-status";

export type CabinLayoutDomainEvent = DomainEvent<CabinLayoutId>;

export type CabinLayoutCreated = CabinLayoutDomainEvent & {
    type: DomainEventType.CabinLayoutCreated,
    caseStatus: CabinLayoutStatus
    cabinLayoutId: CabinLayoutId
}
