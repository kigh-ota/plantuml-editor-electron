import assert from 'assert';
import React from 'react';
import {createRenderer} from 'react-test-renderer/shallow';
import Title from './Title';

describe('Title', () => {
    it('should show text', () => {
        const renderer = createRenderer();
        renderer.render(<Title title="hoge" />);
        const result = renderer.getRenderOutput();

        assert.equal(result.props.children, 'hoge');
    });
});
