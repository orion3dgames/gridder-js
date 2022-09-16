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

    // get elements
    let el;
    for (el of this.element.querySelectorAll('.'+this.options.gridClass)) {
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

    // 
    this.#enable();

    // init callback
    return this.options.init.call(this, this.element);
  }

  #enable() {
    // init gridder style and css
    this.element.style.display = 'grid';
    this.element.style.gridTemplateColumns = 'repeat('+this.options.columns+', 1fr)';
    this.element.style.gridAutoFlow = 'row dense';
    this.element.style.gap = this.options.gap+'px';

    delete this.disabled;
    this.clickableElements.forEach((element) =>
      element.classList.add("g-clickable")
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

  // Disble event
  #disable() {
    this.#removeEventListeners();
  }

  // Open Expander
  async #open(e) {

    let el = e.target;

    // make sure we have the grid item
    if(!el.classList.contains('active')){
    el = el.closest('.'+this.options.gridClass);
    }

    // if same grid item is selected, close it
    if(el.classList.contains('active')){
        this.#close(el);  
        return false;
    }
    
    // then set all as inactive and activate clicked grid item
    el.parentNode.querySelectorAll('.'+this.options.gridClass).forEach( div => {
        div.classList.remove('active');
    });
    el.classList.add('active');

    // close expander first if open
    let existingExpander = el.parentNode.querySelector('.'+this.options.expanderClass);
    if(existingExpander){
    existingExpander.remove();
    }

    // insert expander
    let template = this.#insertExpander(el);

    // scroll into view
    el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

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

    // open callback
    this.options.open.call(this)
  }

  update(options) {
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

  //////////////////////////////////////////
  #insertExpander = function (el) {

    // create expander
    let template = document.createElement('div');

    // style expander
    template.classList.add(this.options.expanderClass);

    // 
    template.innerHTML = "Loading...";

    // set css
    if(this.options.display === 'right'){
      let total_count = this.clickableElements.length;
      let total_rows = Math.ceil(this.clickableElements.length / this.options.columns);
      console.log(total_count, total_rows, this.clickableElements.length / this.options.columns);
      template.style.gridColumn = this.options.columns + 1;
      template.style.gridRow = ' span '+total_rows;

      this.#insertBefore(template, el);
    }

    if(this.options.display === 'bottom'){
      template.style.gridColumn = '1 / span '+this.options.columns;
      template.style.gridRow = ' span 1 ';

      this.#insertAfter(template, el);
    }

    el.parentNode.classList.add('hasOpenExpander');
 
    return template;
  }

  #close = function (el) {

    // remove grid item active class
    el.classList.remove('active');

    // remove expander bloc
    el.parentNode.querySelector('.'+this.options.expanderClass).remove();

    //
    el.parentNode.classList.remove('hasOpenExpander');

    // set base var
    this.clickedElement = null;
    this.expanderElement = null;

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
    if(this.#getPreviousSibling(parent, '.'+this.options.gridClass)){
      let prev = document.createElement('a');
      prev.classList.add('gridder-prev');
      prev.innerHTML = this.options.prevText;
      el.appendChild(prev);
    }

    // add next button
    if(this.#getNextSibling(parent, '.'+this.options.gridClass)){
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
        let target = this.#getNextSibling(parent, '.'+this.options.gridClass);
        if(target) {
          const event = new Event('click', {bubbles: true});
          target.dispatchEvent(event);
        }
      });
    }

    let prev = template.querySelector('.gridder-prev');
    if(prev){
      prev.addEventListener('click', () => {
        let target = this.#getPreviousSibling(parent, '.'+this.options.gridClass);
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
    
}

GridderJS.options = {};

// Returns the options for an element or undefined if none available.
GridderJS.optionsForElement = function (element) {
  // Get the `GridderJS.options.elementId` for this element if it exists
  if (element.getAttribute("id")) {
    return GridderJS.options[camelize(element.getAttribute("id"))];
  } else {
    return undefined;
  }
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

export { GridderJS };