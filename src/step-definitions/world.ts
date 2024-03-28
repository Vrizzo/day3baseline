import { CabinLayout } from '../domain/cabin-layout/cabin-layout';

import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber'
import {Flight} from "../domain/flight/flight";

export interface ICustomWorld extends World {
	flight?: Flight
	cabinLayout?: CabinLayout
	now: Date
    sharedData: { [key: string]: any };
}

export class CustomWorld extends World implements ICustomWorld {
	constructor(options: IWorldOptions) {
		super(options)
	}

	now: Date = new Date();
    sharedData: { [key: string]: any } = {};
}

setWorldConstructor(CustomWorld)