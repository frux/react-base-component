/* eslint no-return-assign: 0 */
function defaultResolver(e) {
	return e.target.value;
}
function defaultRef(name, c) {
	this[name] = c;
}
function wrappedRef(name, c) {
	this[name] = c.getWrappedInstance();
}

module.exports = function baseComponent(target) {
	target.prototype._bind = function () {
		var max = arguments.length;
		var i;
		for (i = 0; i < max; i++) {
			var handlerName = arguments[i];
			this[handlerName] = this[handlerName].bind(this);
		}
	};

	target.prototype._bindToState = function (key, resolver) {
		if (!this._bindedHandlers) {
			this._bindedHandlers = {};
		}
		if (!this._bindedHandlers[key]) {
			resolver = (resolver || defaultResolver).bind(this);
			this._bindedHandlers[key] = (function (e) {
				var newState = {};
				newState[key] = resolver(e);
				this.setState(newState);
			}).bind(this);
		}
		return this._bindedHandlers[key];
	};

	target.prototype._refCallback = function (name, wrapped) {
		if (!this._bindedRefs) {
			this._bindedRefs = {};
		}
		if (!this._bindedRefs[name]) {
			if (wrapped) {
				this._bindedRefs[name] = wrappedRef.bind(this, name);
			} else {
				this._bindedRefs[name] = defaultRef.bind(this, name);
			}
		}
		return this._bindedRefs[name];
	};
};
