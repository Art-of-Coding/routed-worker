'use strict'

import RoutedWorker, {
    Job
} from './index'

// create a new named worker with the queue name 'Example'
const worker = new RoutedWorker('Example')

// Interface for job data
interface JobData {
    name: string,
    age: number
}

// Add a route, this is the job name (in this case, 'Greeting')
worker.on('Greeting', async (job: Job<JobData>) => {
    // Do something and return a result
    return `Hello, ${job.data.name}!`
})

// start the worker (required!)
worker.start()