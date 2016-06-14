/**
 * react-pagenav
 * @version v0.3.0 - 2016-06-14
 * @link https://github.com/zxdong262/react-pagenav
 * @author ZHAO Xudong (zxdong@gmail.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'react', './react-pagenav.jsx'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('react'), require('./react-pagenav.jsx'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.React, global.ReactPagenav);
		global.App = mod.exports;
	}
})(this, function (exports, _react, _reactPagenav) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _reactPagenav2 = _interopRequireDefault(_reactPagenav);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
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

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var App = function (_Component) {
		_inherits(App, _Component);

		function App(props) {
			_classCallCheck(this, App);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

			_this.state = {
				page: 1,
				total: 300,
				pageSize: 10,
				maxLink: 5
			};

			_this.handleClick = function (page, url, e) {
				_this.setState({ page: page });
			};

			return _this;
		}

		_createClass(App, [{
			key: 'handleChange',
			value: function handleChange(name, e) {
				this.setState(_defineProperty({}, name, parseInt(e.target.value, 10)));
			}
		}, {
			key: 'render',
			value: function render() {

				var createPageUrl = function createPageUrl(unit) {
					return unit.page === 1 ? '' : '#p=' + unit.page;
				};

				var names = Object.keys(this.state);

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						null,
						names.map(function (name, index) {
							return _react2.default.createElement(
								'div',
								{ key: index, className: 'form-group' },
								_react2.default.createElement(
									'label',
									null,
									'*',
									name
								),
								_react2.default.createElement('input', { className: 'form-control', type: 'value', name: name, onChange: this.handleChange.bind(this, name), value: this.state[name] })
							);
						}, this)
					),
					_react2.default.createElement('hr', null),
					_react2.default.createElement(_reactPagenav2.default, _extends({}, this.state, { onLinkClick: this.handleClick, createPageUrl: createPageUrl }))
				);
			}
		}]);

		return App;
	}(_react.Component);

	exports.default = App;
});
