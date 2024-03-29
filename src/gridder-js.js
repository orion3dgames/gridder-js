import extend from "just-extend";
import defaultOptions from "./options";

export default class GridderJS {
  static initClass() {
    
  }
  constructor(el, options) {
    let left;
    this.element = el;

    this.clickableElements = [];
    this.listeners = [];
    this.clickedElement = null;
    this.expanderElement = null;
    this.listElement = null;
    this.breakpoints = [];

    if (typeof this.element === "string") {
      this.element = document.querySelector(this.element);
    }

    if (this.element.gridderjs) {
      throw new Error("GridderJS already attached.");
    }

    // Now add this gridder to the global instances.
    GridderJS.instances.push(this);

    // Put the gridder inside the element itself.
    this.element.gridderjs = this;

    let elementOptions =
    (left = GridderJS.optionsForElement(this.element)) != null ? left : {};

    // set options
    this.options = extend(
        true,
        {},
        defaultOptions,
        elementOptions,
        options != null ? options : {}
      );

    // init
    this.#init();
  }

  // The function that gets called when GridderJS is initialized. You
  // can (and should) setup event listeners inside this function.
  #init() {

    //this.element.style.display = 'flex';

    // GET GRIDDER LIST
    this.listElement = this.element.querySelector('.'+this.options.gridClass)

    // get elements
    for (let el of this.listElement.children) {
        this.clickableElements.push(el);
    }

    if (this.clickableElements == null || !this.clickableElements.length) {
      throw new Error(
        `Invalid \`${this.options.gridClass}\` option provided. Please provide a CSS selector, a plain HTML element or a list of those.`
      );
    }

    //
    this.clickableElements.forEach((clickableElement) => {
        return this.listeners.push({
            element: clickableElement,
            events: {
                click: (evt) => {
                    this.#open(evt);
                },
            },
        });
    });

    // parse breakpoints;
    this.#parseBreakpoints();

    // Initial Resize
    GridderJS.resizeGridder();

    // Enable Gridder
    this.#enable();

