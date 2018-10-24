import React from 'react';

interface PropsType {
    title: string;
}

export default class Title extends React.Component<PropsType, {}> {
    public render() {
        return (<h1>{this.props.title}</h1>);
    }
}
