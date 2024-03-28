import {Given, Then} from '@cucumber/cucumber';
import assert from 'assert';

import {ICustomWorld} from './world';
import {DomainEventType} from "../domain/core/domain-events";

import {CommandType} from '../domain/core/commands';
import {InitCabinLayout} from "../domain/cabin-layout/commands";
import {CabinLayout} from "../domain/cabin-layout/cabin-layout";
import {CabinLayoutDomainEvent} from "../domain/cabin-layout/domain-events";
import {CabinLayoutStatus} from "../domain/cabin-layout/cabin-layout-status";

Given('a draft new cabinLayout', function (this: ICustomWorld) {
    let cabinLayout = createCabinLayout(this.now);
    this.flight = cabinLayout;
});


Then('a cabinLayout draft is initialized', async function () {
    assertDomainEventExists(this.cabinLayout, DomainEventType.CabinLayoutCreated);
});
Then('a cabinLayout is in status draft', async function () {
    assertStatus(this.cabinLayout, CabinLayoutStatus.Draft);
});

function assertDomainEventExists(cabinLayout: CabinLayout, type: DomainEventType) {

    const domainEvent = cabinLayout.getDomainEvents.find((e: CabinLayoutDomainEvent) => {
            console.log(e)
            return e.type === type
        }
    );

    console.log(domainEvent)
    assert(domainEvent !== undefined, `Domain event of type ${type} not found`);
}
 function assertStatus(cabinLayout: CabinLayout, expectedStatus: string) {
    assert(cabinLayout.status=== expectedStatus, `Status is not ${expectedStatus}`);
}

function createCabinLayout(timestamp: Date): CabinLayout {
    let cmd: InitCabinLayout = {
        type: CommandType.InitCabinLayout,
        aggregateId: "CLTEST",
        cabinDimension: {width: 310, length: 4000},
        timestamp: timestamp,
        metadata: {}
    }

    let cabinLayout = new CabinLayout(cmd.aggregateId);
    cabinLayout.execute(cmd)
    return cabinLayout;
}
