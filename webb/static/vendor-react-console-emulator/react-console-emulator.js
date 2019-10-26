(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-fast-compare'), require('react-inner-html'), require('react-is')) :
	typeof define === 'function' && define.amd ? define('react-console-emulator', ['exports', 'react', 'react-fast-compare', 'react-inner-html', 'react-is'], factory) :
	(global = global || self, factory(global['react-console-emulator'] = {}, global.react, global.reactFastCompare, global.reactInnerHtml, global.reactIs));
}(this, (function (exports, react, reactFastCompare, reactInnerHtml, reactIs) { 'use strict';

	react = react && react.hasOwnProperty('default') ? react['default'] : react;
	reactFastCompare = reactFastCompare && reactFastCompare.hasOwnProperty('default') ? reactFastCompare['default'] : reactFastCompare;
	reactInnerHtml = reactInnerHtml && reactInnerHtml.hasOwnProperty('default') ? reactInnerHtml['default'] : reactInnerHtml;
	reactIs = reactIs && reactIs.hasOwnProperty('default') ? reactIs['default'] : reactIs;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var interopRequireWildcard = createCommonjsModule(function (module) {
	function _getRequireWildcardCache() {
	  if (typeof WeakMap !== "function") return null;
	  var cache = new WeakMap();

	  _getRequireWildcardCache = function _getRequireWildcardCache() {
	    return cache;
	  };

	  return cache;
	}

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  }

	  var cache = _getRequireWildcardCache();

	  if (cache && cache.has(obj)) {
	    return cache.get(obj);
	  }

	  var newObj = {};

	  if (obj != null) {
	    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

	        if (desc && (desc.get || desc.set)) {
	          Object.defineProperty(newObj, key, desc);
	        } else {
	          newObj[key] = obj[key];
	        }
	      }
	    }
	  }

	  newObj["default"] = obj;

	  if (cache) {
	    cache.set(obj, newObj);
	  }

	  return newObj;
	}

	module.exports = _interopRequireWildcard;
	});

	unwrapExports(interopRequireWildcard);

	var interopRequireDefault = createCommonjsModule(function (module) {
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	}

	module.exports = _interopRequireDefault;
	});

	unwrapExports(interopRequireDefault);

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	var iterableToArray = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function _typeof(obj) {
	  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return _typeof2(obj);
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf(subClass, superClass);
	}

	var inherits = _inherits;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty = _defineProperty;

	var isRegexp = function (re) {
		return Object.prototype.toString.call(re) === '[object RegExp]';
	};

	var isObj = function (x) {
		var type = typeof x;
		return x !== null && (type === 'object' || type === 'function');
	};

	var lib = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = (object) => Object
	    .getOwnPropertySymbols(object)
	    .filter((keySymbol) => object.propertyIsEnumerable(keySymbol));

	});

	unwrapExports(lib);

	const getOwnEnumPropSymbols = lib.default;

	var stringifyObject = (val, opts, pad) => {
		const seen = [];

		return (function stringify(val, opts, pad) {
			opts = opts || {};
			opts.indent = opts.indent || '\t';
			pad = pad || '';

			let tokens;

			if (opts.inlineCharacterLimit === undefined) {
				tokens = {
					newLine: '\n',
					newLineOrSpace: '\n',
					pad,
					indent: pad + opts.indent
				};
			} else {
				tokens = {
					newLine: '@@__STRINGIFY_OBJECT_NEW_LINE__@@',
					newLineOrSpace: '@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@',
					pad: '@@__STRINGIFY_OBJECT_PAD__@@',
					indent: '@@__STRINGIFY_OBJECT_INDENT__@@'
				};
			}

			const expandWhiteSpace = string => {
				if (opts.inlineCharacterLimit === undefined) {
					return string;
				}

				const oneLined = string
					.replace(new RegExp(tokens.newLine, 'g'), '')
					.replace(new RegExp(tokens.newLineOrSpace, 'g'), ' ')
					.replace(new RegExp(tokens.pad + '|' + tokens.indent, 'g'), '');

				if (oneLined.length <= opts.inlineCharacterLimit) {
					return oneLined;
				}

				return string
					.replace(new RegExp(tokens.newLine + '|' + tokens.newLineOrSpace, 'g'), '\n')
					.replace(new RegExp(tokens.pad, 'g'), pad)
					.replace(new RegExp(tokens.indent, 'g'), pad + opts.indent);
			};

			if (seen.indexOf(val) !== -1) {
				return '"[Circular]"';
			}

			if (val === null ||
				val === undefined ||
				typeof val === 'number' ||
				typeof val === 'boolean' ||
				typeof val === 'function' ||
				typeof val === 'symbol' ||
				isRegexp(val)) {
				return String(val);
			}

			if (val instanceof Date) {
				return `new Date('${val.toISOString()}')`;
			}

			if (Array.isArray(val)) {
				if (val.length === 0) {
					return '[]';
				}

				seen.push(val);

				const ret = '[' + tokens.newLine + val.map((el, i) => {
					const eol = val.length - 1 === i ? tokens.newLine : ',' + tokens.newLineOrSpace;
					let value = stringify(el, opts, pad + opts.indent);
					if (opts.transform) {
						value = opts.transform(val, i, value);
					}
					return tokens.indent + value + eol;
				}).join('') + tokens.pad + ']';

				seen.pop();

				return expandWhiteSpace(ret);
			}

			if (isObj(val)) {
				let objKeys = Object.keys(val).concat(getOwnEnumPropSymbols(val));

				if (opts.filter) {
					objKeys = objKeys.filter(el => opts.filter(val, el));
				}

				if (objKeys.length === 0) {
					return '{}';
				}

				seen.push(val);

				const ret = '{' + tokens.newLine + objKeys.map((el, i) => {
					const eol = objKeys.length - 1 === i ? tokens.newLine : ',' + tokens.newLineOrSpace;
					const isSymbol = typeof el === 'symbol';
					const isClassic = !isSymbol && /^[a-z$_][a-z$_0-9]*$/i.test(el);
					const key = isSymbol || isClassic ? el : stringify(el, opts);
					let value = stringify(val[el], opts, pad + opts.indent);
					if (opts.transform) {
						value = opts.transform(val, el, value);
					}
					return tokens.indent + String(key) + ': ' + value + eol;
				}).join('') + tokens.pad + '}';

				seen.pop();

				return expandWhiteSpace(ret);
			}

			val = String(val).replace(/[\r\n]/g, x => x === '\n' ? '\\n' : '\\r');

			if (opts.singleQuotes === false) {
				val = val.replace(/"/g, '\\"');
				return `"${val}"`;
			}

			val = val.replace(/\\?'/g, '\\\'');
			return `'${val}'`;
		})(val, opts, pad);
	};

	var clone_1 = createCommonjsModule(function (module) {
	var clone = (function() {

	/**
	 * Clones (copies) an Object using deep copying.
	 *
	 * This function supports circular references by default, but if you are certain
	 * there are no circular references in your object, you can save some CPU time
	 * by calling clone(obj, false).
	 *
	 * Caution: if `circular` is false and `parent` contains circular references,
	 * your program may enter an infinite loop and crash.
	 *
	 * @param `parent` - the object to be cloned
	 * @param `circular` - set to true if the object to be cloned may contain
	 *    circular references. (optional - true by default)
	 * @param `depth` - set to a number if the object is only to be cloned to
	 *    a particular depth. (optional - defaults to Infinity)
	 * @param `prototype` - sets the prototype to be used when cloning an object.
	 *    (optional - defaults to parent prototype).
	*/
	function clone(parent, circular, depth, prototype) {
	  var filter;
	  if (typeof circular === 'object') {
	    depth = circular.depth;
	    prototype = circular.prototype;
	    filter = circular.filter;
	    circular = circular.circular;
	  }
	  // maintain two arrays for circular references, where corresponding parents
	  // and children have the same index
	  var allParents = [];
	  var allChildren = [];

	  var useBuffer = typeof Buffer != 'undefined';

	  if (typeof circular == 'undefined')
	    circular = true;

	  if (typeof depth == 'undefined')
	    depth = Infinity;

	  // recurse this function so we don't reset allParents and allChildren
	  function _clone(parent, depth) {
	    // cloning null always returns null
	    if (parent === null)
	      return null;

	    if (depth == 0)
	      return parent;

	    var child;
	    var proto;
	    if (typeof parent != 'object') {
	      return parent;
	    }

	    if (clone.__isArray(parent)) {
	      child = [];
	    } else if (clone.__isRegExp(parent)) {
	      child = new RegExp(parent.source, __getRegExpFlags(parent));
	      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
	    } else if (clone.__isDate(parent)) {
	      child = new Date(parent.getTime());
	    } else if (useBuffer && Buffer.isBuffer(parent)) {
	      if (Buffer.allocUnsafe) {
	        // Node.js >= 4.5.0
	        child = Buffer.allocUnsafe(parent.length);
	      } else {
	        // Older Node.js versions
	        child = new Buffer(parent.length);
	      }
	      parent.copy(child);
	      return child;
	    } else {
	      if (typeof prototype == 'undefined') {
	        proto = Object.getPrototypeOf(parent);
	        child = Object.create(proto);
	      }
	      else {
	        child = Object.create(prototype);
	        proto = prototype;
	      }
	    }

	    if (circular) {
	      var index = allParents.indexOf(parent);

	      if (index != -1) {
	        return allChildren[index];
	      }
	      allParents.push(parent);
	      allChildren.push(child);
	    }

	    for (var i in parent) {
	      var attrs;
	      if (proto) {
	        attrs = Object.getOwnPropertyDescriptor(proto, i);
	      }

	      if (attrs && attrs.set == null) {
	        continue;
	      }
	      child[i] = _clone(parent[i], depth - 1);
	    }

	    return child;
	  }

	  return _clone(parent, depth);
	}

	/**
	 * Simple flat clone using prototype, accepts only objects, usefull for property
	 * override on FLAT configuration object (no nested props).
	 *
	 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
	 * works.
	 */
	clone.clonePrototype = function clonePrototype(parent) {
	  if (parent === null)
	    return null;

	  var c = function () {};
	  c.prototype = parent;
	  return new c();
	};

	// private utility functions

	function __objToStr(o) {
	  return Object.prototype.toString.call(o);
	}clone.__objToStr = __objToStr;

	function __isDate(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Date]';
	}clone.__isDate = __isDate;

	function __isArray(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Array]';
	}clone.__isArray = __isArray;

	function __isRegExp(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
	}clone.__isRegExp = __isRegExp;

	function __getRegExpFlags(re) {
	  var flags = '';
	  if (re.global) flags += 'g';
	  if (re.ignoreCase) flags += 'i';
	  if (re.multiline) flags += 'm';
	  return flags;
	}clone.__getRegExpFlags = __getRegExpFlags;

	return clone;
	})();

	if ( module.exports) {
	  module.exports = clone;
	}
	});

	var defaults = function(options, defaults) {
	  options = options || {};

	  Object.keys(defaults).forEach(function(key) {
	    if (typeof options[key] === 'undefined') {
	      options[key] = clone_1(defaults[key]);
	    }
	  });

	  return options;
	};

	var _extends_1 = createCommonjsModule(function (module) {
	function _extends() {
	  module.exports = _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	module.exports = _extends;
	});

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	var ReactPropTypesSecret_1 = ReactPropTypesSecret;

	var printWarning = function() {};

	{
	  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
	  var loggedTypeFailures = {};
	  var has = Function.call.bind(Object.prototype.hasOwnProperty);

	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          );
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}

	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function() {
	  {
	    loggedTypeFailures = {};
	  }
	};

	var checkPropTypes_1 = checkPropTypes;

	var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
	var printWarning$1 = function() {};

	{
	  printWarning$1 = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret_1) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if ( typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning$1(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!reactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      {
	        if (arguments.length > 1) {
	          printWarning$1(
	            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
	            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
	          );
	        } else {
	          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (has$1(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	       printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') ;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning$1(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = objectAssign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes_1;
	  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	var propTypes = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	{
	  var ReactIs = reactIs;

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
	}
	});

	var TerminalMessage = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _propTypes = interopRequireDefault(propTypes);

	var _default = {
	  content: _propTypes["default"].node
	};
	exports["default"] = _default;
	});

	unwrapExports(TerminalMessage);

	var TerminalMessage$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;
	var _default = {
	  margin: '0',
	  lineHeight: '21px'
	};
	exports["default"] = _default;
	});

	unwrapExports(TerminalMessage$1);

	var TerminalMessage_1 = createCommonjsModule(function (module, exports) {





	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _extends2 = interopRequireDefault(_extends_1);

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _defineProperty2 = interopRequireDefault(defineProperty);

	var _react = interopRequireWildcard(react);

	var _reactInnerHtml = interopRequireDefault(reactInnerHtml);

	var _TerminalMessage = interopRequireDefault(TerminalMessage);

	var _TerminalMessage2 = interopRequireDefault(TerminalMessage$1);

	var TerminalMessage$2 =
	/*#__PURE__*/
	function (_Component) {
	  (0, _inherits2["default"])(TerminalMessage, _Component);

	  function TerminalMessage() {
	    (0, _classCallCheck2["default"])(this, TerminalMessage);
	    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TerminalMessage).apply(this, arguments));
	  }

	  (0, _createClass2["default"])(TerminalMessage, [{
	    key: "render",
	    value: function render() {
	      var content = this.props.content;
	      var styles = {
	        message: _TerminalMessage2["default"]
	      };
	      return this.props.dangerMode ? _react["default"].createElement("p", (0, _extends2["default"])({
	        style: styles.message
	      }, (0, _reactInnerHtml["default"])(content))) : _react["default"].createElement("p", {
	        style: styles.message
	      }, content);
	    }
	  }]);
	  return TerminalMessage;
	}(_react.Component);

	exports["default"] = TerminalMessage$2;
	(0, _defineProperty2["default"])(TerminalMessage$2, "propTypes", _TerminalMessage["default"]);
	});

	unwrapExports(TerminalMessage_1);

	var validateCommands_1 = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = validateCommands;

	var _typeof2 = interopRequireDefault(_typeof_1);

	var _defineProperty2 = interopRequireDefault(defineProperty);

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function validateCommands(commands, helpFn, clearFn, noDefaults) {
	  var defaultCommands = {
	    help: {
	      description: 'Show a list of available commands.',
	      fn: helpFn
	    },
	    clear: {
	      description: 'Empty the terminal window.',
	      explicitExec: true,
	      fn: clearFn
	    }
	  };
	  var immutables = Object.keys(defaultCommands);
	  var validCommands; // Pre-register defaults

	  if (!noDefaults) validCommands = _objectSpread({}, defaultCommands);else validCommands = {};

	  for (var c in commands) {
	    // Check that command contains a function
	    if (typeof commands[c].fn !== 'function') {
	      throw new Error("'fn' property of command '".concat(c, "' is invalid; expected 'function', got '").concat((0, _typeof2["default"])(commands[c].fn), "'"));
	    } // Check that the command does not attempt to override immutables


	    if (!noDefaults && immutables.includes(c)) {
	      throw new Error("Attempting to overwrite default command '".concat(immutables[immutables.indexOf(c)], "'; cannot override default commands when noDefaults isn't set"));
	    } // Add description if missing


	    if (!commands[c].description) commands[c].description = 'None'; // Pass validation

	    validCommands[c] = commands[c];
	  }

	  return validCommands;
	}
	});

	unwrapExports(validateCommands_1);

	var cleanArray_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = cleanArray;

	/**
	 * Workaround to clean an array from 'ghost items'.
	 * @param {Array} dirtyArray
	 */
	function cleanArray(dirtyArray) {
	  var newArray = Array.from(dirtyArray);
	  return newArray.filter(function (i) {
	    return i !== undefined;
	  });
	}
	});

	unwrapExports(cleanArray_1);

	var scrollHistory_1 = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = scrollHistory;

	var _cleanArray = interopRequireDefault(cleanArray_1);

	function scrollHistory(direction, commandHistory, historyPosition, previousHistoryPosition, terminalInput, noAutomaticStdout) {
	  var history = (0, _cleanArray["default"])(commandHistory).reverse(); // Clean empty items and reverse order to ease position tracking

	  var position = historyPosition;
	  var previousPosition = previousHistoryPosition;
	  var termNode = terminalInput.current;

	  if (!noAutomaticStdout && history.length > 0) {
	    // Only run if history is non-empty and in use
	    switch (direction) {
	      case 'up':
	        if (position === null) {
	          // If at no position, get most recent entry
	          termNode.value = history[0];
	          return {
	            historyPosition: 0,
	            previousHistoryPosition: null
	          };
	        } else if (position + 1 === history.length) {
	          // If the first entry will be reached on this press, get it and decrement position by 1 to avoid confusing downscroll
	          termNode.value = history[history.length - 1];
	          return {
	            historyPosition: history.length - 1,
	            previousHistoryPosition: history.length - 2
	          };
	        } else {
	          // Normal increment by one
	          termNode.value = history[position + 1];
	          return {
	            historyPosition: position + 1,
	            previousHistoryPosition: position
	          };
	        }

	      case 'down':
	        if (position === null || !history[position]) {
	          // If at initial or out of range, clear (Unix-like behaviour)
	          termNode.value = '';
	          return {
	            historyPosition: null,
	            previousHistoryPosition: null
	          };
	        } else if (position - 1 === -1) {
	          // Clear because user pressed up once and is now pressing down again => clear or is reaching bottom
	          if (previousPosition === null || position === 0 && previousPosition === 1) termNode.value = '';else termNode.value = history[0];
	          return {
	            historyPosition: null,
	            previousHistoryPosition: null
	          };
	        } else {
	          // Normal decrement by one
	          termNode.value = history[position - 1];
	          return {
	            historyPosition: position - 1,
	            previousHistoryPosition: position
	          };
	        }

	    }
	  }
	}
	});

	unwrapExports(scrollHistory_1);

	var Terminal = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;
	var _default = {
	  container: {
	    minWidth: '500x',
	    minHeight: '300px',
	    maxWidth: '100%',
	    // Fill parent before overflowing
	    maxHeight: '100%',
	    // Fill parent before overflowing
	    borderRadius: '5px',
	    overflow: 'auto',
	    cursor: 'text',
	    background: '#212121',
	    backgroundSize: 'cover'
	  },
	  content: {
	    padding: '20px',
	    height: '100%',
	    fontSize: '15px',
	    color: '#FFFFFF',
	    fontFamily: 'monospace'
	  },
	  inputArea: {
	    display: 'inline-flex',
	    width: '100%'
	  },
	  promptLabel: {
	    paddingTop: '3px',
	    color: '#EE9C34'
	  },
	  input: {
	    border: '0',
	    padding: '0 0 0 7px',
	    margin: '0',
	    flexGrow: '100',
	    width: '100%',
	    height: '22px',
	    background: 'transparent',
	    fontSize: '15px',
	    color: '#F0BF81',
	    fontFamily: 'monospace',
	    outline: 'none' // Fix for outline showing up on some browsers

	  }
	};
	exports["default"] = _default;
	});

	unwrapExports(Terminal);

	var Terminal$1 = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _defineProperty2 = interopRequireDefault(defineProperty);

	var _propTypes = interopRequireDefault(propTypes);

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var styleTypes = {
	  style: _propTypes["default"].object,
	  contentStyle: _propTypes["default"].object,
	  inputAreaStyle: _propTypes["default"].object,
	  promptLabelStyle: _propTypes["default"].object,
	  inputStyle: _propTypes["default"].object
	};
	var classNameTypes = {
	  className: _propTypes["default"].string,
	  contentClassName: _propTypes["default"].string,
	  inputAreaClassName: _propTypes["default"].string,
	  promptLabelClassName: _propTypes["default"].string,
	  inputClassName: _propTypes["default"].string
	};
	var optionTypes = {
	  autoFocus: _propTypes["default"].bool,
	  dangerMode: _propTypes["default"].bool,
	  disableOnProcess: _propTypes["default"].bool,
	  noDefaults: _propTypes["default"].bool,
	  noAutomaticStdout: _propTypes["default"].bool,
	  noHistory: _propTypes["default"].bool,
	  noAutoScroll: _propTypes["default"].bool
	};
	var labelTypes = {
	  welcomeMessage: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].array, _propTypes["default"].string]),
	  promptLabel: _propTypes["default"].string,
	  errorText: _propTypes["default"].string
	};
	var commandTypes = {
	  commands: _propTypes["default"].object.isRequired,
	  commandCallback: _propTypes["default"].func
	};

	var _default = _objectSpread({}, styleTypes, {}, classNameTypes, {}, optionTypes, {}, labelTypes, {}, commandTypes);

	exports["default"] = _default;
	});

	unwrapExports(Terminal$1);

	var Terminal_1 = createCommonjsModule(function (module, exports) {





	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "TerminalMessage", {
	  enumerable: true,
	  get: function get() {
	    return _TerminalMessage["default"];
	  }
	});
	Object.defineProperty(exports, "validateCommands", {
	  enumerable: true,
	  get: function get() {
	    return _validateCommands2["default"];
	  }
	});
	Object.defineProperty(exports, "scrollHistory", {
	  enumerable: true,
	  get: function get() {
	    return _scrollHistory2["default"];
	  }
	});
	Object.defineProperty(exports, "sourceStyles", {
	  enumerable: true,
	  get: function get() {
	    return _Terminal["default"];
	  }
	});
	Object.defineProperty(exports, "types", {
	  enumerable: true,
	  get: function get() {
	    return _Terminal2["default"];
	  }
	});
	exports["default"] = void 0;

	var _toConsumableArray2 = interopRequireDefault(toConsumableArray);

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _assertThisInitialized2 = interopRequireDefault(assertThisInitialized);

	var _inherits2 = interopRequireDefault(inherits);

	var _defineProperty2 = interopRequireDefault(defineProperty);

	var _react = interopRequireWildcard(react);

	var _stringifyObject = interopRequireDefault(stringifyObject);

	var _defaults = interopRequireDefault(defaults);

	var _reactFastCompare = interopRequireDefault(reactFastCompare);

	var _TerminalMessage = interopRequireDefault(TerminalMessage_1);

	var _validateCommands2 = interopRequireDefault(validateCommands_1);

	var _scrollHistory2 = interopRequireDefault(scrollHistory_1);

	var _Terminal = interopRequireDefault(Terminal);

	var _Terminal2 = interopRequireDefault(Terminal$1);

	// Components
	// Handlers
	// Definitions
	var Terminal$2 =
	/*#__PURE__*/
	function (_Component) {
	  (0, _inherits2["default"])(Terminal, _Component);

	  function Terminal(props) {
	    var _this;

	    (0, _classCallCheck2["default"])(this, Terminal);
	    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Terminal).call(this, props));
	    _this.state = {
	      commands: {},
	      stdout: [],
	      history: [],
	      historyPosition: null,
	      previousHistoryPosition: null,
	      processing: false
	    };
	    _this.terminalRoot = _react["default"].createRef();
	    _this.terminalInput = _react["default"].createRef();
	    _this.focusTerminal = _this.focusTerminal.bind((0, _assertThisInitialized2["default"])(_this));
	    _this.validateCommands = _this.validateCommands.bind((0, _assertThisInitialized2["default"])(_this));
	    _this.showWelcomeMessage = _this.showWelcomeMessage.bind((0, _assertThisInitialized2["default"])(_this));
	    _this.showHelp = _this.showHelp.bind((0, _assertThisInitialized2["default"])(_this));
	    _this.pushToStdout = _this.pushToStdout.bind((0, _assertThisInitialized2["default"])(_this));
	    _this.getStdout = _this.getStdout.bind((0, _assertThisInitialized2["default"])(_this));
	    _this.clearStdout = _this.clearStdout.bind((0, _assertThisInitialized2["default"])(_this));
	    _this.processCommand = _this.processCommand.bind((0, _assertThisInitialized2["default"])(_this));
	    _this.handleInput = _this.handleInput.bind((0, _assertThisInitialized2["default"])(_this));
	    return _this;
	  }

	  (0, _createClass2["default"])(Terminal, [{
	    key: "focusTerminal",
	    value: function focusTerminal() {
	      this.terminalInput.current.focus();
	    }
	  }, {
	    key: "scrollToBottom",
	    value: function scrollToBottom() {
	      var rootNode = this.terminalRoot.current; // This may look ridiculous, but it is necessary to decouple execution for just a millisecond in order to scroll all the way

	      setTimeout(function () {
	        rootNode.scrollTop = rootNode.scrollHeight;
	      }, 1);
	    }
	  }, {
	    key: "validateCommands",
	    value: function validateCommands() {
	      var validCommands = (0, _validateCommands2["default"])(this.props.commands, this.showHelp, this.clearStdout, this.props.noDefaults);
	      this.setState({
	        commands: validCommands
	      });
	    }
	  }, {
	    key: "showWelcomeMessage",
	    value: function showWelcomeMessage() {
	      var _this2 = this;

	      var msg = this.props.welcomeMessage;
	      if (typeof msg === 'boolean') this.pushToStdout("Welcome to the React terminal! Type 'help' to get a list of commands.");else if (Array.isArray(msg)) msg.map(function (item) {
	        return _this2.pushToStdout(item);
	      });else this.pushToStdout(msg);
	    }
	  }, {
	    key: "showHelp",
	    value: function showHelp() {
	      var commands = this.state.commands;

	      for (var c in commands) {
	        var cmdObj = commands[c];
	        var usage = cmdObj.usage ? " - ".concat(cmdObj.usage) : '';
	        this.pushToStdout("".concat(c, " - ").concat(cmdObj.description).concat(usage));
	      }
	    }
	  }, {
	    key: "pushToStdout",
	    value: function pushToStdout(message, rawInput) {
	      var _this$state = this.state,
	          stdout = _this$state.stdout,
	          history = _this$state.history;
	      stdout.push(message);

	      if (rawInput) {
	        // Only supplied if history is enabled
	        history.push(rawInput);
	        this.setState({
	          stdout: stdout,
	          history: history,
	          historyPosition: null
	        });
	      } else {
	        this.setState({
	          stdout: stdout
	        });
	      }
	    }
	  }, {
	    key: "getStdout",
	    value: function getStdout() {
	      return this.state.stdout.map(function (line, i) {
	        return _react["default"].createElement(_TerminalMessage["default"], {
	          key: i,
	          content: line
	        });
	      });
	    }
	  }, {
	    key: "clearStdout",
	    value: function clearStdout() {
	      this.setState({
	        stdout: []
	      });
	    }
	  }, {
	    key: "clearInput",
	    value: function clearInput() {
	      this.setState({
	        historyPosition: null
	      });
	      this.terminalInput.current.value = '';
	    }
	  }, {
	    key: "processCommand",
	    value: function processCommand() {
	      var _this3 = this;

	      this.setState({
	        processing: true
	      }, function () {
	        // Initialise command result object
	        var commandResult = {
	          command: null,
	          args: [],
	          rawInput: null,
	          result: null
	        };
	        var rawInput = _this3.terminalInput.current.value;

	        if (!_this3.props.noAutomaticStdout) {
	          if (!_this3.props.noHistory) _this3.pushToStdout("".concat(_this3.props.promptLabel || '$', " ").concat(rawInput), rawInput);else _this3.pushToStdout("".concat(_this3.props.promptLabel || '$', " ").concat(rawInput));
	        }

	        if (rawInput) {
	          var input = rawInput.split(' ');
	          var command = input.splice(0, 1)[0]; // Removed portion is returned...

	          var args = input; // ...and the rest can be used

	          commandResult.rawInput = rawInput;
	          commandResult.command = command;
	          commandResult.args = args;
	          var cmdObj = _this3.state.commands[command];
	          if (!cmdObj) _this3.pushToStdout(_this3.props.errorText ? _this3.props.errorText.replace(/\[command\]/gi, command) : "Command '".concat(command, "' not found!"));else {
	            var res = cmdObj.fn.apply(cmdObj, (0, _toConsumableArray2["default"])(args));

	            _this3.pushToStdout(res);

	            commandResult.result = res;
	            if (cmdObj.explicitExec) cmdObj.fn.apply(cmdObj, (0, _toConsumableArray2["default"])(args));
	          }
	        }

	        _this3.setState({
	          processing: false
	        }, function () {
	          _this3.clearInput();

	          if (!_this3.props.noAutoScroll) _this3.scrollToBottom();
	          if (_this3.props.commandCallback) _this3.props.commandCallback(commandResult);
	        });
	      });
	    }
	  }, {
	    key: "scrollHistory",
	    value: function scrollHistory(direction) {
	      var toUpdate = (0, _scrollHistory2["default"])(direction, this.state.history, this.state.historyPosition, this.state.previousHistoryPosition, this.terminalInput, this.props.noAutomaticStdout);
	      this.setState(toUpdate);
	    }
	  }, {
	    key: "handleInput",
	    value: function handleInput(event) {
	      switch (event.key) {
	        case 'Enter':
	          this.processCommand();
	          break;

	        case 'ArrowUp':
	          this.scrollHistory('up');
	          break;

	        case 'ArrowDown':
	          this.scrollHistory('down');
	          break;
	      }
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      var oldCommands = (0, _stringifyObject["default"])(prevProps.commands);
	      var currentCommands = (0, _stringifyObject["default"])(this.props.commands); // If there was a change in commands, re-validate

	      if (!(0, _reactFastCompare["default"])(oldCommands, currentCommands)) this.validateCommands();
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.validateCommands();
	      if (this.props.welcomeMessage) this.showWelcomeMessage();
	      if (this.props.autoFocus) this.focusTerminal();
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var styles = {
	        container: (0, _defaults["default"])(this.props.style, _Terminal["default"].container),
	        content: (0, _defaults["default"])(this.props.contentStyle, _Terminal["default"].content),
	        inputArea: (0, _defaults["default"])(this.props.inputAreaStyle, _Terminal["default"].inputArea),
	        promptLabel: (0, _defaults["default"])(this.props.promptLabelStyle, _Terminal["default"].promptLabel),
	        input: (0, _defaults["default"])(this.props.inputStyle, _Terminal["default"].input)
	      };
	      return _react["default"].createElement("div", {
	        ref: this.terminalRoot,
	        name: 'react-console-emulator',
	        className: this.props.className,
	        style: styles.container,
	        onClick: this.focusTerminal
	      }, _react["default"].createElement("div", {
	        name: 'react-console-emulator__content',
	        className: this.props.contentClassName,
	        style: styles.content
	      }, this.getStdout(), _react["default"].createElement("div", {
	        name: 'react-console-emulator__inputArea',
	        className: this.props.inputAreaClassName,
	        style: styles.inputArea
	      }, _react["default"].createElement("span", {
	        name: 'react-console-emulator__promptLabel',
	        className: this.props.promptLabelClassName,
	        style: styles.promptLabel
	      }, this.props.promptLabel || '$'), _react["default"].createElement("input", {
	        ref: this.terminalInput,
	        name: 'react-console-emulator__input',
	        className: this.props.inputClassName,
	        style: styles.input,
	        onKeyDown: this.handleInput,
	        disabled: this.props.disableOnProcess && this.state.processing,
	        type: 'text',
	        autoComplete: 'off'
	      }))));
	    }
	  }]);
	  return Terminal;
	}(_react.Component);

	exports["default"] = Terminal$2;
	(0, _defineProperty2["default"])(Terminal$2, "propTypes", _Terminal2["default"]);
	});

	unwrapExports(Terminal_1);

	exports.__moduleExports = Terminal_1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
