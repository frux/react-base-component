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
	target._bindedRefs = {};
	target._bindedHandlers = {};

	target.prototype._bind = function () {
		var max = arguments.length;
		var i;
		for (i = 0; i < max; i++) {
			var handlerName = arguments[i];
			this[handlerName] = this[handlerName].bind(this);
		}
	};

	target.prototype._bindToState = function (key, resolver) {
		var cachedHandler = this._bindedHandlers[key];
		if (cachedHandler) {
			return cachedHandler;
		}
		resolver = (resolver || defaultResolver).bind(this);
		return (function (e) {
			var newState = {};
			newState[key] = resolver(e);
			this.setState(newState);
		}).bind(this);
	};

	target.prototype._refCallback = function (name, wrapped) {
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
