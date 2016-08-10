import React from 'react';
import BaseComponent from '../../index.js';

export default class TestComponent extends BaseComponent {
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
