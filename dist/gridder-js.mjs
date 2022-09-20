import $aMZpC$justextend from "just-extend";


let $50e97065b94a2e88$var$defaultOptions = {
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
    loadingText: "Loading...",
    // elements classes
    gridClass: "gridder-list",
    itemClass: "gridder-item",
    expanderClass: "gridder-show",
    openExpanderClass: "hasOpenExpander",
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
var $50e97065b94a2e88$export$2e2bcd8739ae039 = $50e97065b94a2e88$var$defaultOptions;


class $620dfb1f03fa3511$export$2e2bcd8739ae039 {
    static initClass() {}
    constructor(el, options){
        let left;
        this.element = el;
        this.clickableElements = [];
        this.listeners = [];
        this.clickedElement = null;
        this.expanderElement = null;
        this.listElement = null;
        if (typeof this.element === "string") this.element = document.querySelector(this.element);
        if (this.element.gridderjs) throw new Error("GridderJS already attached.");
        // Now add this gridder to the global instances.
        $620dfb1f03fa3511$export$2e2bcd8739ae039.instances.push(this);
        // Put the gridder inside the element itself.
        this.element.gridderjs = this;
        let elementOptions = (left = $620dfb1f03fa3511$export$2e2bcd8739ae039.optionsForElement(this.element)) != null ? left : {};
        // set options
        this.options = (0, $aMZpC$justextend)(true, {}, (0, $50e97065b94a2e88$export$2e2bcd8739ae039), elementOptions, options != null ? options : {});
        // init
        this.#init();
    }
    // The function that gets called when GridderJS is initialized. You
    // can (and should) setup event listeners inside this function.
     #init() {
        //this.element.style.display = 'flex';
        // GET GRIDDER LIST
        this.listElement = this.element.querySelector("." + this.options.gridClass);
        // get elements
        for (let el of this.listElement.children)this.clickableElements.push(el);
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
        this.listElement.style.width = "100%";
        this.listElement.style.display = "grid";
        this.listElement.style.gridTemplateColumns = "repeat(" + this.options.columns + ", 1fr)";
        this.listElement.style.gridAutoFlow = "row dense";
        this.listElement.style.gap = this.options.gap + "px";
        // set explander style if exists
        let existingExpander = this.element.querySelector("." + this.options.expanderClass);
        if (existingExpander) this.#setExpanderStyles(existingExpander);
        delete this.disabled;
        this.clickableElements.forEach((element)=>element.classList.add("gridder-item"));
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
        if (!el1.classList.contains(this.options.itemClass)) el1 = el1.closest("." + this.options.itemClass);
        // close expander first if open
        let existingExpander1 = this.element.querySelector("." + this.options.expanderClass);
        if (existingExpander1) this.#close(el1);
        // if same grid item is selected, close it
        if (el1.classList.contains("active")) {
            this.#close(el1);
            return false;
        }
        // then set all as inactive and activate clicked grid item
        this.listElement.querySelectorAll("." + this.options.itemClass).forEach((div)=>{
            div.classList.remove("active");
        });
        el1.classList.add("active");
        // insert expander
        let template = this.#insertExpander(el1);
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
        // 
        if (this.options.display === "right") {
            this._columns = this.options.columns;
            this.update({
                columns: this.options.columns - Math.round(this.options.columns / 4)
            });
        }
        // scroll into view
        if (this.options.display === "bottom") el1.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
        // open callback
        this.options.open.call(this);
    }
    update(options) {
        this.options = (0, $aMZpC$justextend)(true, {}, this.options, options != null ? options : {});
        this.#enable();
    }
    destroy() {
        this.#disable();
        delete this.element.gridderjs;
        return $620dfb1f03fa3511$export$2e2bcd8739ae039.instances.splice($620dfb1f03fa3511$export$2e2bcd8739ae039.instances.indexOf(this), 1);
    }
    //////////////////////////////////////////
     #setExpanderStyles(template1) {
        // set css
        if (this.options.display === "right") {
            this.listElement.style.width = "65%";
            template1.style.width = " calc(35% - " + this.options.gap + "px)";
            template1.style.height = "100vh";
            template1.style.position = " sticky ";
            template1.style.top = " 0 ";
            template1.style.right = " 0 ";
            template1.style.float = " right ";
        }
        if (this.options.display === "bottom") {
            template1.style.gridColumn = "1 / span " + this.options.columns;
            template1.style.gridRow = " span 1 ";
        }
        template1.style.overflowY = "scroll";
        template1.style.overflowX = "hidden";
    }
    #insertExpander = function(el) {
        // create expander
        let template = document.createElement("div");
        // style expander
        template.classList.add(this.options.expanderClass);
        // 
        template.innerHTML = this.options.loadingText;
        //
        this.#setExpanderStyles(template);
        if (this.options.display === "right") this.#insertBefore(template, this.listElement);
        if (this.options.display === "bottom") this.#insertAfter(template, el);
        el.parentNode.classList.add(this.options.openExpanderClass);
        return template;
    };
    #close = function(el) {
        // remove grid item active class
        el.classList.remove("active");
        // remove expander bloc
        this.expanderElement.remove();
        //
        el.parentNode.classList.remove("hasOpenExpander");
        // remove any unwated styles
        this.listElement.style.width = "100%";
        this.update();
        // set base var
        this.clickedElement = null;
        this.expanderElement = null;
        // 
        if (this.options.display === "right") this.update({
            columns: this._columns
        });
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
        if (this.#getPreviousSibling(parent, "." + this.options.itemClass)) {
            let prev = document.createElement("a");
            prev.classList.add("gridder-prev");
            prev.innerHTML = this.options.prevText;
            el.appendChild(prev);
        }
        // add next button
        if (this.#getNextSibling(parent, "." + this.options.itemClass)) {
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
            let target = this.#getNextSibling(parent, "." + this.options.itemClass);
            if (target) {
                const event = new Event("click", {
                    bubbles: true
                });
                target.dispatchEvent(event);
            }
        });
        let prev = template.querySelector(".gridder-prev");
        if (prev) prev.addEventListener("click", ()=>{
            let target = this.#getPreviousSibling(parent, "." + this.options.itemClass);
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
$620dfb1f03fa3511$export$2e2bcd8739ae039.options = {};
// Returns the options for an element or undefined if none available.
$620dfb1f03fa3511$export$2e2bcd8739ae039.optionsForElement = function(element) {
    // Get the `GridderJS.options.elementId` for this element if it exists
    if (element.getAttribute("id")) return $620dfb1f03fa3511$export$2e2bcd8739ae039.options[camelize(element.getAttribute("id"))];
    else return undefined;
};
// Holds a list of all gridder instances
$620dfb1f03fa3511$export$2e2bcd8739ae039.instances = [];
// Augment jQuery
if (typeof jQuery !== "undefined" && jQuery !== null) jQuery.fn.gridderjs = function(options) {
    return this.each(function() {
        return new $620dfb1f03fa3511$export$2e2bcd8739ae039(this, options);
    });
};


export {$620dfb1f03fa3511$export$2e2bcd8739ae039 as default, $620dfb1f03fa3511$export$2e2bcd8739ae039 as GridderJS};
//# sourceMappingURL=gridder-js.mjs.map
