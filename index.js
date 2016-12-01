/* eslint no-return-assign: 0 */
export default function baseComponent(target) {
	target._bindedRefs = {};
	target._bindedHandlers = {};

	target.prototype._bind = function (...args) {
		args.forEach(handlerName => {
			this[handlerName] = this[handlerName].bind(this);
		});
	};

	target.prototype._bindToState = function (key, resolver) {
		const cachedHandler = this._bindedHandlers[key];
		if (cachedHandler) {
			return cachedHandler;
		}
		if (typeof resolver === 'function') {
			return e => this.setState({[key]: resolver(e)});
		}
		return e => this.setState({[key]: e.target.value});
	};

	target.prototype._refCallback = function (name, wrapped) {
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
	};
}
