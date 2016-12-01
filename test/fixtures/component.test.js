import React from 'react';
import baseComponent from '../../index.js';

export default class TestComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		if (props.bind) {
			this._bind(
				'getContext'
			);
		}
	}

	getContext() {
		return this;
	}

	render() {
		return <div>TEST</div>;
	}
}
baseComponent(TestComponent);
