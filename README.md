ree.js
======

#### Framework for building 3D application architecture ####

The goal of this project is to provide a framework for building complex 3D applications such as CAD and 3D animation tools. It relies on [three.js](https://github.com/mrdoob/three.js/) and it is heavily inspired by [Polymer.js](https://github.com/Polymer/polymer/).

---

### Motivation ###

Building complex software such as computer graphics tools has always been a challenge with web technology. Libraries such as [three.js](https://github.com/mrdoob/three.js/) solve some of the big problems around the complexity of [WebGL](https://www.khronos.org/webgl/) API. However, building complex and articulated applications is still an unsolved problem. This framework is an attempt to solve it.

### Origin ###

The core ideas in this framework originate from attempts to build complex 3D applications using [Polymer.js](https://github.com/Polymer/polymer/) and [custom elements](http://w3c.github.io/webcomponents/spec/custom/). Hierarchical DOM-based application model works great for the UI and promotes good practices such as modularization and reusability. On the other hand, application logic very often needs to break out from the DOM structure and imposing this structure on logic often results in higher complexity. This framework takes some concepts from custom elements and mixes it with common JavaScript techniques. The resulting architecture pattern sits somewhere between object oriented, DOM-based and component-entity-systems and provides a simple data binding interface to DOM-based UI.

### Core Concepts ###

The core concept of this framework is embodied in [REE.Element](https://github.com/arodic/ree.js/blob/master/src/core/Element.js) class. It is essentially a JavaScript object/entity with data binding, event system, and type checking for it's properties. Additionally, if `uuid` property is set, the objects have the ability to persist property values between browsing sessions. Data binding can be expressed both imperatively and declaratively. Events propagate through complex element hierarchies the same way they propagate in DOM. Property persistence is currently only supported with localStorage and basic data types.

### Usage ###

REE provides a simple way to create hierarchically composable JavaScript Elements with features such as
data binding (declarative and imperative), events, listeners and well as type checking.
It is inspired by Polymer.js and intended to be used with custom (Polymer) elements.

###### Basic Example ######

Here is the simplest way to define `REE.MyElement` with property called `myProp`:

```javascript
REE.MyElement = function(config) {

  REE.call(this, config);

  this.registerProperties({
    myProp: {}
  });

};

REE.create(REE.MyElement);
```
then you can create instances and assign values in the constructor.

```javascript
var myElementInstance = new REE.MyElement({myProp: 'hello world'})

```


###### Properties ######

Similarly to Polymer.js, you can configure property type, observers and more.

```javascript
myProp: {
  value: 1337, // default value.
  type: Number, // strict type.
  observer: '_myPropChanged', // change observer function.
  writable: false, // make property read-only.
  persist: true, // persist value in localStorage.
  enumerable: false, // make non-enumerable.
  notify: true // fire 'myProp-changed' event on change.
}
```

All of the above configurations are optional. `persist` will work only if `uuid` property is set on corresponding element instance.

###### Data Binding ######

Imperative data binding uses the same syntax as Polymer (0.5). If both source and target elements have the property value defined, the target will have the property assigned from the source.

```javascript
myElement.bindProperty('myProp', otherElement, 'otherProp');
```

For declarative data binding, simply pass `[elementInstance, propertyName]` array to the property in the constructor. For example:

```javascript
var myElementInstance = new REE.MyElement({
  myProp: [otherElement, 'otherProp']
});

```

###### Events ######

If `notify` flag is set, property element instance will fire `[property-name]-changed` event. The event will also fire if property has been bound. Note that camelCase names are converted to dash-notation for event names.

```javascript
myElementInstance.addEventListener('my-prop-changed', function(event){
  console.log(event);
});
```

Deep bubbling events path prefix is added using dot notation. You can also catch multiple events using wildcards.

```javascript
myElementInstance.addEventListener('myProp.*-changed', function(event){
  console.log('Changed key is:' event.key);
  console.log('Old value is:' event.oldValue);
  console.log('New value is:' event.value);
  console.log('event type is:' event.type);
});
```
