module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(8)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(5);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/H-Doc.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var H_Doc = ({
  name: 'h-doc',
  props: {
    config: {
      type: Object,
      required: true
    },
    simulator: String,
    simulators: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    base: {
      type: String,
      default: ''
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-27081c44","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/H-Doc.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"h-doc"},[_c('h-doc-header',{attrs:{"config":_vm.config.header}}),_vm._v(" "),_c('h-doc-nav',{attrs:{"nav-config":_vm.config.nav,"base":_vm.base}}),_vm._v(" "),_c('h-doc-container',{attrs:{"has-simulator":!!(_vm.simulator || _vm.simulators.length)}},[_c('h-doc-content',[_vm._t("default"),_vm._v(" "),_c('h-doc-footer-nav',{attrs:{"nav-config":_vm.config.nav,"base":_vm.base}})],2)],1),_vm._v(" "),_c('h-doc-simulator',{attrs:{"src":_vm.simulator}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_H_Doc = (esExports);
// CONCATENATED MODULE: ./src/H-Doc.vue
function injectStyle (ssrContext) {
  __webpack_require__(6)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  H_Doc,
  selectortype_template_index_0_src_H_Doc,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_H_Doc = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Block.vue
//
//
//
//
//
//

/* harmony default export */ var Block = ({
  name: 'h-doc-block'
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-33e8f69c","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Block.vue
var Block_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"h-doc-block"},[_vm._t("default")],2)}
var Block_staticRenderFns = []
var Block_esExports = { render: Block_render, staticRenderFns: Block_staticRenderFns }
/* harmony default export */ var component_Block = (Block_esExports);
// CONCATENATED MODULE: ./src/component/Block.vue
function Block_injectStyle (ssrContext) {
  __webpack_require__(9)
}
var Block_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var Block___vue_template_functional__ = false
/* styles */
var Block___vue_styles__ = Block_injectStyle
/* scopeId */
var Block___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Block___vue_module_identifier__ = null
var Block_Component = Block_normalizeComponent(
  Block,
  component_Block,
  Block___vue_template_functional__,
  Block___vue_styles__,
  Block___vue_scopeId__,
  Block___vue_module_identifier__
)

/* harmony default export */ var src_component_Block = (Block_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Content.vue
//
//
//
//
//
//

/* harmony default export */ var Content = ({
  name: 'h-doc-content',
  computed: {
    currentPage: function currentPage() {
      var path = this.$route.path;

      if (path) {
        return path.split('/').slice(-1)[0];
      }
      return this.$route.name;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-31b82601","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Content.vue
var Content_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['h-doc-content', ("h-doc-content--" + _vm.currentPage)]},[_vm._t("default")],2)}
var Content_staticRenderFns = []
var Content_esExports = { render: Content_render, staticRenderFns: Content_staticRenderFns }
/* harmony default export */ var component_Content = (Content_esExports);
// CONCATENATED MODULE: ./src/component/Content.vue
function Content_injectStyle (ssrContext) {
  __webpack_require__(11)
}
var Content_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var Content___vue_template_functional__ = false
/* styles */
var Content___vue_styles__ = Content_injectStyle
/* scopeId */
var Content___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Content___vue_module_identifier__ = null
var Content_Component = Content_normalizeComponent(
  Content,
  component_Content,
  Content___vue_template_functional__,
  Content___vue_styles__,
  Content___vue_scopeId__,
  Content___vue_module_identifier__
)

/* harmony default export */ var src_component_Content = (Content_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Container.vue
//
//
//
//
//
//

/* harmony default export */ var Container = ({
  name: 'h-doc-container',
  props: {
    hasSimulator: Boolean
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-149bf456","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Container.vue
var Container_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"h-doc-container",class:{ 'h-doc-container--with-simulator': _vm.hasSimulator }},[_vm._t("default")],2)}
var Container_staticRenderFns = []
var Container_esExports = { render: Container_render, staticRenderFns: Container_staticRenderFns }
/* harmony default export */ var component_Container = (Container_esExports);
// CONCATENATED MODULE: ./src/component/Container.vue
function Container_injectStyle (ssrContext) {
  __webpack_require__(13)
}
var Container_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var Container___vue_template_functional__ = false
/* styles */
var Container___vue_styles__ = Container_injectStyle
/* scopeId */
var Container___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Container___vue_module_identifier__ = null
var Container_Component = Container_normalizeComponent(
  Container,
  component_Container,
  Container___vue_template_functional__,
  Container___vue_styles__,
  Container___vue_scopeId__,
  Container___vue_module_identifier__
)

/* harmony default export */ var src_component_Container = (Container_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/DemoBlock.vue
//
//
//
//
//
//
//

/* harmony default export */ var DemoBlock = ({
  name: 'demo-block',
  props: {
    title: String
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2b9b16a9","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/DemoBlock.vue
var DemoBlock_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"demo-block"},[_c('h2',{staticClass:"demo-block__title"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_vm._t("default")],2)}
var DemoBlock_staticRenderFns = []
var DemoBlock_esExports = { render: DemoBlock_render, staticRenderFns: DemoBlock_staticRenderFns }
/* harmony default export */ var component_DemoBlock = (DemoBlock_esExports);
// CONCATENATED MODULE: ./src/component/DemoBlock.vue
function DemoBlock_injectStyle (ssrContext) {
  __webpack_require__(15)
}
var DemoBlock_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var DemoBlock___vue_template_functional__ = false
/* styles */
var DemoBlock___vue_styles__ = DemoBlock_injectStyle
/* scopeId */
var DemoBlock___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var DemoBlock___vue_module_identifier__ = null
var DemoBlock_Component = DemoBlock_normalizeComponent(
  DemoBlock,
  component_DemoBlock,
  DemoBlock___vue_template_functional__,
  DemoBlock___vue_styles__,
  DemoBlock___vue_scopeId__,
  DemoBlock___vue_module_identifier__
)

/* harmony default export */ var src_component_DemoBlock = (DemoBlock_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/DemoSection.vue
//
//
//
//
//
//

/* harmony default export */ var DemoSection = ({
  name: 'demo-section',
  props: {
    title: String,
    name: String,
    background: String
  },
  computed: {
    demoName: function demoName() {
      return this.name || this.getParentName();
    },
    style: function style() {
      return {
        background: this.background
      };
    }
  },
  methods: {
    getParentName: function getParentName() {
      var $parent = this.$parent;

      if ($parent && $parent.$options.name) {
        return $parent.$options.name.replace('demo-', '');
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5967548f","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/DemoSection.vue
var DemoSection_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"h-doc-demo-section",class:("demo-" + _vm.demoName),style:(_vm.style)},[_vm._t("default")],2)}
var DemoSection_staticRenderFns = []
var DemoSection_esExports = { render: DemoSection_render, staticRenderFns: DemoSection_staticRenderFns }
/* harmony default export */ var component_DemoSection = (DemoSection_esExports);
// CONCATENATED MODULE: ./src/component/DemoSection.vue
function DemoSection_injectStyle (ssrContext) {
  __webpack_require__(17)
}
var DemoSection_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var DemoSection___vue_template_functional__ = false
/* styles */
var DemoSection___vue_styles__ = DemoSection_injectStyle
/* scopeId */
var DemoSection___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var DemoSection___vue_module_identifier__ = null
var DemoSection_Component = DemoSection_normalizeComponent(
  DemoSection,
  component_DemoSection,
  DemoSection___vue_template_functional__,
  DemoSection___vue_styles__,
  DemoSection___vue_scopeId__,
  DemoSection___vue_module_identifier__
)

/* harmony default export */ var src_component_DemoSection = (DemoSection_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/NavLink.vue
//
//
//
//
//
//

/* harmony default export */ var NavLink = ({
  name: 'h-doc-nav-link',
  props: {
    base: String,
    item: Object
  },
  computed: {
    itemName: function itemName() {
      var name = (this.item.title || this.item.name).split(' ');
      return name[0] + ' <span>' + name.slice(1).join(' ') + '</span>';
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-acaa7596","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/NavLink.vue
var NavLink_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.item.path)?_c('router-link',{attrs:{"active-class":"active","to":_vm.base + _vm.item.path},domProps:{"innerHTML":_vm._s(_vm.itemName)}}):(_vm.item.link)?_c('a',{attrs:{"href":_vm.item.link},domProps:{"innerHTML":_vm._s(_vm.itemName)}}):_c('a',{domProps:{"innerHTML":_vm._s(_vm.itemName )}})}
var NavLink_staticRenderFns = []
var NavLink_esExports = { render: NavLink_render, staticRenderFns: NavLink_staticRenderFns }
/* harmony default export */ var component_NavLink = (NavLink_esExports);
// CONCATENATED MODULE: ./src/component/NavLink.vue
var NavLink_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var NavLink___vue_template_functional__ = false
/* styles */
var NavLink___vue_styles__ = null
/* scopeId */
var NavLink___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var NavLink___vue_module_identifier__ = null
var NavLink_Component = NavLink_normalizeComponent(
  NavLink,
  component_NavLink,
  NavLink___vue_template_functional__,
  NavLink___vue_styles__,
  NavLink___vue_scopeId__,
  NavLink___vue_module_identifier__
)

/* harmony default export */ var src_component_NavLink = (NavLink_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Nav.vue
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Nav = ({
  name: 'h-doc-nav',
  components: _defineProperty({}, src_component_NavLink.name, src_component_NavLink),
  props: {
    navConfig: Array,
    base: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      top: 60,
      bottom: 0
    };
  },

  computed: {
    style: function style() {
      return {
        top: this.top + 'px',
        bottom: this.bottom + 'px'
      };
    }
  },
  created: function created() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  },

  methods: {
    onScroll: function onScroll() {
      var _window = window,
          offset = _window.pageYOffset;

      this.top = Math.max(0, 60 - offset);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-764bf97b","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Nav.vue
var Nav_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"h-doc-nav",style:(_vm.style)},_vm._l((_vm.navConfig),function(item,index){return _c('div',{key:index,staticClass:"h-doc-nav__item"},[_c('h-doc-nav-link',{attrs:{"item":item,"base":_vm.base}}),_vm._v(" "),(item.children)?_c('div',_vm._l((item.children),function(navItem,index){return _c('div',{key:index,staticClass:"nav-item"},[_c('h-doc-nav-link',{attrs:{"item":navItem,"base":_vm.base}})],1)})):_vm._e(),_vm._v(" "),_vm._l((item.groups),function(group,index){return (item.groups)?_c('div',{key:index},[_c('div',{staticClass:"h-doc-nav__group-title"},[_vm._v(_vm._s(group.groupName))]),_vm._v(" "),_c('div',_vm._l((group.list),function(navItem,index){return (!navItem.disabled)?_c('div',{key:index,staticClass:"h-doc-nav__subitem"},[_c('h-doc-nav-link',{attrs:{"item":navItem,"base":_vm.base}})],1):_vm._e()}))]):_vm._e()})],2)}))}
var Nav_staticRenderFns = []
var Nav_esExports = { render: Nav_render, staticRenderFns: Nav_staticRenderFns }
/* harmony default export */ var component_Nav = (Nav_esExports);
// CONCATENATED MODULE: ./src/component/Nav.vue
function Nav_injectStyle (ssrContext) {
  __webpack_require__(19)
}
var Nav_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var Nav___vue_template_functional__ = false
/* styles */
var Nav___vue_styles__ = Nav_injectStyle
/* scopeId */
var Nav___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Nav___vue_module_identifier__ = null
var Nav_Component = Nav_normalizeComponent(
  Nav,
  component_Nav,
  Nav___vue_template_functional__,
  Nav___vue_styles__,
  Nav___vue_scopeId__,
  Nav___vue_module_identifier__
)

/* harmony default export */ var src_component_Nav = (Nav_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Header.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Header = ({
  name: 'h-doc-header',
  props: {
    config: Object,
    active: String
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-697cbe52","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Header.vue
var Header_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"h-doc-header"},[_c('div',{staticClass:"h-doc-row"},[_c('div',{staticClass:"h-doc-header__top"},[_c('a',{staticClass:"h-doc-header__logo",attrs:{"href":_vm.config.logo.href}},[_c('span',[_vm._v(_vm._s(_vm.config.logo.title))])]),_vm._v(" "),_c('ul',{staticClass:"h-doc-header__top-nav"},_vm._l((_vm.config.nav),function(value,key){return _c('li',{key:key,staticClass:"h-doc-header__top-nav-item",class:{ active: key === _vm.active }},[_c('a',{staticClass:"h-doc-header__top-nav-title",class:{
              active: key === _vm.active,
              link: typeof value === 'string' && key !== 'github'
            },attrs:{"href":typeof value === 'string' ? value : 'javascript:;',"target":key === 'github' ? '_blank' : ''}},[(key === 'github')?_c('svg',{staticClass:"octicon octicon-mark-github",attrs:{"height":"28","width":"28","viewBox":"0 0 16 16","version":"1.1","aria-hidden":"true"}},[_c('path',{attrs:{"fill-rule":"evenodd","d":"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"}})]):_c('span',[_vm._v(_vm._s(key))])])])}))])])])}
var Header_staticRenderFns = []
var Header_esExports = { render: Header_render, staticRenderFns: Header_staticRenderFns }
/* harmony default export */ var component_Header = (Header_esExports);
// CONCATENATED MODULE: ./src/component/Header.vue
function Header_injectStyle (ssrContext) {
  __webpack_require__(21)
}
var Header_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var Header___vue_template_functional__ = false
/* styles */
var Header___vue_styles__ = Header_injectStyle
/* scopeId */
var Header___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Header___vue_module_identifier__ = null
var Header_Component = Header_normalizeComponent(
  Header,
  component_Header,
  Header___vue_template_functional__,
  Header___vue_styles__,
  Header___vue_scopeId__,
  Header___vue_module_identifier__
)

/* harmony default export */ var src_component_Header = (Header_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Footer.vue
//
//
//
//
//
//

/* harmony default export */ var Footer = ({
  name: 'h-doc-footer',
  computed: {
    style: function style() {
      return {
        'bottom': -window.innerHeight + 'px'
      };
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-482b79d8","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Footer.vue
var Footer_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"h-doc-footer",style:(_vm.style)},[_vm._m(0)])}
var Footer_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"h-doc-footer-bottom"},[_vm._v("Made with "),_c('span',{staticClass:"h-doc-footer-heart"},[_vm._v("❤")]),_vm._v(" by Billow")])}]
var Footer_esExports = { render: Footer_render, staticRenderFns: Footer_staticRenderFns }
/* harmony default export */ var component_Footer = (Footer_esExports);
// CONCATENATED MODULE: ./src/component/Footer.vue
function Footer_injectStyle (ssrContext) {
  __webpack_require__(23)
}
var Footer_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var Footer___vue_template_functional__ = false
/* styles */
var Footer___vue_styles__ = Footer_injectStyle
/* scopeId */
var Footer___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Footer___vue_module_identifier__ = null
var Footer_Component = Footer_normalizeComponent(
  Footer,
  component_Footer,
  Footer___vue_template_functional__,
  Footer___vue_styles__,
  Footer___vue_scopeId__,
  Footer___vue_module_identifier__
)

/* harmony default export */ var src_component_Footer = (Footer_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/FooterNav.vue
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FooterNav = ({
  name: 'h-doc-footer-nav',
  props: {
    base: String,
    navConfig: Array
  },
  data: function data() {
    return {
      nav: [],
      currentPath: null,
      leftNav: null,
      rightNav: null
    };
  },
  created: function created() {
    this.setNav();
    this.updateNav();
    this.keyBoardHandler();
    console.log(this.nav, this.leftNav, this.rightNav);
  },

  watch: {
    '$route.path': function $routePath() {
      this.setNav();
      this.updateNav();
    }
  },
  methods: {
    setNav: function setNav() {
      var nav = this.navConfig;
      for (var i = 0; i < nav.length; i++) {
        var navItem = nav[i];
        if (!navItem.groups) {
          this.nav.push(nav[i]);
        } else {
          for (var j = 0; j < navItem.groups.length; j++) {
            this.nav = this.nav.concat(navItem.groups[j].list);
          }
        }
      }
    },
    updateNav: function updateNav() {
      var currentIndex = void 0;
      this.currentPath = '/' + this.$route.path.split('/').pop();
      var len = this.nav.length;
      for (var i = 0; i < len; i++) {
        if (this.nav[i].path === this.currentPath) {
          currentIndex = i;
          break;
        }
      }
      this.leftNav = this.nav[currentIndex - 1];
      this.rightNav = this.nav[currentIndex + 1];
    },
    handleNavClick: function handleNavClick(direction) {
      var nav = direction === 'prev' ? this.leftNav : this.rightNav;
      if (nav.path) {
        this.$router.push(this.base + nav.path);
      } else if (nav.link) {
        window.location.href = nav.link;
      }
    },
    keyBoardHandler: function keyBoardHandler() {
      var _this = this;

      window.addEventListener('keyup', function (event) {
        switch (event.code) {
          case 37:
            _this.handleNavClick('prev');
            break;
          case 38:
            _this.handleNavClick('next');
            break;
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-378f792e","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/FooterNav.vue
var FooterNav_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"h-doc-footer-nav"},[(_vm.leftNav)?_c('div',{staticClass:"h-doc-footer-nav__link h-doc-footer-nav__left ",on:{"click":function($event){_vm.handleNavClick('prev')}}},[_c('div',{staticClass:"h-doc-footer-nav__arrow-left"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.leftNav.title))])]):_vm._e(),_vm._v(" "),(_vm.rightNav)?_c('div',{staticClass:"h-doc-footer-nav__link h-doc-footer-nav__right",on:{"click":function($event){_vm.handleNavClick('next')}}},[_c('span',[_vm._v(_vm._s(_vm.rightNav.title))]),_vm._v(" "),_c('div',{staticClass:"h-doc-footer-nav__arrow-right"})]):_vm._e()])}
var FooterNav_staticRenderFns = []
var FooterNav_esExports = { render: FooterNav_render, staticRenderFns: FooterNav_staticRenderFns }
/* harmony default export */ var component_FooterNav = (FooterNav_esExports);
// CONCATENATED MODULE: ./src/component/FooterNav.vue
function FooterNav_injectStyle (ssrContext) {
  __webpack_require__(25)
}
var FooterNav_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var FooterNav___vue_template_functional__ = false
/* styles */
var FooterNav___vue_styles__ = FooterNav_injectStyle
/* scopeId */
var FooterNav___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var FooterNav___vue_module_identifier__ = null
var FooterNav_Component = FooterNav_normalizeComponent(
  FooterNav,
  component_FooterNav,
  FooterNav___vue_template_functional__,
  FooterNav___vue_styles__,
  FooterNav___vue_scopeId__,
  FooterNav___vue_module_identifier__
)

/* harmony default export */ var src_component_FooterNav = (FooterNav_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Simulator.vue
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Simulator = ({
  name: 'h-doc-simulator',
  props: {
    src: String
  },
  data: function data() {
    return {
      scrollTop: window.scrollY,
      iframeHostName: '',
      windowHeight: window.innerHeight
    };
  },

  computed: {
    srcWithTimestamp: function srcWithTimestamp() {
      var now = 'rand=' + Date.now();
      return this.src + (this.src.indexOf('?') === -1 ? '?' : '&') + now;
    },
    isFixed: function isFixed() {
      return this.scrollTop > 60;
    },
    simulatorStyle: function simulatorStyle() {
      var height = Math.min(580, this.windowHeight - 150);
      return {
        height: height + 'px'
      };
    }
  },
  mounted: function mounted() {
    var _this = this;

    window.addEventListener('scroll', function () {
      _this.scrollTop = window.scrollY;
    });
    window.addEventListener('resize', function () {
      _this.windowHeight = window.innerHeight;
    });
    var iframe = this.$refs.iframe;

    if (iframe) {
      if (iframe.contentDocument.readyState === 'complete') {
        setTimeout(this.onSrcChanged, 0);
      } else {
        iframe.onload = function () {
          _this.onSrcChanged();
        };
      }
    }
  },

  watch: {
    src: function src() {
      this.onSrcChanged();
    }
  },
  methods: {
    reloadIframe: function reloadIframe() {
      var iframe = this.$refs.iframe;

      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.location.reload();
      }
    },
    onSrcChanged: function onSrcChanged() {
      var iframe = this.$refs.iframe;

      if (iframe && iframe.contentWindow) {
        if (this.src.indexOf('://') !== -1) {
          this.iframeHostName = this.src.split('://')[1].split('/')[0];
        } else {
          this.iframeHostName = iframe.contentWindow.location.host || location.host;
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6d139cbb","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Simulator.vue
var Simulator_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['h-doc-simulator', { 'h-doc-simulator-fixed': _vm.isFixed }]},[_c('div',{staticClass:"h-doc-simulator__nav"},[_c('div',{staticClass:"h-doc-simulator__url"},[_vm._v(_vm._s(_vm.iframeHostName))]),_vm._v(" "),_c('div',{staticClass:"h-doc-simulator__reload",on:{"click":_vm.reloadIframe}})]),_vm._v(" "),_c('iframe',{ref:"iframe",style:(_vm.simulatorStyle),attrs:{"src":_vm.srcWithTimestamp,"frameborder":"0"}})])}
var Simulator_staticRenderFns = []
var Simulator_esExports = { render: Simulator_render, staticRenderFns: Simulator_staticRenderFns }
/* harmony default export */ var component_Simulator = (Simulator_esExports);
// CONCATENATED MODULE: ./src/component/Simulator.vue
function Simulator_injectStyle (ssrContext) {
  __webpack_require__(27)
}
var Simulator_normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var Simulator___vue_template_functional__ = false
/* styles */
var Simulator___vue_styles__ = Simulator_injectStyle
/* scopeId */
var Simulator___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Simulator___vue_module_identifier__ = null
var Simulator_Component = Simulator_normalizeComponent(
  Simulator,
  component_Simulator,
  Simulator___vue_template_functional__,
  Simulator___vue_styles__,
  Simulator___vue_scopeId__,
  Simulator___vue_module_identifier__
)

/* harmony default export */ var src_component_Simulator = (Simulator_Component.exports);

// EXTERNAL MODULE: ./node_modules/nprogress/nprogress.js
var nprogress = __webpack_require__(29);
var nprogress_default = /*#__PURE__*/__webpack_require__.n(nprogress);

// EXTERNAL MODULE: ./src/style/index.less
var style = __webpack_require__(30);
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./src/index.js
/* harmony export (immutable) */ __webpack_exports__["default"] = install;
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Nav", function() { return src_component_Nav; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Header", function() { return src_component_Header; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Footer", function() { return src_component_Footer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "FooterNav", function() { return src_component_FooterNav; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "HDoc", function() { return src_H_Doc; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Content", function() { return src_component_Content; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Block", function() { return src_component_Block; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DemoBlock", function() { return src_component_DemoBlock; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DemoSection", function() { return src_component_DemoSection; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Container", function() { return src_component_Container; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Simulator", function() { return src_component_Simulator; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "progress", function() { return nprogress_default.a; });
















var components = [src_component_Nav, src_component_Header, src_component_Footer, src_component_FooterNav, src_H_Doc, src_component_Content, src_component_Block, src_component_DemoBlock, src_component_DemoSection, src_component_Container, src_component_Simulator];

function install() {
  components.forEach(function (component) {
    external__vue__default.a.component(component.name, component);
  });
}



/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("43cc4117", content, true, {});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("55cdf2bb", content, true, {});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".h-doc-block{display:-webkit-box;display:-ms-flexbox;display:flex;margin-bottom:20px}.h-doc-block .highlight{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box}.h-doc-block .highlight pre{word-break:break-all}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("38e0c71f", content, true, {});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".h-doc-content{position:relative;padding:0 0 75px}.h-doc-content section{padding:10px 40px;overflow:hidden}.h-doc-content section>h1,.h-doc-content section>h2,.h-doc-content section>h3,.h-doc-content section>h4,.h-doc-content section>h5,.h-doc-content section>h6{line-height:1.5;font-weight:400;margin:20px 0 10px;color:#333}.h-doc-content section>h1{font-size:36px}.h-doc-content section>h2{font-size:30px;margin-bottom:25px}.h-doc-content section>h3{font-size:22px;margin-top:45px}.h-doc-content section>h2+h3{margin-top:25px}.h-doc-content section>h4{font-size:16px;margin-bottom:15px}.h-doc-content section>h5{font-size:14px}.h-doc-content section>h6{font-size:14px;color:#666}.h-doc-content section>p{margin:15px 0;font-size:14px;line-height:26px;color:#34495e}.h-doc-content section>ol,.h-doc-content section>ul{padding:15px 0;background-color:#f1f4f8}.h-doc-content section>ol li,.h-doc-content section>ul li{color:#34495e;font-size:14px;line-height:22px;margin:5px 0 5px 20px;padding-left:15px;position:relative}.h-doc-content section>ol li:before,.h-doc-content section>ul li:before{content:\"\";position:absolute;top:0;left:0;width:6px;height:6px;margin-top:8px;border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #666}.h-doc-content section>ol li li,.h-doc-content section>ul li li{margin-left:0}.h-doc-content section>hr{border:0 none;border-top:1px solid #eee}.h-doc-content section li>code,.h-doc-content section p>code,.h-doc-content section table code{margin:2px;padding:2px 7px;display:inline}.h-doc-content blockquote{padding:16px;margin:20px 0;font-size:14px;border-radius:4px;background-color:#ecf9ff;color:rgba(52,73,94,.8);border-left:5px solid #50bfff}.h-doc-content table{width:100%;font-size:13px;line-height:1.5;margin-bottom:45px;background-color:#fff;border-collapse:collapse;color:#34495e}.h-doc-content table th{padding:8px 10px;text-align:left;font-weight:400;background-color:#f1f4f8}.h-doc-content table th:first-child{padding-left:10px}.h-doc-content table td{padding:8px;border-bottom:1px solid #f1f4f8}.h-doc-content table code{font-size:13px;padding:0 8px;font-family:inherit;word-break:keep-all}", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("64c8535e", content, true, {});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".h-doc-container{overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:240px}.h-doc-container--with-simulator{padding-right:400px}@media (max-width:1300px){.h-doc-container--with-simulator{padding-right:360px}}", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("608094de", content, true, {});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".demo-block{padding:0 15px}.demo-block__title{margin:0;font-weight:400;font-size:14px;color:rgba(69,90,100,.6);padding:40px 15px 15px}", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("653782ac", content, true, {});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".h-doc-demo-section{min-height:100vh;padding-bottom:20px;-webkit-box-sizing:border-box;box-sizing:border-box}.h-doc-demo-section__title{margin:0;padding:15px;font-size:16px;line-height:1.5;font-weight:400;text-transform:capitalize}.h-doc-demo-section__title+.h-doc-demo-block .h-doc-demo-block__title{padding-top:0}", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("417ab236", content, true, {});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".h-doc-nav{left:0;top:60px;bottom:0;z-index:1;position:fixed;overflow-y:scroll;padding:25px 0 75px;min-width:240px;max-width:240px;border-right:1px solid #f1f4f8}@media (max-width:1300px){.h-doc-nav{min-width:220px;max-width:220px}}@media (min-width:1440px){.h-doc-nav{left:50%;margin-left:-720px}}.h-doc-nav::-webkit-scrollbar{height:6px;width:6px;background-color:transparent}.h-doc-nav::-webkit-scrollbar-thumb{border-radius:6px;background-color:transparent}.h-doc-nav:hover::-webkit-scrollbar-thumb{background-color:rgba(69,90,100,.2)}.h-doc-nav__item a,.h-doc-nav__subitem a{margin:0;display:block;color:#455a64;font-size:16px;padding:10px 20px 10px 40px;line-height:24px;-webkit-transition:all .3s;transition:all .3s}.h-doc-nav__item a.active,.h-doc-nav__subitem a.active{color:#0079f3}.h-doc-nav__item>a{font-weight:700}.h-doc-nav__subitem a{font-size:14px}.h-doc-nav__subitem a:hover{color:#0079f3}.h-doc-nav__subitem span{opacity:.6;font-size:13px}.h-doc-nav__group-title{font-size:12px;line-height:40px;padding-left:40px;color:rgba(69,90,100,.6)}@media (max-width:1300px){.h-doc-nav{min-width:220px;max-width:220px}.h-doc-nav__item a,.h-doc-nav__subitem a{line-height:22px}.h-doc-nav__subitem a{font-size:13px}}", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(22);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("026e961e", content, true, {});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".h-doc-header{width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-bottom:1px solid #f1f4f8}.h-doc-header__top{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;padding:0 40px;height:60px;line-height:60px}.h-doc-header__top-nav{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:right}.h-doc-header__top-nav>li{display:inline-block;position:relative;vertical-align:middle}.h-doc-header__top-nav-item{margin:0 15px}.h-doc-header__top-nav-title{display:block;font-size:15px}.h-doc-header__top-nav-title svg{fill:#455a64;display:block;-webkit-transition:.3s ease-in-out;transition:.3s ease-in-out}.h-doc-header__top-nav-title svg:hover{fill:#0079f3}.h-doc-header__top-nav-title.link{color:#34495e;border-bottom:1px solid transparent;-webkit-transition:.3s ease-in-out;transition:.3s ease-in-out}.h-doc-header__top-nav-title.link.active,.h-doc-header__top-nav-title.link:hover{color:#0079f3;border-bottom-color:#19b5fe}.h-doc-header__top-nav .h-doc-header__arrow:hover{color:#34495e}.h-doc-header__top-nav .h-doc-header__arrow:after{content:\"\";display:inline-block;vertical-align:middle;margin-top:-1px;margin-left:1px;margin-right:-4px;width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid #ccc;pointer-events:none}.h-doc-header__logo{display:block}.h-doc-header__logo span{display:inline-block;vertical-align:middle;font-size:22px;color:#333;font-family:Dosis,Source Sans Pro,Helvetica Neue,Arial,sans-serif}.h-doc-header__bottom{height:50px;line-height:50px}.h-doc-header__bottom-nav{text-align:center}.h-doc-header__bottom-nav li{display:inline-block}.h-doc-header__bottom-nav a{color:#fff;opacity:.8;display:block;padding:0 20px;font-size:14px}.h-doc-header__bottom-nav a.active{background-color:hsla(0,0%,100%,.1)}.h-doc-header__bottom-nav a.active,.h-doc-header__bottom-nav a:hover{opacity:1}", ""]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("eb16baa8", content, true, {});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".h-doc-footer{position:absolute;width:100%;text-align:center}.h-doc-footer-bottom{width:100%}.h-doc-footer-heart{font-size:20px;color:rgba(161,28,28,.678)}", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("334f0eab", content, true, {});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".h-doc-footer-nav{left:0;right:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding:24px 45px;position:absolute}.h-doc-footer-nav__link{-webkit-box-flex:1;-ms-flex:1;flex:1;font-size:14px;line-height:1.5;cursor:pointer;opacity:.7;color:#455a64;-webkit-transition:.3s;transition:.3s}.h-doc-footer-nav__link:hover{opacity:1;color:#0079f3}.h-doc-footer-nav__link .h-icon{font-size:12px;line-height:16px}.h-doc-footer-nav__link span{vertical-align:middle}.h-doc-footer-nav__left,.h-doc-footer-nav__right{padding:0 15px;position:relative}.h-doc-footer-nav__right{text-align:right}.h-doc-footer-nav__arrow-left,.h-doc-footer-nav__arrow-right{top:50%;width:8px;height:8px;margin-top:-4px;position:absolute;border:solid currentColor;border-width:0 1px 1px 0}.h-doc-footer-nav__arrow-left{left:0;-webkit-transform:rotate(135deg);transform:rotate(135deg)}.h-doc-footer-nav__arrow-right{right:0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("32cb4f16", content, true, {});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".h-doc-simulator{z-index:1;overflow:hidden;position:absolute;border-radius:6px;background:#fafafa;-webkit-box-sizing:border-box;box-sizing:border-box;right:40px;width:360px;min-width:360px;top:100px;-webkit-box-shadow:rgba(0,0,0,.2) 0 1px 4px,rgba(0,0,0,.2) 0 1px 2px;box-shadow:0 1px 4px rgba(0,0,0,.2),0 1px 2px rgba(0,0,0,.2)}@media (max-width:1300px){.h-doc-simulator{width:320px;min-width:320px}}@media (max-width:1100px){.h-doc-simulator{left:750px;right:auto}}@media (min-width:1440px){.h-doc-simulator{right:50%;margin-right:-680px}}.h-doc-simulator-fixed{position:fixed;top:40px}.h-doc-simulator iframe{width:100%;display:block}.h-doc-simulator__nav{height:60px;background:url(\"data:image/png;base64,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\") no-repeat;background-size:100%}.h-doc-simulator__url{left:40px;top:23px;right:40px;font-size:14px;position:absolute;text-align:center;font-weight:700;line-height:28px;font-family:PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif}@media (max-width:1300px){.h-doc-simulator__url{top:21px;line-height:24px}}.h-doc-simulator__reload{top:25px;right:10px;width:28px;height:28px;cursor:pointer;position:absolute}", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function (root, factory) {

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }
})(this, function () {
  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function (options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function (n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = n === 1 ? null : n;

    var progress = NProgress.render(!started),
        bar = progress.querySelector(Settings.barSelector),
        speed = Settings.speed,
        ease = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function (next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, {
          transition: 'none',
          opacity: 1
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function () {
          css(progress, {
            transition: 'all ' + speed + 'ms linear',
            opacity: 0
          });
          setTimeout(function () {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function () {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function () {
    if (!NProgress.status) NProgress.set(0);

    var work = function work() {
      setTimeout(function () {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function (force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function (amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function () {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function () {
    var initial = 0,
        current = 0;

    NProgress.promise = function ($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function () {
        current--;
        if (current === 0) {
          initial = 0;
          NProgress.done();
        } else {
          NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };
  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function (fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');

    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar = progress.querySelector(Settings.barSelector),
        perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent = document.querySelector(Settings.parent),
        spinner;

    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function () {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function () {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function () {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = 'WebkitTransform' in bodyStyle ? 'Webkit' : 'MozTransform' in bodyStyle ? 'Moz' : 'msTransform' in bodyStyle ? 'ms' : 'OTransform' in bodyStyle ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }

  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d(' + toBarPerc(n) + '%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate(' + toBarPerc(n) + '%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n) + '%' };
    }

    barCSS.transition = 'all ' + speed + 'ms ' + ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = function () {
    var pending = [];

    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function (fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  }();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = function () {
    var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'],
        cssProps = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function (element, properties) {
      var args = arguments,
          prop,
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    };
  }();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return;

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(31);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(32)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./index.less", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./index.less");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/* header */\n/* simulator */\ncode {\n  display: block;\n  font-size: 13px;\n  overflow-x: auto;\n  font-weight: 400;\n  line-height: 22px;\n  border-radius: 3px;\n  margin-bottom: 25px;\n  position: relative;\n  word-break: break-all;\n  white-space: pre-wrap;\n  color: #455a64;\n  padding: 18px 10px 18px 20px;\n  background-color: #f1f4f8;\n  font-family: \"Source Code Pro\", \"Monaco\", \"Inconsolata\", monospace;\n}\ncode::after {\n  top: 5px;\n  right: 10px;\n  position: absolute;\n  color: #ccc;\n  font-size: 12px;\n}\npre {\n  margin: 0;\n}\npre + pre {\n  margin-top: -10px;\n}\ncode.language-html::after {\n  content: 'HTML';\n}\ncode.language-javascript::after {\n  content: 'JS';\n}\ncode.language-css::after {\n  content: 'CSS';\n}\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: #fff;\n}\n.hljs-subst {\n  color: #455a64;\n}\n.hljs-string,\n.hljs-meta,\n.hljs-symbol,\n.hljs-template-tag,\n.hljs-template-variable,\n.hljs-addition {\n  color: #5758bb;\n}\n.hljs-comment,\n.hljs-quote {\n  color: #999;\n}\n.hljs-number,\n.hljs-regexp,\n.hljs-literal,\n.hljs-bullet,\n.hljs-link {\n  color: #32a973;\n}\n.hljs-deletion,\n.hljs-variable {\n  color: #88f;\n}\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-title,\n.hljs-section,\n.hljs-built_in,\n.hljs-doctag,\n.hljs-type,\n.hljs-tag,\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class,\n.hljs-strong {\n  color: #0079f3;\n}\n.hljs-emphasis {\n  font-style: italic;\n}\n.hljs-attribute {\n  color: #e6550d;\n}\n/* Make clicks pass-through */\n#nprogress {\n  pointer-events: none;\n}\n#nprogress .bar {\n  background: rgba(52, 152, 219, 0.7);\n  position: fixed;\n  z-index: 1031;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 2px;\n}\n/* Fancy blur effect */\n#nprogress .peg {\n  display: block;\n  position: absolute;\n  right: 0px;\n  width: 100px;\n  height: 100%;\n  box-shadow: 0 0 5px rgba(52, 152, 219, 0.7), 0 0 2px rgba(52, 152, 219, 0.7);\n  opacity: 1.0;\n  -webkit-transform: rotate(3deg) translate(0px, -4px);\n  -ms-transform: rotate(3deg) translate(0px, -4px);\n  transform: rotate(3deg) translate(0px, -4px);\n}\n/* Remove these to get rid of the spinner */\n#nprogress .spinner {\n  display: block;\n  position: fixed;\n  z-index: 1031;\n  top: 15px;\n  right: 15px;\n}\n#nprogress .spinner-icon {\n  display: none;\n  width: 12px;\n  height: 12px;\n  box-sizing: border-box;\n  border: solid 2px transparent;\n  border-top-color: rgba(52, 152, 219, 0.7);\n  border-left-color: rgba(52, 152, 219, 0.7);\n  border-radius: 50%;\n  -webkit-animation: nprogress-spinner 400ms linear infinite;\n  animation: nprogress-spinner 400ms linear infinite;\n}\n.nprogress-custom-parent {\n  overflow: hidden;\n  position: relative;\n}\n.nprogress-custom-parent #nprogress .spinner,\n.nprogress-custom-parent #nprogress .bar {\n  position: absolute;\n}\n@-webkit-keyframes nprogress-spinner {\n  0% {\n    -webkit-transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n  }\n}\n@keyframes nprogress-spinner {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\nbody {\n  margin: 0;\n  color: #333;\n  font-size: 16px;\n  min-width: 1100px;\n  overflow-x: auto;\n  background-color: #fff;\n  -webkit-font-smoothing: antialiased;\n  font-family: PingFang SC, \"Helvetica Neue\", Arial, sans-serif;\n}\np {\n  margin: 0;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  font-size: inherit;\n}\nul,\nol {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\na {\n  text-decoration: none;\n}\n.h-doc-row {\n  width: 100%;\n}\n@media (min-width: 1440px) {\n  .h-doc-row {\n    width: 1440px;\n    margin: 0 auto;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(33);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {
		return null;
	}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 33 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ })
/******/ ]);