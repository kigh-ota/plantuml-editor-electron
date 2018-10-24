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
    const dbPath = path.join(app.getPath('documents'), 'ts-electron.db');
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
