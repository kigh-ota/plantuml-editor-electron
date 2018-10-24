import {ipcRenderer} from 'electron';
import React from 'react';
import { ADD_SAMPLE_VALUE_AND_GET_COUNT, reply } from '../ipc';

interface Props {
    label: string;
}

interface State {
    count: number;
}

export default class Button extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {count: 0};
    }

    public componentWillMount() {
        ipcRenderer.on(reply(ADD_SAMPLE_VALUE_AND_GET_COUNT), (event: any, count: number) => {
            this.setState({count});
        });
    }

    public componentWillUnmount() {
        ipcRenderer.removeAllListeners(reply(ADD_SAMPLE_VALUE_AND_GET_COUNT));
    }

    public render() {
        return (
            <div>
                <button onClick={this.handleClick}>{this.props.label}</button>
                <span>{this.state.count}</span>
            </div>
        );
    }

    private handleClick(e: React.MouseEvent<HTMLElement>) {
        ipcRenderer.send(ADD_SAMPLE_VALUE_AND_GET_COUNT);
    }
}
