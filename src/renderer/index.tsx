import React from 'react';
import ReactDom from 'react-dom';
import Button from './Button';
import DropArea from './DropArea';
import PreviewImage from './PreviewImage';
import Title from './Title';

// Disable drag & drop
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());

const container = document.getElementById('contents');
ReactDom.render(
    <div>
        <Title title="plantuml-editor-electron" />
        <Button label="BUTTON"/>
        <DropArea />
        <PreviewImage />
    </div>,
    container,
);
