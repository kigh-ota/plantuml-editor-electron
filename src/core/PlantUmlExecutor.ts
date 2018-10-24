import childProcess from 'child_process';
import {app} from 'electron';
import log from 'electron-log';
// import fs from 'fs';
import path from 'path';

export default class PlantUmlExecutor {
    public execute(src: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const chunks: any[] = [];
            const jarPath = path.join(app.getAppPath(), 'plantuml.jar');
            const cp = childProcess.spawn('java', ['-jar', jarPath, '-Djava.awt.headless=true', '-pipe']);
            cp.on('close', (code) => { log.info(`EXIT: ${code}`); });
            cp.stdin.write(`@startuml\n${src}\n@enduml`);
            cp.stdin.end();
            cp.stdout.on('data', (data) => {
                chunks.push(data);
            });
            cp.stdout.on('end', () => {
                resolve(chunks);
            });
        });
    }
}
