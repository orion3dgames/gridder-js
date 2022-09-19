let defaultOptions = {

    // expander placement
    // 'right' option is a work in progress
    display: 'bottom', // 'bottom' or 'right' are available

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