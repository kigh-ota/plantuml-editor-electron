import {ipcRenderer} from 'electron';
import React from 'react';
import { EXECUTE_PLANTUML, reply } from '../ipc';

interface Props {
}

interface State {
    objurl: string;
}

export default class PreviewImage extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {objurl: ''};
    }

    public componentWillMount() {
        ipcRenderer.on(reply(EXECUTE_PLANTUML), (event: any, chunks: any[]) => {
            const blob = new Blob(chunks.map((c) => c.buffer));
            const objurl = window.URL.createObjectURL(blob);
            this.setState({objurl});
        });
        ipcRenderer.send(EXECUTE_PLANTUML, 'Alice -> Bob: こんにちは\nBob --> Alice: こんにちは、こんにちは');
    }

    public componentWillUnmount() {
        ipcRenderer.removeAllListeners(reply(EXECUTE_PLANTUML));
    }

    public render() {
        return (
            <img src={this.state.objurl}/>
        );
    }
}
