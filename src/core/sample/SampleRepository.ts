import Sample, { SampleId, SampleValue } from './Sample';

export default interface SampleRepository {
    init(): Promise<void>;

    add(value: SampleValue): Promise<Sample>;
    get(id: SampleId): Promise<Sample>;
    remove(id: SampleId): Promise<void>;
    count(): Promise<number>;
}
