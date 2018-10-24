import assert from 'assert';
import log from 'electron-log';
import fs from 'fs';
import os from 'os';
import path from 'path';
import {Database, OPEN_CREATE, OPEN_READWRITE} from 'sqlite3';
import SampleRepositoryImpl from './SampleRepositoryImpl';

describe('SampleRepositoryImpl', () => {
    let sut: SampleRepositoryImpl;

    function initTestDatabase(): Database {
        const dbPath = path.join(os.tmpdir(), 'plantuml-editor-electron-test.db');
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
        }
        log.info(`dbPath=${dbPath}`);
        return new Database(dbPath, OPEN_READWRITE | OPEN_CREATE);
    }

    beforeEach(async () => {
        const db = initTestDatabase();
        sut = new SampleRepositoryImpl(db);
        await sut.init();
    });

    it('add, get, count, remove', async () => {
        const added = await sut.add(123);
        assert.equal(added.getValue(), 123);
        const found = await sut.get(added.getId());
        assert.equal(found.getValue(), 123);
        try {
            await sut.get('hoge');
        } catch (reason) {
            assert.equal(reason, 'Not Found');
        }
        let n = await sut.count();
        assert.equal(n, 1);
        await sut.remove(added.getId());
        n = await sut.count();
        assert.equal(n, 0);
    });
});
