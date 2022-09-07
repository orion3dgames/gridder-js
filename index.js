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

      // if same grid item is selected, close it
      if(el.classList.contains('active')){
        debug.log('already active', e);
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

    }

    const close = function (el) {

      el.classList.remove('active');

      el.parentNode.querySelector('.'+expanderClass).remove();

    }

    function createNavigationElements() {
      let close = document.createElement('a');
      close.classList.add('gridder-close');
      close.innerHTML = "Close";
      let el = document.createElement('div');
      el.classList.add('gridder-navigation');
      el.appendChild(close);
      return el;
    }

    function insertAfter(newNode, existingNode) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

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