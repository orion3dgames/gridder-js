/*!
 * Revealing Constructor Pattern Boilerplate
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 */
var GridderJS = (function () {

  'use strict';

  /**
   * Create the Constructor object
   */
  var Constructor = function (target, options = {
    scrollOffset: 30,
    columns: 4,
    debug: false,
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
     * A private method
     */
    const init = function () {

      let nodes = document.querySelectorAll(target);

      debug.log(pluginTitle+' Initializing '+nodes.length+' instance(s)', nodes[i], options);

      for (var i = 0; i < nodes.length; i++) {

        let parentGrid = nodes[i];

        // init gridder style and css
        parentGrid.style.display = 'grid';
        parentGrid.style.gridTemplateColumns = 'repeat('+options.columns+', 1fr)';
        parentGrid.style.gridAutoFlow = 'row dense';
        parentGrid.style.gap = '20px';

        // init events
        let ul = parentGrid.querySelectorAll("."+gridClass);
        ul.forEach(li => {
          li.addEventListener('click', (e) => {
            open(e);
          });
        });

      }
    };

    /**
     * Open expander
     * @param e
     */
    const open = function (e) {

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

      // get expander content
      let target = el.dataset.target;
      let targetElement = document.getElementById(target);

      // create navigation
      let gridderNavigation = createNavigationElements();

      // create content
      let gridderContent = document.createElement('div');
      gridderContent.classList.add('gridder-content');
      gridderContent.innerHTML = targetElement.innerHTML.trim();

      // create expander
      let template = document.createElement('div');
      template.appendChild(gridderNavigation);
      template.appendChild(gridderContent);

      // style expander
      template.classList.add(expanderClass);
      template.style.gridColumn = '1 / span '+options.columns;

      // insert expander
      insertAfter(template, el);

      // scroll into view
      template.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});

      ///////////////////////////
      // add navigation events

      template.querySelector('.gridder-close').addEventListener('click', () => {
        close(el);
      });

      template.querySelector('.gridder-next').addEventListener('click', () => {
        let target = getNextSibling(el, '.'+gridClass);
        if(target) {
          const event = new Event('click', {bubbles: true});
          target.dispatchEvent(event);
        }
      });

      template.querySelector('.gridder-prev').addEventListener('click', () => {
        let target = getPreviousSibling(el, '.'+gridClass);
        if(target) {
          const event = new Event('click', {bubbles: true});
          target.dispatchEvent(event);
        }
      });

    }

    const close = function (el) {
      el.classList.remove('active');
      el.parentNode.querySelector('.'+expanderClass).remove();
    }

    const createNavigationElements = function () {

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

    function insertAfter(newNode, existingNode) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

    var getNextSibling = function (elem, selector) {

      // Get the next sibling element
      var sibling = elem.nextElementSibling;

      // If there's no selector, return the first sibling
      if (!selector) return sibling;

      // If the sibling matches our selector, use it
      // If not, jump to the next sibling and continue the loop
      while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling
      }

    };

    var getPreviousSibling = function (elem, selector) {

      // Get the next sibling element
      var sibling = elem.previousElementSibling;

      // If there's no selector, return the first sibling
      if (!selector) return sibling;

      // If the sibling matches our selector, use it
      // If not, jump to the next sibling and continue the loop
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