import {Database, OPEN_CREATE, OPEN_READWRITE} from 'sqlite3';
import SampleRepository from './sample/SampleRepository';
import SampleRepositoryImpl from './sample/SampleRepositoryImpl';
import SampleService from './sample/SampleService';
import SampleServiceImpl from './sample/SampleServiceImpl';

export interface Instances {
    sampleRepository: SampleRepository;
    sampleService: SampleService;
}

export default class Initializer {
    public static async initialize(dbPath: string): Promise<Instances> {
        const db = new Database(dbPath, OPEN_READWRITE | OPEN_CREATE);

        const sampleRepository: SampleRepository = new SampleRepositoryImpl(db);
        await sampleRepository.init();

        const sampleService = new SampleServiceImpl(sampleRepository);
        return {
            sampleRepository,
            sampleService,
        };
    }
}
