// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gBWYa":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "3e514e257911c8d1";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"40LWz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _gridderJs = require("../src/gridder-js");
var _gridderJsDefault = parcelHelpers.interopDefault(_gridderJs);
window.GridderJS = (0, _gridderJsDefault.default);
exports.default = (0, _gridderJsDefault.default);

},{"../src/gridder-js":"5gkcI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5gkcI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GridderJS", ()=>GridderJS);
var _justExtend = require("just-extend");
var _justExtendDefault = parcelHelpers.interopDefault(_justExtend);
var _options = require("./options");
var _optionsDefault = parcelHelpers.interopDefault(_options);
class GridderJS {
    static initClass() {}
    constructor(el, options){
        let left;
        this.element = el;
        this.clickableElements = [];
        this.listeners = [];
        this.clickedElement = null;
        this.expanderElement = null;
        if (typeof this.element === "string") this.element = document.querySelector(this.element);
        if (this.element.gridderjs) throw new Error("GridderJS already attached.");
        // Now add this gridder to the global instances.
        GridderJS.instances.push(this);
        // Put the gridder inside the element itself.
        this.element.gridderjs = this;
        let elementOptions = (left = GridderJS.optionsForElement(this.element)) != null ? left : {};
        // set options
        this.options = (0, _justExtendDefault.default)(true, {}, (0, _optionsDefault.default), elementOptions, options != null ? options : {});
        // init
        this.#init();
    }
    // The function that gets called when GridderJS is initialized. You
    // can (and should) setup event listeners inside this function.
     #init() {
        // get elements
        let el;
        for (el of this.element.querySelectorAll("." + this.options.gridClass))this.clickableElements.push(el);
        if (this.clickableElements == null || !this.clickableElements.length) throw new Error(`Invalid \`${this.options.gridClass}\` option provided. Please provide a CSS selector, a plain HTML element or a list of those.`);
        //
        this.clickableElements.forEach((clickableElement)=>{
            return this.listeners.push({
                element: clickableElement,
                events: {
                    click: (evt)=>{
                        this.#open(evt);
                    }
                }
            });
        });
        // 
        this.#enable();
        // init callback
        return this.options.init.call(this, this.element);
    }
     #enable() {
        // init gridder style and css
        this.element.style.display = "grid";
        this.element.style.gridTemplateColumns = "repeat(" + this.options.columns + ", 1fr)";
        this.element.style.gridAutoFlow = "row dense";
        this.element.style.gap = this.options.gap + "px";
        delete this.disabled;
        this.clickableElements.forEach((element)=>element.classList.add("g-clickable"));
        return this.#setupEventListeners();
    }
    // Activates all listeners stored in @listeners
     #setupEventListeners() {
        return this.listeners.map((elementListeners)=>(()=>{
                let result = [];
                for(let event in elementListeners.events){
                    let listener = elementListeners.events[event];
                    result.push(elementListeners.element.addEventListener(event, listener, false));
                }
                return result;
            })());
    }
    // Deactivates all listeners stored in @listeners
     #removeEventListeners() {
        return this.listeners.map((elementListeners)=>(()=>{
                let result = [];
                for(let event in elementListeners.events){
                    let listener = elementListeners.events[event];
                    result.push(elementListeners.element.removeEventListener(event, listener, false));
                }
                return result;
            })());
    }
    // Disble event
     #disable() {
        this.#removeEventListeners();
    }
    // Open Expander
    async #open(e) {
        let el1 = e.target;
        // make sure we have the grid item
        if (!el1.classList.contains("active")) el1 = el1.closest("." + this.options.gridClass);
        // if same grid item is selected, close it
        if (el1.classList.contains("active")) {
            this.#close(el1);
            return false;
        }
        // then set all as inactive and activate clicked grid item
        el1.parentNode.querySelectorAll("." + this.options.gridClass).forEach((div)=>{
            div.classList.remove("active");
        });
        el1.classList.add("active");
        // close expander first if open
        let existingExpander = el1.parentNode.querySelector("." + this.options.expanderClass);
        if (existingExpander) existingExpander.remove();
        // insert expander
        let template = this.#insertExpander(el1);
        // scroll into view
        el1.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
        // get expander content
        const innerHtml = await this.#getExpanderContent(el1);
        // create navigation
        let gridderNavigation = this.#createNavigationElements(el1);
        // create content
        let gridderContent = document.createElement("div");
        gridderContent.classList.add("gridder-content");
        gridderContent.innerHTML = innerHtml;
        // append content
        template.innerHTML = "";
        template.appendChild(gridderNavigation);
        template.appendChild(gridderContent);
        // initialize navigation events
        this.#initializeNavigationEvents(template, el1);
        // set base var
        this.clickedElement = el1;
        this.expanderElement = template;
        // open callback
        this.options.open.call(this);
    }
    update(options) {
        this.options = (0, _justExtendDefault.default)(true, {}, this.options, options != null ? options : {});
        this.#enable();
    }
    destroy() {
        this.#disable();
        delete this.element.gridderjs;
        return GridderJS.instances.splice(GridderJS.instances.indexOf(this), 1);
    }
    //////////////////////////////////////////
    #insertExpander = function(el) {
        // create expander
        let template = document.createElement("div");
        // style expander
        template.classList.add(this.options.expanderClass);
        // 
        template.innerHTML = "Loading...";
        // set css
        if (this.options.display === "right") {
            let total_count = this.clickableElements.length;
            let total_rows = Math.ceil(this.clickableElements.length / this.options.columns);
            console.log(total_count, total_rows, this.clickableElements.length / this.options.columns);
            template.style.gridColumn = this.options.columns + 1;
            template.style.gridRow = " span " + total_rows;
            this.#insertBefore(template, el);
        }
        if (this.options.display === "bottom") {
            template.style.gridColumn = "1 / span " + this.options.columns;
            template.style.gridRow = " span 1 ";
            this.#insertAfter(template, el);
        }
        el.parentNode.classList.add("hasOpenExpander");
        return template;
    };
    #close = function(el) {
        // remove grid item active class
        el.classList.remove("active");
        // remove expander bloc
        el.parentNode.querySelector("." + this.options.expanderClass).remove();
        //
        el.parentNode.classList.remove("hasOpenExpander");
        // set base var
        this.clickedElement = null;
        this.expanderElement = null;
        // close expander callback
        this.options.close.call(el);
    };
    #getExpanderContent = async function(el) {
        // bloc content
        if (el.dataset.target) {
            let target = el.dataset.target;
            let targetElement = document.getElementById(target);
            return targetElement.innerHTML.trim();
        }
        // url content
        let url = el.dataset.url;
        let response = await fetch(url);
        return response.text();
    };
    #createNavigationElements = function(parent) {
        // create navigation container
        let el = document.createElement("div");
        el.classList.add("gridder-navigation");
        // add prev button
        if (this.#getPreviousSibling(parent, "." + this.options.gridClass)) {
            let prev = document.createElement("a");
            prev.classList.add("gridder-prev");
            prev.innerHTML = this.options.prevText;
            el.appendChild(prev);
        }
        // add next button
        if (this.#getNextSibling(parent, "." + this.options.gridClass)) {
            let next = document.createElement("a");
            next.classList.add("gridder-next");
            next.innerHTML = this.options.nextText;
            el.appendChild(next);
        }
        // add close button
        let close = document.createElement("a");
        close.classList.add("gridder-close");
        close.innerHTML = this.options.closeText;
        el.appendChild(close);
        return el;
    };
    #initializeNavigationEvents = function(template, parent) {
        template.querySelector(".gridder-close").addEventListener("click", ()=>{
            this.#close(parent);
        });
        let next = template.querySelector(".gridder-next");
        if (next) next.addEventListener("click", ()=>{
            let target = this.#getNextSibling(parent, "." + this.options.gridClass);
            if (target) {
                const event = new Event("click", {
                    bubbles: true
                });
                target.dispatchEvent(event);
            }
        });
        let prev = template.querySelector(".gridder-prev");
        if (prev) prev.addEventListener("click", ()=>{
            let target = this.#getPreviousSibling(parent, "." + this.options.gridClass);
            if (target) {
                const event = new Event("click", {
                    bubbles: true
                });
                target.dispatchEvent(event);
            }
        });
    };
    #insertBefore = function(newNode, existingNode) {
        existingNode.parentNode.prepend(newNode);
    };
    #insertAfter = function(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    };
    #getNextSibling = function(elem, selector) {
        var sibling = elem.nextElementSibling;
        if (!selector) return sibling;
        while(sibling){
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling;
        }
    };
    #getPreviousSibling = function(elem, selector) {
        var sibling = elem.previousElementSibling;
        if (!selector) return sibling;
        while(sibling){
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.previousElementSibling;
        }
    };
}
exports.default = GridderJS;
GridderJS.options = {};
// Returns the options for an element or undefined if none available.
GridderJS.optionsForElement = function(element) {
    // Get the `GridderJS.options.elementId` for this element if it exists
    if (element.getAttribute("id")) return GridderJS.options[camelize(element.getAttribute("id"))];
    else return undefined;
};
// Holds a list of all gridder instances
GridderJS.instances = [];
// Augment jQuery
if (typeof jQuery !== "undefined" && jQuery !== null) jQuery.fn.gridderjs = function(options) {
    return this.each(function() {
        return new GridderJS(this, options);
    });
};

},{"just-extend":"gcxyD","./options":"lNd80","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gcxyD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>objectExtend);
var objectExtend = extend;
/*
  var obj = {a: 3, b: 5};
  extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 4, b: 5, c: 8}

  var obj = {a: 3, b: 5};
  extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 3, b: 5}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3]}

  extend({a: 4, b: 5}); // {a: 4, b: 5}
  extend({a: 4, b: 5}, 3); {a: 4, b: 5}
  extend({a: 4, b: 5}, true); {a: 4, b: 5}
  extend('hello', {a: 4, b: 5}); // throws
  extend(3, {a: 4, b: 5}); // throws
*/ function extend() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == "boolean") deep = args.shift();
    var result = args[0];
    if (isUnextendable(result)) throw new Error("extendee must be an object");
    var extenders = args.slice(1);
    var len = extenders.length;
    for(var i = 0; i < len; i++){
        var extender = extenders[i];
        for(var key in extender)if (Object.prototype.hasOwnProperty.call(extender, key)) {
            var value = extender[key];
            if (deep && isCloneable(value)) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend(true, Object.prototype.hasOwnProperty.call(result, key) && !isUnextendable(result[key]) ? result[key] : base, value);
            } else result[key] = value;
        }
    }
    return result;
}
function isCloneable(obj) {
    return Array.isArray(obj) || ({}).toString.call(obj) == "[object Object]";
}
function isUnextendable(val) {
    return !val || typeof val != "object" && typeof val != "function";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"lNd80":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
let defaultOptions = {
    // expander placement
    // 'right' option is a work in progress
    display: "bottom",
    // number of columns
    columns: 4,
    // the gap between the columns
    gap: 20,
    // activate debug logging
    debug: false,
    // navigation text
    nextText: "Next",
    prevText: "Previous",
    closeText: "Close",
    // elements classes
    gridClass: "gridder-list",
    expanderClass: "gridder-show",
    // Called when gridder instance is ready
    init () {},
    // Called when gridder instance is open
    // you can access: 
    // this.clickedElement
    // this.expanderElement
    open () {},
    // Called when gridder expander is closed
    close () {}
};
exports.default = defaultOptions;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["gBWYa","40LWz"], "40LWz", "parcelRequirecb19")

//# sourceMappingURL=gridder-js-min.js.map
