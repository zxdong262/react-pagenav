(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactPagenav"] = factory(require("react"));
	else
		root["ReactPagenav"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ReactPagenav = function (_Component) {
		_inherits(ReactPagenav, _Component);
	
		function ReactPagenav(props) {
			_classCallCheck(this, ReactPagenav);
	
			var _this = _possibleConstructorReturn(this, (ReactPagenav.__proto__ || Object.getPrototypeOf(ReactPagenav)).call(this, props));
	
			_initialiseProps.call(_this);
	
			return _this;
		}
	
		_createClass(ReactPagenav, [{
			key: 'handleClick',
			value: function handleClick(page, url, e) {
				if (this.props.onLinkClick) {
					this.props.onLinkClick(page, url, e);
				}
			}
		}, {
			key: 'render',
			value: function (_render) {
				function render() {
					return _render.apply(this, arguments);
				}
	
				render.toString = function () {
					return _render.toString();
				};
	
				return render;
			}(function () {
				var props = this.props;
	
				var units = ReactPagenav.default.buildUnits(props);
				var lang = _extends({}, ReactPagenav.default.lang, props.lang);
				var opts = _extends({}, ReactPagenav.default, props);
				if (props.render) return render.bind(units, props);
				return _react2.default.createElement(
					'nav',
					{ className: 'zpagenav' },
					_react2.default.createElement(
						'span',
						{ className: 'pagination page-link m-r-1' },
						lang.total,
						': ',
						this.props.total
					),
					_react2.default.createElement(
						'ul',
						{ className: 'pagination' },
						units.map((props.unitRender || this.unitRender).bind(this))
					)
				);
			})
		}]);
	
		return ReactPagenav;
	}(_react.Component);
	
	ReactPagenav.propTypes = {
		page: _react.PropTypes.number,
		total: _react.PropTypes.number,
		pageSize: _react.PropTypes.number,
		maxLink: _react.PropTypes.number,
		onLinkClick: _react.PropTypes.func,
		unitRender: _react.PropTypes.func,
		render: _react.PropTypes.func,
		lang: _react.PropTypes.object,
		createPageUrl: _react.PropTypes.func
	};
	ReactPagenav.default = {
		page: 1,
		total: 0,
		pageSize: 10,
		prevHtml: '«',
		nextHtml: '»',
		prevSrHtml: 'Previous',
		nextSrHtml: 'Next',
		dotsHtml: '...',
		createPageUrl: function createPageUrl(unit) {
			return unit.page === 1 ? '#' : '#p=' + unit.page;
		},
		lang: {
			total: 'total'
		},
		buildUnits: function buildUnits(props) {
	
			var option = ReactPagenav.default;
			var page = props.page || option.page;
			var pageSize = props.pageSize || option.pageSize;
			var total = props.total || option.total;
			var maxLink = props.maxLink > 5 ? props.maxLink : 5;
	
			var linksCount = Math.ceil(total / pageSize);
	
			if (page > linksCount) page = linksCount + 0;
	
			var hasPrev = page > 1;
			var hasNext = page < linksCount;
			var realMaxLink = maxLink > linksCount ? linksCount : maxLink;
			var len1 = void 0,
			    len2 = void 0,
			    len3 = void 0,
			    shouldInsertDots12 = void 0,
			    shouldInsertDots23 = void 0;
			var len2Start = void 0,
			    len3Start = void 0;
	
			var units = [];
			var arr = computeLens();
	
			units.push({
				class: hasPrev ? '' : 'disabled',
				page: hasPrev ? page - 1 : page,
				isPager: true,
				isPrev: true,
				isNext: false,
				html: option.prevHtml,
				srHtml: option.prevSrHtml,
				ariaLabel: option.prevSrHtml
			});
	
			var dotUnit = {
				class: 'disabled',
				page: page,
				isPager: false,
				isPrev: false,
				isNext: true,
				html: option.dotsHtml
			};
	
			for (var i = 0, len = arr.length; i < len; i++) {
				pushUnit(arr[i]);
			}
	
			units.push({
				class: hasNext ? '' : 'disabled',
				page: hasNext ? page + 1 : page,
				isPager: true,
				isPrev: false,
				isNext: true,
				html: option.nextHtml,
				srHtml: option.nextSrHtml,
				ariaLabel: option.nextSrHtml
			});
	
			function pushUnit(i) {
				if (typeof i === 'number') {
					units.push({
						page: i,
						isPrev: false,
						isPager: false,
						disabled: false,
						class: i === page ? 'active' : '',
						isNext: false,
						html: i
					});
				} else units.push(dotUnit);
			}
	
			function computeLens() {
				var a4 = Math.floor((realMaxLink - 2) / 2);
				var a5 = realMaxLink - 3 - a4;
				var s2 = page - a4;
				var s3 = page + a5;
				if (s2 < 2) {
					s2 = 2;
				} else if (s3 > linksCount) {
					s2 = linksCount - (realMaxLink - 2);
				}
				var arr = [1];
				if (s2 > 2) arr.push('dot');
				var it = void 0;
				for (var _i = 0, _len = realMaxLink - 2 < 1 ? realMaxLink - 1 : realMaxLink - 2; _i < _len; _i++) {
					it = _i + s2;
					arr.push(it);
				}
				if (it < linksCount - 1) arr.push('dot');
				if (it < linksCount) arr.push(linksCount);
				return arr;
			}
	
			return units;
			//end unit
		}
	};
	
	var _initialiseProps = function _initialiseProps() {
		var _this2 = this;
	
		this.unitRender = function (unit, index) {
	
			var stats = _extends({}, ReactPagenav.default, _this2.props);
			var span = unit.isPager ? _react2.default.createElement('span', { 'aria-hidden': true, dangerouslySetInnerHTML: { __html: unit.html } }) : _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: unit.html } });
	
			var sr = unit.isPager ? _react2.default.createElement('span', { className: 'sr-only', dangerouslySetInnerHTML: { __html: unit.srHtml } }) : null;
	
			var url = stats.createPageUrl(unit);
	
			return _react2.default.createElement(
				'li',
				{ key: index, onClick: _this2.handleClick.bind(_this2, unit.page, url), className: 'page-item ' + unit.class },
				_react2.default.createElement(
					'a',
					{ className: 'page-link', href: url, 'aria-label': unit.ariaLabel },
					span,
					sr
				)
			);
		};
	};
	
	module.exports = exports.default = ReactPagenav;

/***/ }
/******/ ])
});
;