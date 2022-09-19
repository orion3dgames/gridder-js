# GridderJS

> **⚠ WARNING**: This plugin is in heavy development, use with caution!
---

### A JS plugin that displays a thumbnail grid expanding preview similar to the effect seen on Google Images.

We have all searched images on Google, so you probably noticed the interesting expanding preview when you click on a thumbnail. It’s a very nice effect and practical, allowing you quickly see more details without having to reload a new page. This plugin allows you to recreate a similar effect on a thumbnail grid. The idea is to open a preview when clicking on a thumbnail and to show a larger image and some other content like a title, a description and a link

***

## Features
- Multiple instances
- Really easy to use and customize with CSS & HTML
- Expanding preview with static content or dynamic (fetch) content
- Smooth Scrolling
- Old / new google images display (expander underneath grid or as a sidebard on the right hand side)
- Lightweight (10kb gzipped)

***

## Options
- [⚙️ `src/options.js`](https://github.com/oriongunning/gridder-js/blob/main/src/options.js)
  for all available options

***

## Quickstart

Install:

```bash
$ npm install --save gridder-js
# or with yarn:
$ yarn add gridder-js
```

Use as **ES6 module** (recommended):

```js
import { GridderJS } from "gridder-js";
const gridder = new GridderJS("div#myId", {
    columns: 4,
    gap: 15
  });
```

or use as **CommonJS module**:

```js
const { GridderJS } = require("gridder-js");
const gridder = new GridderJS("div#myId", {
    columns: 4,
    gap: 15
  });
```

Not using a package manager or bundler?:

```js
<script src="https://unpkg.com/gridder-js@latest/dist/gridder-js-min.js"></script>
```

1. HTML

    ```html
    
    <!-- Gridder navigation -->
    <div class="gridder" id="myId">
      <div class="gridder-list">
       <!-- You can load specify which content is loaded by specifying the #ID of the div where the content is  -->
       <div data-target="content1"></div>
       <div data-target="content2"></div>
       <div data-target="content3"></div>
       <div data-target="content4"></div>
       <div data-target="content5"></div>
       <div data-target="content6"></div>

       <!-- You can specify data-url to load ajax content using fetch -->
       <div :data-url="'content.html'"></div>
      </div>
    </div>

    <!-- Gridder content -->
    <div id="content1" style="display:none"> Content 1 goes here... </div>
    <div id="content2" style="display:none"> Content 2 goes here... </div>
    <div id="content3" style="display:none"> Content 3 goes here... </div>
    <div id="content4" style="display:none"> Content 4 goes here... </div>
    <div id="content5" style="display:none"> Content 5 goes here... </div>
    <div id="content6" style="display:none"> Content 6 goes here... </div>

    ```

2. Call the plugin:

    ```javascript
    <script>
    	// Instantiate the plugin
      new GridderJS('.gridder', {
        columns: 4,
        gap: 15
      });
    </script>
    ```

***

<a rel="license" href="https://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.


