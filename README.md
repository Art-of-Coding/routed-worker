# Routed Worker for bullmq

Worker extension for [bullmq](https://github.com/taskforcesh/bullmq).

This worker allows you to register handlers for specific job names within
the queue. The example shows how this package is used.

bullmq is a peer depencendy, you'll need to install it yourself.

## Install

```
npm i @art-of-coding/routed-worker bullmq [--save]
```

## Example

```ts
import RoutedWorker, {
    Job
} from './index'

// create a new routed worker with the queue name 'Example'
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
```

## License

Copyright 2020 [Art of Coding](http://artofcoding.nl).

This software is licensed under the [MIT License](LICENSE).
