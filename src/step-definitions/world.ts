import { CabinLayout } from '../domain/cabin-layout/cabin-layout';

import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber'

export interface ICustomWorld extends World {
	flight?: CabinLayout
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