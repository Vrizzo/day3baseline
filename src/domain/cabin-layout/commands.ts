import {CabinLayoutId} from "./cabin-layout-id";
import {Command, CommandType} from "../core/commands";
import {CabinDimension} from "./cabin-dimension";

export type CabinLayoutCommand = Command<CabinLayoutId>;

export type InitCabinLayout = CabinLayoutCommand & {
    type: CommandType.InitCabinLayout,
    cabinDimension: CabinDimension
}