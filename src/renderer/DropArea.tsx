import {ipcRenderer} from 'electron';
import log from 'electron-log';
import React from 'react';
import { READ_FILE, reply } from '../ipc';

interface Props {}

interface State {
    text: string;
}

export default class DropArea extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {text: ''};
    }

    public componentWillMount() {
        ipcRenderer.on(reply(READ_FILE), (event: any, result: string) => {
            this.setState({text: result});
        });
    }

    public componentWillUnmount() {
        ipcRenderer.removeAllListeners(reply(READ_FILE));
    }

    public render() {
        return (
            <div
                style={{width: 300, height: 200, backgroundColor: '#ccc'}}
                onDragOver={(e) => e.preventDefault()}
                onDrop={this.handleDrop.bind(this)}
            >
                {this.state.text}
            </div>
        );
    }

    private handleDrop(e: React.DragEvent<HTMLElement>) {
        const fileList = e.dataTransfer.files;
        if (fileList.length !== 1) {
            log.info(`${fileList.length} files are dropped`);
            return;
        }
        ipcRenderer.send(READ_FILE, fileList[0].path);
    }
}
