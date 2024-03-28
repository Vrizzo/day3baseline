export type Command<TAggregateId> = {
    aggregateId: TAggregateId,
    type: CommandType,
    timestamp: Date,
    metadata: { [key: string]: any };
}

export enum CommandType {
    InitCabinLayout = "InitCabinLayout",
    InitFlightMap = "InitFlightMap",
}
