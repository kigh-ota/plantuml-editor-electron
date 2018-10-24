import { ipcMain } from 'electron';
import log from 'electron-log';

export const ADD_SAMPLE_VALUE_AND_GET_COUNT = 'addSampleValueAndGetCount';
export const READ_FILE = 'readFile';
export const EXECUTE_PLANTUML = 'executePlantUml';

export const reply = (channel: string) => `${channel}-reply`;

export function registerIpc<Req, Res>(channel: string, handler: (req: Req) => Res) {
    ipcMain.on(channel, async (event: any, req: Req) => {
        log.info(channel);
        const res = await handler(req);
        event.sender.send(reply(channel), res);
    });
}
