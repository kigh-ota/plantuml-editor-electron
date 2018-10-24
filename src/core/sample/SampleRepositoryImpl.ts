import log from 'electron-log';
import {Database} from 'sqlite3';
import uuidv4 from 'uuid/v4';
import Sample, { SampleId, SampleValue } from './Sample';
import SampleRepository from './SampleRepository';

const TABLE = 'sample';
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${TABLE} (id VARCHAR(36) PRIMARY KEY, value INTEGER)`;

export default class SampleRepositoryImpl implements SampleRepository {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public async init(): Promise<void> {
        log.info(`SampleRepositoryImpl#init()`);
        await new Promise((resolve, reject) => {
            this.db.run(CREATE_TABLE, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                log.info(`Created table ${TABLE}`);
                resolve();
            });
        });
    }

    public async add(value: SampleValue): Promise<Sample> {
        const sample = new Sample(uuidv4(), value);
        await new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO ${TABLE} (id, value) VALUES ('${sample.getId()}', ${sample.getValue()})`,
            (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(sample);
            });
        });
        return sample;
    }

    public async get(id: SampleId): Promise<Sample> {
        const sample = new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM ${TABLE} WHERE id = '${id}'`, (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (typeof row === 'undefined') {
                    reject('Not Found');
                    return;
                }
                resolve(new Sample(row.id, row.value));
            });
        });
        return ((sample as any) as Sample);
    }

    public async remove(id: SampleId): Promise<void> {
        await new Promise((resolve, reject) => {
            this.db.get(`DELETE FROM ${TABLE} WHERE id = '${id}'`, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    public async count(): Promise<number> {
        const n = await new Promise((resolve, reject) => {
            this.db.get(`SELECT COUNT(*) AS n FROM ${TABLE}`, (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row.n);
            });
        });
        return ((n as any) as number);
    }
}
