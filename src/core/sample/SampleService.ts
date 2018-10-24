import { SampleValue } from './Sample';

export default interface SampleService {
    addValueAndGetCount(value: SampleValue): Promise<number>;
}
