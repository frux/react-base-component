/* eslint ava/no-ignored-test-files:0 */
import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import TestComponent from './fixtures/component.test.js';

test('._bind()', t => {
	const testComponent = shallow(<TestComponent/>).instance();
	const testBindedComponent = shallow(<TestComponent bind/>).instance();
	const getContext = testComponent.getContext;
	const getBindedContext = testBindedComponent.getContext;

	t.false(getContext() === testComponent);
	t.true(getBindedContext() === testBindedComponent);
});
