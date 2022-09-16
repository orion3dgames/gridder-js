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

    // elements classes
    gridClass: "gridder-list",
    expanderClass: "gridder-show",

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