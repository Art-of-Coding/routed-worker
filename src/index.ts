'use strict'

import {
    Job,
    Worker,
    Processor,
    WorkerOptions
} from 'bullmq'

export {
    Job
} from 'bullmq'

export default class RoutedWorker {
    public readonly queueName: string
    public readonly workerOpts: WorkerOptions

    readonly #routes: Map<string, Processor> = new Map()
    #worker: Worker

    public constructor (
        queueName: string,
        workerOpts: WorkerOptions = {}
    ) {
        this.queueName = queueName
        this.workerOpts = workerOpts
    }

    public start (): void {
        if (this.#worker) {
            return
        }

        this.#worker = new Worker(
            this.queueName,
            this.process.bind(this),
            this.workerOpts
        )
    }

    public on (
        name: string,
        processor: Processor
    ): this {
        this.#routes.set(name, processor)
        return this
    }

    public async close (): Promise<void> {
        if (!this.#worker) {
            return
        }

        await this.#worker.close()
        this.#worker = null
    }

    private async process (
        job: Job
    ): Promise<any> {
        const route = this.#routes.get(job.name)

        if (!route) {
            throw new Error(`Unknown job name: ${job.name}`)
        }

        return route(job)
    }
}
