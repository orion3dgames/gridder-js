GridderJS = (function () {

  'use strict';

  /**
   * Create the Constructor object
   */
  var Constructor = function (target, options = {

    // number of columns
    columns: 4,

    // the gap between the columns
    gap: 20,

    // activate debug logging
    debug: false,

    // Called when gridder instance is ready
    onStart: function(){},

    // Called when gridder instance is open
    onOpen: function(){},

    // Called when gridder expander is closed
    onClose: function(){},

}) {  

    //
    // Variables
    // 
    var publicAPIs = {};
    var pluginTitle = "GridderJS";
    var expanderClass = "gridder-show";
    var gridClass = "gridder-list";

    //
    // Methods
    //

    /**
     * Inititalize gridder instances
     */
    var init = function () {

      let nodes = document.querySelectorAll(target);

      debug.log(pluginTitle+' Initializing '+nodes.length+' instance(s)ssssssssssssss', options);

      for (var i = 0; i < nodes.length; i++) {

        let parentGrid = nodes[i];

        // init gridder style and css
        parentGrid.style.display = 'grid';
        parentGrid.style.gridTemplateColumns = 'repeat('+options.columns+', 1fr)';
        parentGrid.style.gridAutoFlow = 'row dense';
        parentGrid.style.gap = options.gap+'px';

        // init events
        let ul = parentGrid.querySelectorAll("."+gridClass);
        ul.forEach(li => {
          li.addEventListener('click', (e) => {
            open(e);
          });
        });

        // start callback
        if (typeof(options.onStart) === "function") {
          options.onStart(parentGrid);
        }


      }
    };

    /**
     * Open expander
     * @param e
     */
    var open = async function (e) {

      debug.log(' Clicked grid item', e);

      let el = e.target;

      // make sure we have the grid item
      if(!el.classList.contains('active')){
        el = el.closest('.'+gridClass);
      }

      // if same grid item is selected, close it
      if(el.classList.contains('active')){
        close(el);  
        return false;
      }
      
      // then set all as inactive and activate clicked grid item
      el.parentNode.querySelectorAll('.'+gridClass).forEach( div => {
        div.classList.remove('active');
      });
      el.classList.add('active');

      // close expander first if open
      let existingExpander = el.parentNode.querySelector('.'+expanderClass);
      if(existingExpander){
        existingExpander.remove();
      }

      // insert expander
      let template = insertExpander(el);

      // get expander content
      const innerHtml = await getExpanderContent(el);

      // create navigation
      let gridderNavigation = createNavigationElements();

      // create content
      let gridderContent = document.createElement('div');
      gridderContent.classList.add('gridder-content');
      gridderContent.innerHTML = innerHtml;

      // append content
      template.innerHTML = "";
      template.appendChild(gridderNavigation);
      template.appendChild(gridderContent);

      // initialize navigation events
      initializeNavigationEvents(template, el);

      // open expander callback
      if (typeof(options.onOpen) === "function") {
        options.onOpen(template);
      }

    }

    var insertExpander = function (el) {

      // create expander
      let template = document.createElement('div');

      // style expander
      template.classList.add(expanderClass);
      template.style.gridColumn = '1 / span '+options.columns;
      template.innerHTML = "Loading...";

      // insert expander
      insertAfter(template, el);

      // scroll into view
      template.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});

      return template;
    }

    var close = function (el) {

      // remove grid item active class
      el.classList.remove('active');

      // remove expander bloc
      el.parentNode.querySelector('.'+expanderClass).remove();

      // close expander callback
      if (typeof(options.onClose) === "function") {
        options.onClose();
      }

    }

    var getExpanderContent = async function (el) {

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

    var createNavigationElements = function () {

      // add close button
      let close = document.createElement('a');
      close.classList.add('gridder-close');
      close.innerHTML = "Close";

      // add prev button
      let prev = document.createElement('a');
      prev.classList.add('gridder-prev');
      prev.innerHTML = "Previous";

      // add next button
      let next = document.createElement('a');
      next.classList.add('gridder-next');
      next.innerHTML = "Next";

      // create navigation container
      let el = document.createElement('div');
      el.classList.add('gridder-navigation');

      // put everything together
      el.appendChild(prev);
      el.appendChild(next);
      el.appendChild(close);

      return el;
    }

    var initializeNavigationEvents = function(template, parent) {

      template.querySelector('.gridder-close').addEventListener('click', () => {
        close(parent);
      });

      template.querySelector('.gridder-next').addEventListener('click', () => {
        let target = getNextSibling(parent, '.'+gridClass);
        if(target) {
          const event = new Event('click', {bubbles: true});
          target.dispatchEvent(event);
        }
      });

      template.querySelector('.gridder-prev').addEventListener('click', () => {
        let target = getPreviousSibling(parent, '.'+gridClass);
        if(target) {
          const event = new Event('click', {bubbles: true});
          target.dispatchEvent(event);
        }
      });

    }

    var insertAfter = function(newNode, existingNode) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

    var getNextSibling = function (elem, selector) {
      var sibling = elem.nextElementSibling;
      if (!selector) return sibling;
      while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling
      }
    };

    var getPreviousSibling = function (elem, selector) {
      var sibling = elem.previousElementSibling;
      if (!selector) return sibling;
      while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.previousElementSibling;
      }
    };

    var debug = (function () {
      return {
        log: function() {
          if(!options.debug) return false
          var args = Array.prototype.slice.call(arguments);
          console.log.apply(console, args);
        },
      }
    }());

    /**
     * A public method
     */
    publicAPIs.doSomething = function () {
      // Code goes here...
    };

    //
    // Init
    //
    init(document.querySelectorAll(target));

    //
    // Return the Public APIs
    //

    return publicAPIs;

  };


  //
  // Return the Constructor
  //

  return Constructor;

})();