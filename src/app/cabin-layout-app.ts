
import { CommandType } from "../domain/core/commands";

import {CabinLayoutsDAL} from "../data-access/cabin-layouts-dal";
import {CabinLayoutCommand} from "../domain/cabin-layout/commands";
import {ExecutionResults, ExucutionResult, Failure, Success} from "./execution-results";
import {CabinLayoutId} from "../domain/cabin-layout/cabin-layout-id";
import {CabinLayout} from "../domain/cabin-layout/cabin-layout";


export class CabinLayoutApplicationService {
    public readonly repository: CabinLayoutsDAL;

    constructor(repository: CabinLayoutsDAL) {
        this.repository = repository;
    }

    public async Execute(command: CabinLayoutCommand) : Promise<ExucutionResult<CabinLayoutId>> {
        try {
            let supportCase = await this.getSupportCase(command);
            supportCase.execute(command);
            await this.repository.createCabinLayout(supportCase);
            return {
                aggregateId: command.aggregateId,
                result: ExecutionResults.Success,
                newVersion: supportCase.version
            } as Success<CabinLayoutId>;
        } catch (error: any) {
            return {
                aggregateId: command.aggregateId,
                result: ExecutionResults.Failure,
                error: error.message
            } as Failure<CabinLayoutId>;
        }
    }

    public async sendUnpublishedEvents() : Promise<void> {
        await this.repository.sendUnpublishedEvents();
    }

    private async getSupportCase(command: CabinLayoutCommand) : Promise<CabinLayout> {
        if (command.type === CommandType.InitCabinLayout) {
            return new CabinLayout(command.aggregateId);
        } else {
            let newVar = await this.repository.load(command.aggregateId);
            return newVar!!;
        }
    }
}