    // init callback
    return this.options.init.call(this, this.element);
  }

  // parse breakpoint to be able to use later on each resize
  #parseBreakpoints(){
    var _this9 = this;
    var breakpoints = this.options.breakpoints;
    this.breakpoints.push(["default", this.options]);
    if (breakpoints) {
      for (const width in breakpoints) {
        _this9.breakpoints.push([
          parseInt(width),
          extend(true, {}, _this9.options, breakpoints[width])
        ]);
      };
    }
  }

  #enable() {

    this.listElement.parentNode.style.display = 'flex';

    // init gridder style and css
    this.listElement.style.width = '100%';
    this.listElement.style.display = 'grid';
    this.listElement.style.gridTemplateColumns = 'repeat('+this.options.columns+', 1fr)';
    this.listElement.style.gridAutoFlow = 'row dense';
    this.listElement.style.gap = this.options.gap+'px';
    this.listElement.style.gridTemplateRows= 'min-content';

    // set explander style if exists
    let existingExpander = this.element.querySelector('.'+this.options.expanderClass);
    if(existingExpander){
      this.#setExpanderStyles(existingExpander);
    }

    delete this.disabled;
    this.clickableElements.forEach((element) =>
      element.classList.add("gridder-item")
    );
    return this.#setupEventListeners();
  }

  // Activates all listeners stored in @listeners
  #setupEventListeners() {
    return this.listeners.map((elementListeners) =>
      (() => {
        let result = [];
        for (let event in elementListeners.events) {
          let listener = elementListeners.events[event];
          result.push(
            elementListeners.element.addEventListener(event, listener, false)
          );
        }
        return result;
      })()
    );
  }

  // Deactivates all listeners stored in @listeners
  #removeEventListeners() {
    return this.listeners.map((elementListeners) =>
      (() => {
        let result = [];
        for (let event in elementListeners.events) {
          let listener = elementListeners.events[event];
          result.push(
            elementListeners.element.removeEventListener(event, listener, false)
          );
        }
        return result;
      })()
    );
  }

  // Disable event
  #disable() {
    this.#removeEventListeners();
  }

  // Open Expander
  async #open(e) {

    let el = e.target;

    // make sure we have the grid item
    if(!el.classList.contains(this.options.itemClass)){
      el = el.closest('.'+this.options.itemClass);
    }

    // close expander if open
    if(this.expanderElement){

      // if same grid item is selected, close it
      if(el.classList.contains('active')){
        this.#close(el);  
        return false;
      }

      // else just close
      this.#close(el); 
    }
    
    // then set all as inactive and activate clicked grid item
    this.listElement.querySelectorAll('.'+this.options.itemClass).forEach( div => {
        div.classList.remove('active');
    });
    el.classList.add('active');

    // insert expander
    let template = this.#insertExpander(el);

    // get expander content
    const innerHtml = await this.#getExpanderContent(el);

    // create navigation
    let gridderNavigation = this.#createNavigationElements(el);

    // create content
    let gridderContent = document.createElement('div');
    gridderContent.classList.add('gridder-content');
    gridderContent.innerHTML = innerHtml;

    // append content
    template.innerHTML = "";
    template.appendChild(gridderNavigation);
    template.appendChild(gridderContent);

    // initialize navigation events
    this.#initializeNavigationEvents(template, el);

    // set base var
    this.clickedElement = el;
    this.expanderElement = template;

    // 
    if(this.options.display === 'right'){
      this._columns = this.options.columns;
      this.update({ columns: this.options.columns - Math.round(this.options.columns/4) })
    }

    // scroll into view
    if(this.options.display === 'bottom'){
      el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    //
    this.#setExpanderStyles(template);

    // open callback
    this.options.open.call(this)
  }

  #setExpanderStyles(template) {
    // set css for display == right
    if(this.options.display === 'right'){
      this.listElement.style.flex = "65%";
      template.style.overscrollBehavior = 'contain' ; /* Prevent SCROLL-CHAINING to parent elements. */
      template.style.flex = " calc(35% - "+this.options.gap+"px)";
      template.style.position = ' sticky ';
      template.style.alignSelf = 'flex-start';
      template.style.top = ' 0 ';
      template.style.marginLeft = this.options.gap+"px";
      template.style.overflowY = 'scroll';
      template.style.overflowX = 'hidden';
      template.style.maxHeight = '100vh';
    }
    // set css for display == bottom
    if(this.options.display === 'bottom'){
      template.style.gridColumn = '1 / span '+this.options.columns;
      template.style.gridRow = ' span 1 ';
    } 
  }

  #insertExpander = function (el) {

    // create expander
    let template = document.createElement('div');

    // style expander
    template.classList.add(this.options.expanderClass);
    template.classList.add("gridder-"+this.options.display);

    // 
    template.innerHTML = this.options.loadingText;

    //
    if(this.options.display === 'right'){
      this.#insertAfter(template, this.listElement);
    }

    if(this.options.display === 'bottom'){
      this.#insertAfter(template, el);
    }

    el.parentNode.classList.add(this.options.openExpanderClass);
 
    return template;
  }

  #close = function (el) {

    // remove grid item active class
    el.classList.remove('active');

    // remove expander bloc
    this.expanderElement.remove();

    //
    el.parentNode.classList.remove(this.options.openExpanderClass);

    // remove any unwated styles
    this.listElement.style.width = '100%';
    this.update();

    // set base var
    this.clickedElement = null;
    this.expanderElement = null;

     // 
     if(this.options.display === 'right'){
      this.update({ columns: this._columns })
    }

    // close expander callback
    this.options.close.call(el)

  }

  #getExpanderContent = async function (el) {

    // bloc content
    if(el.dataset.target){
      let target = el.dataset.target;
      let targetElement = document.getElementById(target);
      return targetElement.innerHTML.trim();
    }

    // url content
    let url = el.dataset.url;
    let response = await fetch(url);
    return response.text();
    
  }

  #createNavigationElements = function (parent) {

    // create navigation container
    let el = document.createElement('div');
    el.classList.add('gridder-navigation');

    // add prev button
    if(this.#getPreviousSibling(parent, '.'+this.options.itemClass)){
      let prev = document.createElement('a');
      prev.classList.add('gridder-prev');
      prev.innerHTML = this.options.prevText;
      el.appendChild(prev);
    }

    // add next button
    if(this.#getNextSibling(parent, '.'+this.options.itemClass)){
      let next = document.createElement('a');
      next.classList.add('gridder-next');
      next.innerHTML = this.options.nextText;
      el.appendChild(next);
    }

    // add close button
    let close = document.createElement('a');
    close.classList.add('gridder-close');
    close.innerHTML = this.options.closeText;
    el.appendChild(close);

    return el;
  }

  #initializeNavigationEvents = function(template, parent) {

    template.querySelector('.gridder-close').addEventListener('click', () => {
      this.#close(parent);
    });

    let next = template.querySelector('.gridder-next');
    if(next){
      next.addEventListener('click', () => {
        let target = this.#getNextSibling(parent, '.'+this.options.itemClass);
        if(target) {
          const event = new Event('click', {bubbles: true});
          target.dispatchEvent(event);
        }
      });
    }

    let prev = template.querySelector('.gridder-prev');
    if(prev){
      prev.addEventListener('click', () => {
        let target = this.#getPreviousSibling(parent, '.'+this.options.itemClass);
        if(target) {
          const event = new Event('click', {bubbles: true});
          target.dispatchEvent(event);
        }
      });
    }
   
  }

  #insertBefore = function(newNode, existingNode) {
    existingNode.parentNode.prepend(newNode);
  }

  #insertAfter = function(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  #getNextSibling = function (elem, selector) {
    var sibling = elem.nextElementSibling;
    if (!selector) return sibling;
    while (sibling) {
      if (sibling.matches(selector)) return sibling;
      sibling = sibling.nextElementSibling
    }
  };

  #getPreviousSibling = function (elem, selector) {
    var sibling = elem.previousElementSibling;
    if (!selector) return sibling;
    while (sibling) {
      if (sibling.matches(selector)) return sibling;
      sibling = sibling.previousElementSibling;
    }
  };

  //////////////// PUBLIC METHODS //////////////////
  
  update(options) {
    this._options = this.options;
    this.options = extend(
        true,
        {},
        this.options,
        options != null ? options : {}
      );
      this.#enable();
  }

  destroy() {
    this.#disable();
    delete this.element.gridderjs;
    return GridderJS.instances.splice(GridderJS.instances.indexOf(this), 1);
  }
    
}

