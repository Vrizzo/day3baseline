import {CabinLayoutId} from "./cabin-layout-id";
import {CabinLayoutCommand, InitCabinLayout} from "./commands";
import {CommandType} from "../core/commands";
import { CabinLayoutDomainEvent} from "./domain-events";
import {CabinDimension} from "./cabin-dimension";
import {CabinLayoutStatus} from "./cabin-layout-status";
import {DomainEventType} from "../core/domain-events";
import e from "express";

export class CabinLayout {
    get timestamp(): Date | null {
        return this._timestamp;
    }

    set timestamp(value: Date | null) {
        this._timestamp = value;
    }
    get cabinDimension(): CabinDimension | null {
        return this._cabinDimension;
    }

    set cabinDimension(value: CabinDimension | null) {
        this._cabinDimension = value;
    }
    get version(): number {
        return this._version;
    }

    set version(value: number) {
        this._version = value;
    }
    get cabinLayoutId(): CabinLayoutId {
        return this._cabinLayoutId;
    }
    get status(): CabinLayoutStatus | null {
        return this._status;
    }
    private _cabinLayoutId: CabinLayoutId;
    private _version: number;
    private domainEvents: CabinLayoutDomainEvent[] = [];
    private _cabinDimension: CabinDimension | null = null;
    private _timestamp: Date | null = null;
    private _status: CabinLayoutStatus | null = null;

    constructor(cabinLayoutId: CabinLayoutId, version: number = 0) {
        this._cabinLayoutId = cabinLayoutId;
        this._version = version;
        console.log(`create cabinLayoutId ${cabinLayoutId}`);
    }


    public execute(cmd: CabinLayoutCommand) {
        if (cmd.aggregateId !== this._cabinLayoutId) {
            throw new Error("Invalid command");
        }

        if (cmd.type === CommandType.InitCabinLayout) {
            let c = cmd as InitCabinLayout;
            this.initCabinLayout(c.cabinDimension, c.timestamp);
        }
    }

    public committed() {
        this._version++;
        this.domainEvents = [];
    }
    private addDomainEvent(e: CabinLayoutDomainEvent) {
        console.log(e);
        this.domainEvents.push(e);
    }
    private initCabinLayout(cabinDimension: CabinDimension, timestamp: Date) {
        console.log(`initCabinLayout`);
        this._cabinDimension = cabinDimension
        this._timestamp = timestamp
        this._status = CabinLayoutStatus.Draft;


        this.addDomainEvent({
            aggregateId: this._cabinLayoutId,
            type: DomainEventType.CabinLayoutCreated,
            timestamp: timestamp,
            metadata: {
                cabinDimensio: cabinDimension
            }
        });
    }

    public get getDomainEvents(): CabinLayoutDomainEvent[] {
        return this.domainEvents;
    }
}