import {app, BrowserWindow} from 'electron';
import path from 'path';
import Initializer from '../core/Initializer';
import { ADD_SAMPLE_VALUE_AND_GET_COUNT, READ_FILE, registerIpc } from '../ipc';
import IpcController from './IpcController';

let win: BrowserWindow | null;

app.on('ready', async () => {
    await initialize();
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});

async function initialize() {
    const dbPath = path.join(app.getPath('documents'), 'plantuml-editor-electron.db');
    const instances = await Initializer.initialize(dbPath);

    const ipcController = new IpcController(instances.sampleService);

    registerIpc(ADD_SAMPLE_VALUE_AND_GET_COUNT, ipcController.addSampleValueAndGetCount.bind(ipcController));
    registerIpc(READ_FILE, ipcController.readFile.bind(ipcController));
}

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    win.loadFile('index.html');
    if (process.argv.find((arg) => arg === '--debug')) {
        win.webContents.openDevTools();
    }
    win.on('closed', () => {
        win = null;
    });
}

import childProcess from 'child_process';
import fs from 'fs';
const jarPath = path.join(app.getAppPath(), 'plantuml.jar');
console.log(jarPath);
const cp = childProcess.spawn('java', ['-jar', jarPath, '-Djava.awt.headless=true', '-pipe']);
cp.addListener('exit', (code, signal) => { console.log('EXIT', code, signal); });
cp.stdin.write('@startuml\nAlice -> Bob: こんにちは\nBob --> Alice: こんにちは、こんにちは\n@enduml');
cp.stdin.end();
const fileStream = fs.createWriteStream('out.png');
cp.stdout.pipe(fileStream);
