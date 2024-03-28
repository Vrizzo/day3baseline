import {FlightId} from "./flight-id";
import {Command, CommandType} from "../core/commands";
import {SeatMap} from "./seat-map";


export type FlightCommand = Command<FlightId>;

export type InitFlightMap = FlightCommand & {
    type: CommandType.InitFlightMap,
    seatMap: SeatMap
}
