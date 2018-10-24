
export default class Sample {
    private id: SampleId;
    private value: SampleValue;

    constructor(id: SampleId, value: SampleValue) {
        this.id = id;
        this.value = value;
    }

    public getId(): SampleId {
        return this.id;
    }

    public getValue(): SampleValue {
        return this.value;
    }
}

export type SampleId = string;
export type SampleValue = number;
