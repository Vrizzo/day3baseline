import {FlightId} from "./flight-id";
import {FlightCommand, InitFlightMap} from "./commands";
import {CommandType} from "../core/commands";
import {FlightDomainEvent} from "./domain-events";
import {FlightStatus} from "./flight-status";
import {DomainEventType} from "../core/domain-events";
import {SeatMap} from "./seat-map";
import e from "express";

export class Flight {
    get status(): FlightStatus | null {
        return this._status;
    }
    get seatMap(): SeatMap | null {
        return this._seatMap;
    }


    private _cabinLayoutId: FlightId;
    private _version: number;
    private domainEvents: FlightDomainEvent[] = [];
    private _timestamp: Date | null = null;
    private _status: FlightStatus | null = null;
    private _seatMap: SeatMap | null = null;

    constructor(cabinLayoutId: FlightId, version: number = 0) {
        this._cabinLayoutId = cabinLayoutId;
        this._version = version;
        console.log(`create cabinLayoutId ${cabinLayoutId}`);
    }


    public execute(cmd: FlightCommand) {
        if (cmd.aggregateId !== this._cabinLayoutId) {
            throw new Error("Invalid command");
        }

        if (cmd.type === CommandType.InitFlightMap) {
            let c = cmd as InitFlightMap;
            this.init(c.seatMap, c.timestamp);
        }
    }

    public committed() {
        this._version++;
        this.domainEvents = [];
    }
    private addDomainEvent(e: FlightDomainEvent) {
        console.log(e);
        this.domainEvents.push(e);
    }
    private init(seatMap: SeatMap, timestamp: Date) {
        console.log(`initCabinLayout`);
        this._seatMap = seatMap
        this._timestamp = timestamp
        this._status = FlightStatus.Draft;

        this.addDomainEvent({
            aggregateId: this._cabinLayoutId,
            type: DomainEventType.FlightCreated,
            timestamp: timestamp,
            metadata: {
                cabinDimension: seatMap
            }
        });
    }

    public get getDomainEvents(): FlightDomainEvent[] {
        return this.domainEvents;
    }
}