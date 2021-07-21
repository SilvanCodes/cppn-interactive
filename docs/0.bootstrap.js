(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/cppn_interactive.js":
/*!**********************************!*\
  !*** ../pkg/cppn_interactive.js ***!
  \**********************************/
/*! exports provided: Individual, Population, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cppn_interactive_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cppn_interactive_bg.wasm */ \"../pkg/cppn_interactive_bg.wasm\");\n/* harmony import */ var _cppn_interactive_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cppn_interactive_bg.js */ \"../pkg/cppn_interactive_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Individual\", function() { return _cppn_interactive_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Individual\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Population\", function() { return _cppn_interactive_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Population\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _cppn_interactive_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/cppn_interactive.js?");

/***/ }),

/***/ "../pkg/cppn_interactive_bg.js":
/*!*************************************!*\
  !*** ../pkg/cppn_interactive_bg.js ***!
  \*************************************/
/*! exports provided: Individual, Population, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Individual\", function() { return Individual; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Population\", function() { return Population; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _cppn_interactive_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cppn_interactive_bg.wasm */ \"../pkg/cppn_interactive_bg.wasm\");\n\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _cppn_interactive_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_cppn_interactive_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n/**\n*/\nclass Individual {\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _cppn_interactive_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_individual_free\"](ptr);\n    }\n    /**\n    * @param {number} size\n    * @param {number} resolution\n    * @returns {number}\n    */\n    probe_complete(size, resolution) {\n        var ret = _cppn_interactive_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"individual_probe_complete\"](this.ptr, size, resolution);\n        return ret;\n    }\n}\n/**\n*/\nclass Population {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Population.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _cppn_interactive_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_population_free\"](ptr);\n    }\n    /**\n    * @param {number} size\n    * @param {number} seed\n    * @returns {Population}\n    */\n    static new(size, seed) {\n        var ret = _cppn_interactive_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"population_new\"](size, seed);\n        return Population.__wrap(ret);\n    }\n    /**\n    * @param {number} index_parent_0\n    * @param {number} index_parent_1\n    */\n    next_generation(index_parent_0, index_parent_1) {\n        _cppn_interactive_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"population_next_generation\"](this.ptr, index_parent_0, index_parent_1);\n    }\n    /**\n    * @param {number} index\n    * @param {number} size\n    * @param {number} resolution\n    * @returns {number}\n    */\n    probe_individual_complete(index, size, resolution) {\n        var ret = _cppn_interactive_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"population_probe_individual_complete\"](this.ptr, index, size, resolution);\n        return ret;\n    }\n}\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/cppn_interactive_bg.js?");

/***/ }),

/***/ "../pkg/cppn_interactive_bg.wasm":
/*!***************************************!*\
  !*** ../pkg/cppn_interactive_bg.wasm ***!
  \***************************************/
/*! exports provided: memory, __wbg_individual_free, individual_probe_complete, __wbg_population_free, population_new, population_next_generation, population_probe_individual_complete */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./cppn_interactive_bg.js */ \"../pkg/cppn_interactive_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/cppn_interactive_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var cppn_interactive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cppn-interactive */ \"../pkg/cppn_interactive.js\");\n/* harmony import */ var cppn_interactive_cppn_interactive_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cppn-interactive/cppn_interactive_bg */ \"../pkg/cppn_interactive_bg.wasm\");\n\n\n\nconsole.log('hello');\n\nlet SIZE = 100;\nlet RESOLUTION = 300;\nlet POPULATION_SIZE = 8;\nlet SEED = 8;\n\nconst canvasWrapper = document.getElementById(\"canvas-wrapper\");\n\n\nsize.value = SIZE;\nsize.onchange = event => {\n    SIZE = event.target.value;\n    render();\n};\n\nresolution.value = RESOLUTION;\nresolution.onchange = event => {\n    RESOLUTION = event.target.value;\n    render();\n};\n\npopulationSize.value = POPULATION_SIZE;\npopulationSize.onchange = event => {\n    POPULATION_SIZE = event.target.value;\n    setupPopulation();\n    render();\n};\n\nseed.value = SEED;\nseed.onchange = event => {\n    SEED = event.target.value;\n    setupPopulation();\n    render();\n};\n\nlet parents = [];\n\nautoGenerations.onclick = () => {\n    for (let i = 0; i < 10; i++) {\n        population.next_generation(Math.floor(Math.random() * POPULATION_SIZE), Math.floor(Math.random() * POPULATION_SIZE));\n    }\n    render();\n};\n\nconst selectParent = index => {\n    parents.push(index);\n    console.log(parents);\n    if (parents.length == 2) {\n        population.next_generation(parents[0], parents[1]);\n        parents.length = 0;\n        render();\n    }\n}\n\nlet population = cppn_interactive__WEBPACK_IMPORTED_MODULE_0__[\"Population\"].new(POPULATION_SIZE, SEED);\n\nconst setupPopulation = () => {\n    population = cppn_interactive__WEBPACK_IMPORTED_MODULE_0__[\"Population\"].new(POPULATION_SIZE, SEED);\n    while (canvasWrapper.firstChild) {\n        canvasWrapper.removeChild(canvasWrapper.firstChild);\n    }\n\n    for (let p = 0; p < POPULATION_SIZE; p++) {\n        let c = document.createElement(\"CANVAS\");\n        c.id = `canvas-${p}`;\n        c.height = RESOLUTION;\n        c.width = RESOLUTION;\n\n        canvasWrapper.appendChild(c);\n    }\n}\n\nconst render = () => {\n    console.time('render');\n    for (let p = 0; p < POPULATION_SIZE; p++) {\n        let canvas = document.getElementById(`canvas-${p}`);\n        canvas.height = RESOLUTION;\n        canvas.width = RESOLUTION;\n        canvas.onclick = () => {\n            console.log(`canvas-${p}`);\n            selectParent(p);\n        };\n        let ctx = canvas.getContext('2d');\n\n        const resultPtr = population.probe_individual_complete(p, SIZE, RESOLUTION);\n        const pixels = new Uint8ClampedArray(cppn_interactive_cppn_interactive_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, resultPtr, RESOLUTION * RESOLUTION * 4);\n\n        let imagedata = new ImageData(pixels, RESOLUTION, RESOLUTION);\n\n        ctx.putImageData(imagedata, 0, 0);\n    }\n    console.timeEnd('render');\n}\n\nsetupPopulation();\nrender();\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ })

}]);