import {Given, Then} from '@cucumber/cucumber';
import assert from 'assert';

import {DomainEventType} from "../domain/core/domain-events";
import {CommandType} from '../domain/core/commands';
import {InitFlightMap} from "../domain/flight/commands";
import {Flight} from "../domain/flight/flight";
import {FlightStatus} from "../domain/flight/flight-status";
import {FlightDomainEvent} from "../domain/flight/domain-events";


Given(/^a draft new flight$/, function () {
    this.flight = createFlight(this.now);
});
Then('a flight draft is initialized', async function () {
    assertDomainEventExists(this.flight, DomainEventType.FlightCreated);
});
Then('a flight is in status draft', async function () {
    assertStatus(this.flight, FlightStatus.Draft);
});

function assertDomainEventExists(flight: Flight, type: DomainEventType) {

    const domainEvent = flight.getDomainEvents.find((e: FlightDomainEvent) => {
            console.log(e)
            return e.type === type
        }
    );

    console.log(domainEvent)
    assert(domainEvent !== undefined, `Domain event of type ${type} not found`);
}

function assertStatus(flight: Flight, expectedStatus: string) {
    assert(flight.status === expectedStatus, `Status is not ${expectedStatus}`);

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
