let defaultOptions = {

    /*
    // expander placement
    'bottom' is how google use to do
    'right' is how google images does now
    */
    display: 'bottom',

    // number of columns
    columns: 8,
  
    // the gap between the columns
    gap: 20,

    /*
    // breakpoints responsive
    // must be from highest to lowest width
    example:
    breakpoints: {
        960: {
            columns: 4,
            gap: 15,
        },
        700: {
            columns: 3,
            gap: 5,
        },
        400: {
            columns: 2,
            gap: 5,
            display: 'bottom',
        }
    },
    */
    breakpoints: {},
  
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
    openExpanderClass: "gridder-open",

    // Called when gridder instance is ready
    init() {},
  
    // Called when gridder instance is open
    // you can access: 
    // this.clickedElement
    // this.expanderElement
    open() {},
  
    // Called when gridder expander is closed
    close() {},
  
  }

  export default defaultOptions;