import SampleRepository from './SampleRepository';
import SampleService from './SampleService';

export default class SampleServiceImpl implements SampleService {
    private sampleRepository: SampleRepository;

    constructor(sampleRepository: SampleRepository) {
        this.sampleRepository = sampleRepository;
    }

    public async addValueAndGetCount(value: number): Promise<number> {
        await this.sampleRepository.add(-1);
        return await this.sampleRepository.count();
    }
}
