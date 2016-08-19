/* eslint no-return-assign: 0 */
import React from 'react';

export default class BaseComponent extends React.Component {
	constructor(props) {
		super(props);
		this._bind(
			'_refCallback'
		);
		this._bindedRefs = {};
		this._bindedHandlers = {};
	}

	_bind(...args) {
		args.forEach(handlerName => {
			this[handlerName] = this[handlerName].bind(this);
		});
	}

	_bindToState(key, resolver) {
		const cachedHandler = this._bindedHandlers[key];
		if (cachedHandler) {
			return cachedHandler;
		}
		if (typeof resolver === 'function') {
			return e => this.setState({[key]: resolver(e)});
		}
		return e => this.setState({[key]: e.target.value});
	}

	_refCallback(name, wrapped) {
		const cachedRef = this._bindedRefs[name];
		if (cachedRef) {
			return cachedRef;
		}
		if (wrapped) {
			this._bindedRefs[name] = c => this[name] = c && c.getWrappedInstance();
		} else {
			this._bindedRefs[name] = c => this[name] = c;
		}
		return this._bindedRefs[name];
	}

	_isModified(keys, prev, next) {
		for (const key of keys) {
			const isSameType = (typeof prev[key] === 'object' && typeof next[key] === 'object');
			const equalByJSON = isSameType && JSON.stringify(prev[key]) !== JSON.stringify(next[key]);
			if (equalByJSON || prev[key] !== next[key]) {
				return true;
			}
		}
		return false;
	}
}
