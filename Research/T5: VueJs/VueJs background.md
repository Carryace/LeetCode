# VueJs Background

Extremely lean framework, around 16Kb...

Fast, better performance which beats Angular and React


## VueJs Basic Setup

Follow the guidline from [VueJs installation](https://vuejs.org/v2/guide/installation.html), we have below options:

1. Download VueJs dev mode or prod mode and include the assets
2. Directly use CDN script
3. Install it through NPM: `$ npm install vue`

## VueJs framework basics

### Vue Instance

Each VueJs app has a VuewJs instance to control the application, both from the data side and from the logic method/functions side. To create a new vue instance:

```javascript
new Vue({
  el: '#app', // link to the id of the container element
  data: {
    // stores data that can be directly used by template or functions
    title: 'Hello title', 
    counter: 0,
  },
  methods: {
    // getter methods that will be executed everytime Vue instance re-renders
    testFn: function() {
      return `Title: ${this.title}`;
    },
  },
  computed: {
    // getter methods only run when related variable updated or rendered, can be directly used as property in template instead of function
    reverseMsg: function() {
      return this.title.split('').reverse().join();
    },
  },
  watch: {
    // Do async property changes
    counter: function(value) {
      var vm = this;
      setTimeout(function() {
        vm.counter = 0;
      }, 2000);
    }
  }
})
```

### Vue Template and Directives

To hook up with view methods from template, we can start to use vue directives to bind the data or method:

* `v-on`: Can be bind with DOM events such as `v-on:click`, they can be assigned with a function with `$event` parameter to get the default DOM Event Object. Abbrivation as `@`, for example: `@click`
  * `v-on:mousemove`
  * `v-on:click`
  * `v-on:keyup`
* `v-once`: to bind with initial value, and will not be re-rendered
* `v-html`: to bind with innerHTML variable and not show it as normal string
* `v-bind`: To bind with DOM native attributes. Abbrivation as `:`, for exmpale: `:href`.
  * `v-bind:href`
  * `v-bind:src`
* `v-model`: set up two way data bindings between html element and vue variable

Event Modifier: `stop`, `prevent` (can be chained) 
Can be used with vue directives, and passed into directive as a parameter to stop propagation or prevent default behavior: `v-on:mousemove.stop`, `v-on:mousemove.prevent`...

Key Modifier: `enter`, `space` (can be chained)

### Dynamic Styling

#### Dynamic Styling with classes
1. Directly specify in `:class`
   ```html
    <div :class="{red: isRed}"></div>
    ```

2. Bind it directly with properties from `computed` field for vue instance:
    ```html
    <div :class="divClasses"></div>
    ```
    ```javascript
    new Vue({
      ...
      computed: {
        divClasses: function() {
          return {
            red: this.isRed,
          }
        }
      }
    })
    ```

3. Set classes as an array
    ```html
    <div :class="[color, {red: isRed}]"></div>
    ```
    **Note**: `color` can be set as a string property from vue instance

#### Dynamic Styling without classes
1. Directly specify in `:class`
   ```html
    <div :style="{backgroundColor: color}"></div>
    ```

2. Set styling object from computed attributes:
    ```html
    <div :style="divStyles"></div>
    ```
    ```javascript
    new Vue({
      ...
      computed: {
        divStyles: function() {
          return {
            width: this.width + 'px',
            backgroundColor: this.color,
          }
        }
      }
    })
    ```

3. Set styling array
    ```html
    <div :style="[divStyles, {height: width + 'px'}]"></div>
    ```
    ```javascript
    new Vue({
      ...
      computed: {
        divStyles: function() {
          return {
            backgroundColor: this.color,
          }
        }
      }
    })
    ```

### Vue Conditionals and List Rendering

#### Vue Conditionals:

* `v-if` can be used to attach or dettach the html element from our DOM, it is not just hide and show, it completely attach or remove the complete nested element from our HTML.
  * `v-else` can be used after `v-if`
  * `v-else-if` (for Vue.js 2.1 or higher)
* `v-show` can be used to hide or show, it sets the `display: none` to the element if it is set to false
* `template` can also be used for conditional showing/hiding, just to group multiple elements together to hide or show. It will **NOT** create any additional div or template tag within HTML.
  ```html
  <template v-if="show">
    <p>Within a template</p>
  </template>
  ```

#### Vue List Rendering:

`v-for` is for rendering the list, it is also available with `template` element. `v-for` also able to loop for properties within an object.
```html
<div v-for="(item, i) in list" :key="i">{{ item }} ({{ i }})</div>
<div v-for="(value, key, index) in obj">{{ value }} ({{ key }})</div>
```

Loop through a list of numbers:
```html
<li v-for="n in 10">{{ n }}</li>
```