import path from 'path';
import Initializer, { Instances } from '../core/Initializer';

async function initialize(): Promise<Instances> {
    const dataDir = process.env.NODE_DATADIR;
    if (!dataDir) {
        throw new Error('NODE_DATADIR is undefined');
    }
    const dbPath = path.join(dataDir, 'ts-electron.db');
    return await Initializer.initialize(dbPath);
}

initialize().then((instances) => {
    return instances.sampleService.addValueAndGetCount(-2);
}).then((count) => {
    process.stdout.write(String(count) + '\n');
});