GridderJS.options = {};

// Returns the options for an element or undefined if none available.
GridderJS.optionsForElement = function (element) {
  // Get the `GridderJS.options.elementId` for this element if it exists
  if (element.getAttribute("id")) {
    return GridderJS.options[element.getAttribute("id")];
  } else {
    return undefined;
  }
};

// Resize all gridder instances.
// terrible, but works : to be refactored once I found a way to make it work
GridderJS.resizeGridder = function () {
  let wWidth = window.innerWidth;
  GridderJS.instances.forEach((gridder) => {
    // if additional breakpoint specified
    if(gridder.breakpoints.length < 2) return false;
    // find closest breakpoint options
    for(const n in gridder.breakpoints) {
      if(n > 0){
        let breakpoint = gridder.breakpoints[n];
        if(wWidth <= breakpoint[0]){
          gridder.update(breakpoint[1]);
          break;
        }
      }
      // else use default
      gridder.update(gridder.breakpoints[0][1]);
    };
  });
};

// Holds a list of all gridder instances
GridderJS.instances = [];

// Augment jQuery
if (typeof jQuery !== "undefined" && jQuery !== null) {
    jQuery.fn.gridderjs = function (options) {
        return this.each(function () {
        return new GridderJS(this, options);
        });
    };
}

// Resize Event
// terrible, but works : to be refactored once I found a way to make it work
var resizeTimer;
window.addEventListener('resize', function(e){
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    GridderJS.resizeGridder();     
  }, 500);  
});

export { GridderJS };