import {Given, Then} from '@cucumber/cucumber';
import assert from 'assert';

import {DomainEventType} from "../domain/core/domain-events";

import {CommandType} from '../domain/core/commands';
import {CabinLayout} from "../domain/cabin-layout/cabin-layout";
import {CabinLayoutDomainEvent} from "../domain/cabin-layout/domain-events";
import {InitFlightMap} from "../domain/flight/commands";
import {Flight} from "../domain/flight/flight";
import {FlightStatus} from "../domain/flight/flight-status";


Given(/^a draft new flight$/, function () {
    let flight = createFlight(this.now);
    this.flight = flight;
});
Then('a flight draft is initialized', async function () {
    assertDomainEventExists(this.cabinLayout, DomainEventType.FlightCreated);
});
Then('a flight is in status draft', async function () {
    assertStatus(this.flight, FlightStatus.Draft);
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
    assert(cabinLayout.status === expectedStatus, `Status is not ${expectedStatus}`);

}

function createFlight(timestamp: Date): Flight {

    let cmd: InitFlightMap = {
        type: CommandType.InitFlightMap,
        aggregateId: {
            callSign: "AZ1234",
            departureDate: new Date()
        },
        seatMap: {seats: [1, 2, 3]},
        timestamp: timestamp,
        metadata: {}
    }
    let flight = new Flight(cmd.aggregateId);
    flight.execute(cmd)
    return flight;
}
