carbon.js
=========

#### A Lightweight library for hierarchically composable JavaScript Elements ####

The goal of this project is to enable Polymer-like application architecture without the weight and constraints of DOM. It is heavily inspired by [Polymer.js](https://github.com/Polymer/polymer/).

---

### Origin ###

The core ideas in this library originate from attempts to build complex applications using [Polymer.js](https://github.com/Polymer/polymer/) and [custom elements](http://w3c.github.io/webcomponents/spec/custom/). Hierarchical DOM-based application model works great for the UI and promotes good practices such as modularization and reusability. However, application logic very often needs to break out from the DOM structure and building it with DOM often results in higher complexity. This library takes some concepts from custom elements and mixes it with common JavaScript techniques. The resulting architecture pattern sits somewhere between object oriented and DOM-based and provides a simple data binding interface to DOM-based UI.

### Core Concepts ###

The core concept of this library is embodied in [Carbon.Element](https://github.com/arodic/carbon.js/blob/dev/src/element.js) class. It is essentially a JavaScript object with data binding, event system, and type checking for its properties. Additionally, if `uuid` property is set, the objects have the ability to persist property values between browsing sessions. Data binding can be expressed both imperatively and declaratively. Events propagate through complex element hierarchies the same way they propagate in DOM.

### Usage ###

Carbon.js provides a simple way to create hierarchically composable JavaScript Elements with features such as
data binding (declarative and imperative), events and type checking.
It is inspired by Polymer.js and intended to be used with Polymer elements.

##### Basic Example #####

Here is the simplest way to define `Carbon.MyElement` with property called `myProp`:

```javascript
Carbon.MyElement = function(config) {

  Carbon.call(this, config);

  this.registerProperties({
    myProp: {}
  });

};

Carbon.create(Carbon.MyElement);
```

Then you can create instances and assign values in the constructor.


```javascript
var myElementInstance = new Carbon.MyElement({myProp: 'hello world'})

```


##### Properties #####

Similarly to Polymer.js, you can configure property type, observers and more.

```javascript
myProp: {
  value: 1337, // default value.
  type: Number, // strict type.
  observer: '_myPropChanged', // change observer function.
  writable: false, // makes property read-only.
  persist: true, // persist value in localStorage.
  enumerable: false, // make non-enumerable.
  notify: true // fire 'my-prop-changed' event on change.
}
```

All of the above configurations are optional. `persist` will work only if `uuid` property is set on corresponding element instance.

##### Data Binding #####

Imperative data binding uses the same syntax as Polymer (0.5) and it should work with Polymer elements as targets.

```javascript
myElement.bindProperty('myProp', otherElement, 'otherProp');
```

For declarative data binding, simply pass `[elementInstance, propertyName]` array to the property in the constructor. For example:

```javascript
var myElementInstance = new Carbon.MyElement({
  myProp: [otherElement, 'otherProp']
});

```

##### Events #####

If `notify` flag is set, property element instance will fire `[property-name]-changed` event. The event will also fire if property has been bound. Note that camelCase names are converted to dash-notation for event names.

```javascript
myElementInstance.addEventListener('my-prop-changed', function(event){
  console.log(event);
});
```

Deep events are prefixed using dot notation. You can also catch multiple events using wildcards.

```javascript
myElementInstance.addEventListener('myProp.*-changed', function(event){
  console.log('Changed key is:' event.key);
  console.log('Old value is:' event.oldValue);
  console.log('New value is:' event.value);
  console.log('event type is:' event.type);
});
```
