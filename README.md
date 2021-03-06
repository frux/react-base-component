# react-base-component [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
> Base React component extended by some helpful features

## Usage
```js
import React from 'react';
import baseComponent from 'react-base-component';

// with decorators
export default @baseComponent class MyComponent extends React.Component {
	//... your component code
}

// or without decorators
export default class MyComponent extends React.Component {
	//... your component code
}
baseComponent(MyComponent);
```

## Available features

### ._refCallback(refKey)
String refs are deprecated. So you need to provide function bound to your component. Or just ...

```js
render() {
	return (<button ref={this._refCallback('mySuperButton')}></button>);
}
```

### ._bind(handlerName1, [handlerName2, ...])

Helps you to bind your handlers more comfortably

```js
export default class MyComponent extends React.Component {
	constructor(props) {
		// ... your code

		this._bind(
			'handleClick',
			// ... list your other handlers here
		);
	}

	handleClick() {
		// ... your click handler
	}

	render() {
		return (<button onClick={this.handleClick}></button>);
	}
}
baseComponent(MyComponent);
```

### ._bindToState(stateKey, [valueResolver])
Often you have some form inputs. And every time their values changed you have to go and set it to state of your component. Stop it!

``._bindToState`` creates a handler which takes result of ``valueResolver`` function and writes it to ``this.state.<stateKey>``.

By default ``valueResolver`` equals
```js
e => e.target.value
```

So if it is your case just omit the second argument.

And a couple of examples:
```js
render() {
	return (<MySuperEmailControl onChange={this._bindToState('email', val => val)}/>);
}

render() {
	return (<input type="text" placeholder="Please enter your email" onChange={this._bindToState('email')}/>);
}
```
