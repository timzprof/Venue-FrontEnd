import React from 'react';
import Home from '../containers/Home/Home';
import { create } from 'react-test-renderer';

test('Home Container renders', () => {
    const component = create(<Home />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})