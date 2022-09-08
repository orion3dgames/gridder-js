# GridderJS 2.0.0  <a href='https://ko-fi.com/A748382' target='_blank'><img height='32' style='border:0px;height:32px;float: right;' src='https://az743702.vo.msecnd.net/cdn/kofi1.png?v=a' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a> [![unheap](https://img.shields.io/badge/Featured%20on-Unheap-orange.svg)](https://www.unheap.com/media/galleries/gridder/) [![CDNJS version](https://img.shields.io/cdnjs/v/gridder.svg)](https://cdnjs.com/libraries/gridder)

<img width="480" height="305" src='https://i.giphy.com/xT8qBaPahUIhtN9HwI.gif' border='0' alt='Gridder Example' />
=======

### A JS plugin that displays a thumbnail grid expanding preview similar to the effect seen on Google Images.

We have all searched images on Google, so you probably noticed the interesting expanding preview when you click on a thumbnail. It’s a very nice effect and practical, allowing you quickly see more details without having to reload a new page. This plugin allows you to recreate a similar effect on a thumbnail grid. The idea is to open a preview when clicking on a thumbnail and to show a larger image and some other content like a title, a description and a link

- Demo GridderJS : https://oriongunning.github.io/gridder-js/

=======

### FEATURES
- Multiple instances
- Really easy to use and customize
- Expanding preview with details
- Smooth Scrolling
- Callbacks (so you can launch other plugins)

=======

## Usage

1. Include plugin's code:

	```html
	<script src="index.js"></script>
	```

3. HTML

    ```html
    
    <!-- Gridder navigation -->
    <div class="gridder">
       <!-- You can load specify which content is loaded by specifying the #ID of the div where the content is  -->
       <div class="gridder-list" data-target="content1"></div>
       <div class="gridder-list" data-target="content2"></div>
       <div class="gridder-list" data-target="content3"></div>
       <div class="gridder-list" data-target="content4"></div>
       <div class="gridder-list" data-target="content5"></div>
       <div class="gridder-list" data-target="content6"></div>
    </div>

    <!-- Gridder content -->
    <div id="content1" style="display:none"> Content 1 goes here... </div>
    <div id="content2" style="display:none"> Content 2 goes here... </div>
    <div id="content3" style="display:none"> Content 3 goes here... </div>
    <div id="content4" style="display:none"> Content 4 goes here... </div>
    <div id="content5" style="display:none"> Content 5 goes here... </div>
    <div id="content6" style="display:none"> Content 6 goes here... </div>

    ```

3. Call the plugin:

    ```javascript
    <script>
    	// Instantiate the plugin
          new GridderJS('.gridder', {
            'columns': 3,
            'scrollOffset': 50,
            'debug': true
          });
    </script>
    ```

<a rel="license" href="https://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.


