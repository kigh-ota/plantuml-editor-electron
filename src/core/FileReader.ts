import fs from 'fs';
import util from 'util';
export default class FileReader {
    public async read(filePath: string): Promise<string> {
        const stats = await util.promisify(fs.stat)(filePath);
        if (!stats.isFile()) {
            throw new Error('Not a file');
        }
        const data = await util.promisify(fs.readFile)(filePath);
        return data.toString();
    }
}
