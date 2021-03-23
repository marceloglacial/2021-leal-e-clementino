(()=>{var __webpack_modules__={172:function(module,exports){eval('var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Zenscroll 4.0.2\n * https://github.com/zengabor/zenscroll/\n *\n * Copyright 2015–2018 Gabor Lenard\n *\n * This is free and unencumbered software released into the public domain.\n * \n * Anyone is free to copy, modify, publish, use, compile, sell, or\n * distribute this software, either in source code form or as a compiled\n * binary, for any purpose, commercial or non-commercial, and by any\n * means.\n * \n * In jurisdictions that recognize copyright laws, the author or authors\n * of this software dedicate any and all copyright interest in the\n * software to the public domain. We make this dedication for the benefit\n * of the public at large and to the detriment of our heirs and\n * successors. We intend this dedication to be an overt act of\n * relinquishment in perpetuity of all present and future rights to this\n * software under copyright law.\n * \n * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,\n * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\n * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR\n * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,\n * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\n * OTHER DEALINGS IN THE SOFTWARE.\n * \n * For more information, please refer to <http://unlicense.org>\n * \n */\n\n/*jshint devel:true, asi:true */\n\n/*global define, module */\n\n\n(function (root, factory) {\n\tif (true) {\n\t\t!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory()),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === \'function\' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n\t} else {}\n}(this, function () {\n\t"use strict"\n\n\n\t// Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:\n\tvar isNativeSmoothScrollEnabledOn = function (elem) {\n\t\treturn elem && "getComputedStyle" in window &&\n\t\t\twindow.getComputedStyle(elem)["scroll-behavior"] === "smooth"\n\t}\n\n\n\t// Exit if it’s not a browser environment:\n\tif (typeof window === "undefined" || !("document" in window)) {\n\t\treturn {}\n\t}\n\n\n\tvar makeScroller = function (container, defaultDuration, edgeOffset) {\n\n\t\t// Use defaults if not provided\n\t\tdefaultDuration = defaultDuration || 999 //ms\n\t\tif (!edgeOffset && edgeOffset !== 0) {\n\t\t\t// When scrolling, this amount of distance is kept from the edges of the container:\n\t\t\tedgeOffset = 9 //px\n\t\t}\n\n\t\t// Handling the life-cycle of the scroller\n\t\tvar scrollTimeoutId\n\t\tvar setScrollTimeoutId = function (newValue) {\n\t\t\tscrollTimeoutId = newValue\n\t\t}\n\n\t\t/**\n\t\t * Stop the current smooth scroll operation immediately\n\t\t */\n\t\tvar stopScroll = function () {\n\t\t\tclearTimeout(scrollTimeoutId)\n\t\t\tsetScrollTimeoutId(0)\n\t\t}\n\n\t\tvar getTopWithEdgeOffset = function (elem) {\n\t\t\treturn Math.max(0, container.getTopOf(elem) - edgeOffset)\n\t\t}\n\n\t\t/**\n\t\t * Scrolls to a specific vertical position in the document.\n\t\t *\n\t\t * @param {targetY} The vertical position within the document.\n\t\t * @param {duration} Optionally the duration of the scroll operation.\n\t\t *        If not provided the default duration is used.\n\t\t * @param {onDone} An optional callback function to be invoked once the scroll finished.\n\t\t */\n\t\tvar scrollToY = function (targetY, duration, onDone) {\n\t\t\tstopScroll()\n\t\t\tif (duration === 0 || (duration && duration < 0) || isNativeSmoothScrollEnabledOn(container.body)) {\n\t\t\t\tcontainer.toY(targetY)\n\t\t\t\tif (onDone) {\n\t\t\t\t\tonDone()\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tvar startY = container.getY()\n\t\t\t\tvar distance = Math.max(0, targetY) - startY\n\t\t\t\tvar startTime = new Date().getTime()\n\t\t\t\tduration = duration || Math.min(Math.abs(distance), defaultDuration);\n\t\t\t\t(function loopScroll() {\n\t\t\t\t\tsetScrollTimeoutId(setTimeout(function () {\n\t\t\t\t\t\t// Calculate percentage:\n\t\t\t\t\t\tvar p = Math.min(1, (new Date().getTime() - startTime) / duration)\n\t\t\t\t\t\t// Calculate the absolute vertical position:\n\t\t\t\t\t\tvar y = Math.max(0, Math.floor(startY + distance*(p < 0.5 ? 2*p*p : p*(4 - p*2)-1)))\n\t\t\t\t\t\tcontainer.toY(y)\n\t\t\t\t\t\tif (p < 1 && (container.getHeight() + y) < container.body.scrollHeight) {\n\t\t\t\t\t\t\tloopScroll()\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tsetTimeout(stopScroll, 99) // with cooldown time\n\t\t\t\t\t\t\tif (onDone) {\n\t\t\t\t\t\t\t\tonDone()\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}, 9))\n\t\t\t\t})()\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Scrolls to the top of a specific element.\n\t\t *\n\t\t * @param {elem} The element to scroll to.\n\t\t * @param {duration} Optionally the duration of the scroll operation.\n\t\t * @param {onDone} An optional callback function to be invoked once the scroll finished.\n\t\t */\n\t\tvar scrollToElem = function (elem, duration, onDone) {\n\t\t\tscrollToY(getTopWithEdgeOffset(elem), duration, onDone)\n\t\t}\n\n\t\t/**\n\t\t * Scrolls an element into view if necessary.\n\t\t *\n\t\t * @param {elem} The element.\n\t\t * @param {duration} Optionally the duration of the scroll operation.\n\t\t * @param {onDone} An optional callback function to be invoked once the scroll finished.\n\t\t */\n\t\tvar scrollIntoView = function (elem, duration, onDone) {\n\t\t\tvar elemHeight = elem.getBoundingClientRect().height\n\t\t\tvar elemBottom = container.getTopOf(elem) + elemHeight\n\t\t\tvar containerHeight = container.getHeight()\n\t\t\tvar y = container.getY()\n\t\t\tvar containerBottom = y + containerHeight\n\t\t\tif (getTopWithEdgeOffset(elem) < y || (elemHeight + edgeOffset) > containerHeight) {\n\t\t\t\t// Element is clipped at top or is higher than screen.\n\t\t\t\tscrollToElem(elem, duration, onDone)\n\t\t\t} else if ((elemBottom + edgeOffset) > containerBottom) {\n\t\t\t\t// Element is clipped at the bottom.\n\t\t\t\tscrollToY(elemBottom - containerHeight + edgeOffset, duration, onDone)\n\t\t\t} else if (onDone) {\n\t\t\t\tonDone()\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Scrolls to the center of an element.\n\t\t *\n\t\t * @param {elem} The element.\n\t\t * @param {duration} Optionally the duration of the scroll operation.\n\t\t * @param {offset} Optionally the offset of the top of the element from the center of the screen.\n\t\t *        A value of 0 is ignored.\n\t\t * @param {onDone} An optional callback function to be invoked once the scroll finished.\n\t\t */\n\t\tvar scrollToCenterOf = function (elem, duration, offset, onDone) {\n\t\t\tscrollToY(Math.max(0, container.getTopOf(elem) - container.getHeight()/2 + (offset || elem.getBoundingClientRect().height/2)), duration, onDone)\n\t\t}\n\n\t\t/**\n\t\t * Changes default settings for this scroller.\n\t\t *\n\t\t * @param {newDefaultDuration} Optionally a new value for default duration, used for each scroll method by default.\n\t\t *        Ignored if null or undefined.\n\t\t * @param {newEdgeOffset} Optionally a new value for the edge offset, used by each scroll method by default. Ignored if null or undefined.\n\t\t * @returns An object with the current values.\n\t\t */\n\t\tvar setup = function (newDefaultDuration, newEdgeOffset) {\n\t\t\tif (newDefaultDuration === 0 || newDefaultDuration) {\n\t\t\t\tdefaultDuration = newDefaultDuration\n\t\t\t}\n\t\t\tif (newEdgeOffset === 0 || newEdgeOffset) {\n\t\t\t\tedgeOffset = newEdgeOffset\n\t\t\t}\n\t\t\treturn {\n\t\t\t\tdefaultDuration: defaultDuration,\n\t\t\t\tedgeOffset: edgeOffset\n\t\t\t}\n\t\t}\n\n\t\treturn {\n\t\t\tsetup: setup,\n\t\t\tto: scrollToElem,\n\t\t\ttoY: scrollToY,\n\t\t\tintoView: scrollIntoView,\n\t\t\tcenter: scrollToCenterOf,\n\t\t\tstop: stopScroll,\n\t\t\tmoving: function () { return !!scrollTimeoutId },\n\t\t\tgetY: container.getY,\n\t\t\tgetTopOf: container.getTopOf\n\t\t}\n\n\t}\n\n\n\tvar docElem = document.documentElement\n\tvar getDocY = function () { return window.scrollY || docElem.scrollTop }\n\n\t// Create a scroller for the document:\n\tvar zenscroll = makeScroller({\n\t\tbody: document.scrollingElement || document.body,\n\t\ttoY: function (y) { window.scrollTo(0, y) },\n\t\tgetY: getDocY,\n\t\tgetHeight: function () { return window.innerHeight || docElem.clientHeight },\n\t\tgetTopOf: function (elem) { return elem.getBoundingClientRect().top + getDocY() - docElem.offsetTop }\n\t})\n\n\n\t/**\n\t * Creates a scroller from the provided container element (e.g., a DIV)\n\t *\n\t * @param {scrollContainer} The vertical position within the document.\n\t * @param {defaultDuration} Optionally a value for default duration, used for each scroll method by default.\n\t *        Ignored if 0 or null or undefined.\n\t * @param {edgeOffset} Optionally a value for the edge offset, used by each scroll method by default. \n\t *        Ignored if null or undefined.\n\t * @returns A scroller object, similar to `zenscroll` but controlling the provided element.\n\t */\n\tzenscroll.createScroller = function (scrollContainer, defaultDuration, edgeOffset) {\n\t\treturn makeScroller({\n\t\t\tbody: scrollContainer,\n\t\t\ttoY: function (y) { scrollContainer.scrollTop = y },\n\t\t\tgetY: function () { return scrollContainer.scrollTop },\n\t\t\tgetHeight: function () { return Math.min(scrollContainer.clientHeight, window.innerHeight || docElem.clientHeight) },\n\t\t\tgetTopOf: function (elem) { return elem.offsetTop }\n\t\t}, defaultDuration, edgeOffset)\n\t}\n\n\n\t// Automatic link-smoothing on achors\n\t// Exclude IE8- or when native is enabled or Zenscroll auto- is disabled\n\tif ("addEventListener" in window && !window.noZensmooth && !isNativeSmoothScrollEnabledOn(document.body)) {\n\n\t\tvar isHistorySupported = "history" in window && "pushState" in history\n\t\tvar isScrollRestorationSupported = isHistorySupported && "scrollRestoration" in history\n\n\t\t// On first load & refresh make sure the browser restores the position first\n\t\tif (isScrollRestorationSupported) {\n\t\t\thistory.scrollRestoration = "auto"\n\t\t}\n\n\t\twindow.addEventListener("load", function () {\n\n\t\t\tif (isScrollRestorationSupported) {\n\t\t\t\t// Set it to manual\n\t\t\t\tsetTimeout(function () { history.scrollRestoration = "manual" }, 9)\n\t\t\t\twindow.addEventListener("popstate", function (event) {\n\t\t\t\t\tif (event.state && "zenscrollY" in event.state) {\n\t\t\t\t\t\tzenscroll.toY(event.state.zenscrollY)\n\t\t\t\t\t}\n\t\t\t\t}, false)\n\t\t\t}\n\n\t\t\t// Add edge offset on first load if necessary\n\t\t\t// This may not work on IE (or older computer?) as it requires more timeout, around 100 ms\n\t\t\tif (window.location.hash) {\n\t\t\t\tsetTimeout(function () {\n\t\t\t\t\t// Adjustment is only needed if there is an edge offset:\n\t\t\t\t\tvar edgeOffset = zenscroll.setup().edgeOffset\n\t\t\t\t\tif (edgeOffset) {\n\t\t\t\t\t\tvar targetElem = document.getElementById(window.location.href.split("#")[1])\n\t\t\t\t\t\tif (targetElem) {\n\t\t\t\t\t\t\tvar targetY = Math.max(0, zenscroll.getTopOf(targetElem) - edgeOffset)\n\t\t\t\t\t\t\tvar diff = zenscroll.getY() - targetY\n\t\t\t\t\t\t\t// Only do the adjustment if the browser is very close to the element:\n\t\t\t\t\t\t\tif (0 <= diff && diff < 9 ) {\n\t\t\t\t\t\t\t\twindow.scrollTo(0, targetY)\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}, 9)\n\t\t\t}\n\n\t\t}, false)\n\n\t\t// Handling clicks on anchors\n\t\tvar RE_noZensmooth = new RegExp("(^|\\\\s)noZensmooth(\\\\s|$)")\n\t\twindow.addEventListener("click", function (event) {\n\t\t\tvar anchor = event.target\n\t\t\twhile (anchor && anchor.tagName !== "A") {\n\t\t\t\tanchor = anchor.parentNode\n\t\t\t}\n\t\t\t// Let the browser handle the click if it wasn\'t with the primary button, or with some modifier keys:\n\t\t\tif (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {\n\t\t\t\treturn\n\t\t\t}\n\t\t\t// Save the current scrolling position so it can be used for scroll restoration:\n\t\t\tif (isScrollRestorationSupported) {\n\t\t\t\tvar historyState = history.state && typeof history.state === "object" ? history.state : {}\n\t\t\t\thistoryState.zenscrollY = zenscroll.getY()\n\t\t\t\ttry {\n\t\t\t\t\thistory.replaceState(historyState, "")\n\t\t\t\t} catch (e) {\n\t\t\t\t\t// Avoid the Chrome Security exception on file protocol, e.g., file://index.html\n\t\t\t\t}\n\t\t\t}\n\t\t\t// Find the referenced ID:\n\t\t\tvar href = anchor.getAttribute("href") || ""\n\t\t\tif (href.indexOf("#") === 0 && !RE_noZensmooth.test(anchor.className)) {\n\t\t\t\tvar targetY = 0\n\t\t\t\tvar targetElem = document.getElementById(href.substring(1))\n\t\t\t\tif (href !== "#") {\n\t\t\t\t\tif (!targetElem) {\n\t\t\t\t\t\t// Let the browser handle the click if the target ID is not found.\n\t\t\t\t\t\treturn\n\t\t\t\t\t}\n\t\t\t\t\ttargetY = zenscroll.getTopOf(targetElem)\n\t\t\t\t}\n\t\t\t\tevent.preventDefault()\n\t\t\t\t// By default trigger the browser\'s `hashchange` event...\n\t\t\t\tvar onDone = function () { window.location = href }\n\t\t\t\t// ...unless there is an edge offset specified\n\t\t\t\tvar edgeOffset = zenscroll.setup().edgeOffset\n\t\t\t\tif (edgeOffset) {\n\t\t\t\t\ttargetY = Math.max(0, targetY - edgeOffset)\n\t\t\t\t\tif (isHistorySupported) {\n\t\t\t\t\t\tonDone = function () { history.pushState({}, "", href) }\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tzenscroll.toY(targetY, null, onDone)\n\t\t\t}\n\t\t}, false)\n\n\t}\n\n\n\treturn zenscroll\n\n\n}));\n\n\n//# sourceURL=webpack://snowflake-boilerplate/./node_modules/zenscroll/zenscroll.js?')}},__webpack_module_cache__={};function __webpack_require__(t){if(__webpack_module_cache__[t])return __webpack_module_cache__[t].exports;var e=__webpack_module_cache__[t]={exports:{}};return __webpack_modules__[t].call(e.exports,e,e.exports,__webpack_require__),e.exports}__webpack_require__.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return __webpack_require__.d(e,{a:e}),e},__webpack_require__.d=(t,e)=>{for(var n in e)__webpack_require__.o(e,n)&&!__webpack_require__.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},__webpack_require__.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";eval("\n// EXTERNAL MODULE: ./node_modules/zenscroll/zenscroll.js\nvar zenscroll = __webpack_require__(172);\nvar zenscroll_default = /*#__PURE__*/__webpack_require__.n(zenscroll);\n;// CONCATENATED MODULE: ./src/scripts/main.js\n// Smooth scroll control\n// reference: https://www.npmjs.com/package/zenscroll\n\nlet triggers = document.querySelectorAll('a[href^=\"#\"]')\n\ntriggers.forEach((trigger) => {\n    trigger.onclick = function (e) {\n        e.preventDefault()\n        let hashTag = this.getAttribute('href')\n        let target = document.querySelector(hashTag)\n        zenscroll_default().setup(null, 0)\n        zenscroll_default().to(target)\n    }\n})\n\n;// CONCATENATED MODULE: ./src/app.js\n\n\n\n//# sourceURL=webpack://snowflake-boilerplate/./src/app.js_+_1_modules?")})(),(()=>{"use strict";eval("// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://snowflake-boilerplate/./src/styles/styles.scss?")})()})();