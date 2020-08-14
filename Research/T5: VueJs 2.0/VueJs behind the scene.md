# VueJS behind the scene

## The VueJS Instance
Important Concepts:
1. We can have multiple vue instances. 
2. We can access properties from outside of the vue instances, we can even create properties for the existing vue instance, however, newly created properties will not be watched by vue framework.
3. Setters and Getters are created on creation of vue instance for it's variables.
4. Properties within a vue instance:
   1. `$el`: represent native HTML element
   2. `$data`: holds data properties, can be accessed from outside
   3. `$refs`: stores tagged native HTML element by `ref` attribute
      ```html
        <button ref="tButton">button</button>
      ```
      **Note**: `$refs` will get you the current native HTML element you need, and you can change the innerHTML or attributes all you want, however, when vue re-render this part of html, the changes you made through `$ref` will be lost. Because vue has the control over this whole vue instance, and interact with it constantly. What you got from the `$ref` is just a snapshop of current status.
5. We can creat a vue instance without `el` property to refer to an element in html, and later we can hook up with one element for vue instance. This gives us enough flexibility when creating component. (We can use `vueInstance.$mount('#app2')` to hook up.)


## Vue Component

Global Vue Component Registering
```javascript
  // will be referenced by <hello></hello> tag
  // a global component <hello> has been created by below
  Vue.component('hello', {
    template: '<h1?>Hello!</h1>',
    // data has to be a function with actual data obj returned
    data: function() {
      return {
        status: 'critical',
      };
    },
    methods: {
      ...
    }
  })
```

Locally register a component, and use it in vue instance. Other vue instance without regestering with `cmp` in components field will not have access to the component.
```javascript
  var cmp = {
    template: '<h1?>Hello!</h1>',
    data: function() {
      return {
        status: 'critical',
      };
    },
    methods: {
      ...
    }
  };
  new Vue({
    el: '#app',
    components: {
      'my-cmp': cmp,
    },
    template: '<my-cmp></my-cmp>',
  })
```


## Vue Updates DOM Mechanism

Use of Virtual DOM

Vue instance generates a virtual DOM template and compare with old virtual DOM which represents the real DOM, only change the differences in the real DOM after the comparision.

## VueJs Instance LifeCycle

* `new Vue()`
* `beforeCreate()` get called, initialize data and events
* Instance Created, `created()` gets called, compile template
* `beforeMount()` gets called, replace **el** with compiled templated
* Instance mounted to DOM
* If data changed and re-render needed, then call `beforeUpdate()` to re-render DOM
* `update()` gets called to mount updated instance to DOM
* `beforeDestroy()` gets called right befre the instance gets destroied

## Connect between Components

Important Note for passing from parent to child:
> if you are passing a primitive type: string, number, when you later change it in child component, it will **Not** reflected on the parent component.

> If you are passing a non-primitive type, like Object or Array, it is passed as a reference. That way, if you change it in child component, parent component which holds the same reference will see the updates

Properties passing from parent to child can be decalred within component `props` field:
```javascript
export default {
  props: {
    myName: {
      type: string,
      default: 'Max', // set default value for primitive type
      required: true, // can be used as a validation
    }
  }
  ...
}

export default {
  props: ['myName', 'yourNmae'....]
  ...
}

export default {
  props: {
    myName: {
      type: Object,
      default() {
        return {text: 'test-name'};
      }
    }
  }
}
```

Emits event from child to parent can use `$emit` method within vue component.
```javascript
export default {
  ...
  methods: {
    resetName() {
      this.myName = 'Nathan';
      this.$emit('nameReset', this.myName); // outside parent can listen to this `nameReset` event to update related parts
    }
  }
}
```

Usually Vue child component cannot direclty talk to sibling components, if you want to connect, below are two options you can follow:
1. Use `$emit` to have parent aware of child changes, and then binding a function to inform another child, which is the sibilng component
2. Use EventBus, which is actually a separate vue instance, you need to initiate it before your app vue instance, and use `$on` to listen to event, also `$emit` to emit event.

### Vue Component Slot
If you want to directly pass some html sections into a child component, you can use a slot:
* From Parent:
  ```html
  <my-child>
    <p slot="content">Paragraph COntent</p>
  </my-child>
  ```

* From Child:
  ```html
    <slot name="content"></slot>
    <!-- Default Slot Content will be replaced if some html content passed in from parent -->
    <slot>Default Slot Content</slot>
  ```
Use Slot to render HTML directly for Vue component, set a slot name if you want to insert multiple slot. Unnamed slot will be taking as a defult slot by VueJs.

### Vue Dynamic Component
Use `component` tag which is reserved by VueJs to dynamic load Vue component:
```html
<!-- cmpName can be binded with a Vue component name declared within `components` field -->
<component :is="cmpName"></component>
```

Use dynamic component to switch between component, the old component will be destroyed by default, and then re-render the new component. If you don't wish to destroy the old component, please use `<keep-alive></keep-alive>` tag to wrap `component` tag.

When using `keep-alive` to switch between components, we are actually calling `activated()` and `deactivated()` life hooks within Vue component.


## Vue Filters
Like Vue Component, we can also have global filters and local filters for vueJs to use:
```html
<!-- Filters can be chained together -->
{{ valToTransform | to-upper | to-lower }}
```

1. For Global Filters:
```javascript
  Vue.filters('to-upper', function(value) {
    // Put in the logic about how you want to transform the value
  });

```
2. For Local Filters:
```javascript
  export default {
    filters: {
      'to-upper': function(value) {
        // logic to transform value
      }
    }
  }
```

> Vue Does not proved any default filters, you will need to define filters if you need to use them

## Vue Mxins
Mixins is like a code snipit that we can share between components/pages

Define a mixin js file
```javascript
  export const demoMixin = {
    data() {
      return {testStr: 'test'};
    },
    computed: {
      filteredList() {
        return [];
      }
    }

  }
```

```javascript
  export default {
    mixins: [demoMixin]
  }
```