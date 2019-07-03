One PubSub: A Declarative PubSub Library for Lightning Web Component and Aura Component
-------------

<div align="center">
  <img alt="One Pub Sub"
       src="https://raw.githubusercontent.com/TheVishnuKumar/one-pub-sub-lwc/master/one%20pub%20sub.png">
</div>
<br/>
<a href="https://githubsfdeploy.herokuapp.com?owner=TheVishnuKumar&repo=one-pub-sub-lwc">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

Blog: <a href="http://www.0to1code.com/one-pubsub-a-pubsub-library-for-lightning-web-component-and-aura-component/">http://www.0to1code.com/one-pubsub-a-pubsub-library-for-lightning-web-component-and-aura-component/</a>

Features
-------------
- Subscribe and handle PubSub events **declaratively**.
- **namespace** to define the group the events.
- **namespace** based publisher to publish a group of events based on the namespace.
- **pagereference** to consider the event basis on the current page reference.
- Fire the event using **timeout**. This will allows you to perform the action on after defined timeframe.
- One framework for PubSub that works in both **LWC and Aura Component**.
- Reduces code errors.
- **Uniformity** across the LWC and Aura Components to use the PubSub events.
- The pattern of use is quite the same as the Aura Component events. Easy for the Aura Component Developers.

Documentation
-------------
**One Library:** This is a PubSub library to fire and handle events. It is a single solution that can be used in LWC and Aura when it comes to PubSub. It allows you to send and receive an event from:
1. LWC to LWC
2. LWC to Aura
3. Aura to LWC
4. Aura to Aura

The uniformity of using the one library allows you to write the code less error-prone.

**Register Event:**

A. Registering event in Aura Component:<br/>
```html
<c:registerEvent name="EVENT_NAME" namespace="astro" aura:id="first-event" timeout=1000 pagereference="true"></c:registerEvent>
```

B. Registering event in LWC:<br/>
```html
<c-register-event name="EVENT_NAME" namespace="astro" class="first-event" timeout=1000 pagereference="true"></c-register-event>
```

**Handling Events:**

A. Handling event in Aura Component:<br/>
```html
<c:handleEvent name="EVENT_NAME" namespace="astro" onaction="{!c.handleEvent}" pagereference="true"></c:handleEvent>
```

B. Handling event in LWC:<br/>
```html
c-handle-event name="EVENT_NAME" namespace="astro" class="event-class" onaction={handleEvent} pagereference="true"></c-handle-event>
```

Attributes
----------
This component has three types of attributes.
1. **name**: This is the required attribute. Define the name of the PubSub event to subscribe and fire.

2. **namespace**: This is an optional attribute. It does allow you to bundle the events for a particular feature/module.<br/>
Ex: If you have 6 components on the same screen and 3 - 3 components are related to some functionality. You can separate them using the namespace. You can have 'refresh-list' event name in both the module.
It also allows publishing event basis on the namespace. All of the events that are in the same namespace will be published.

3. **timeout**: This is an optional attribute. The supported type is number and it does take input of milliseconds. If this is defined then the event will be fired after the defined milliseconds in the timeout. It can also be modified on the runtime in the code.
Ex:
```javascript
3.1)LWC: 
let pubsubCmp = this.template.querySelector('.CLASS_NAME');
pubsubCmp.timeout = 5000;
pubsubCmp.publish('Fired Event from LWC.')
```

```javascript
3.2) Aura: 
let pubsubCmp = component.find("AURA_ID");
pubsubCmp.timeout = 5000;
pubsubCmp.publish('Fired Event from Aura Component.');
```

4. **pagereference**: This is an optional attribute. If this is true then register and handlers both respect the current page reference. If this is being used then make sure that bot register and handler should have this property marked as true.

Events
------
This component has one type of event.
1. **onaction**: This event fire when any subscribed event received. It returns the data that is passed in the event firing.
You can get payload from this:
```javascript
1.1) LWC: event.detail.payload;
1.2) Aura: event.getParam('payload');
```

Methods
----------
This component three types of method that you can use to fire, register and unregister the PubSub event.
1. **publish()**: It will fire the pubsub event. It does also accept the data. You can fire the event:
```javascript
1.1) LWC: this.template.querySelector('.CLASS_NAME').fire('Fired Event from LWC.');
1.2) Aura: component.find("AURA_ID").fire('Fired Event from Aura Component.');
```

2. **publishToNamespace()**: It will fire the pubsub event for all the evenet that comes in the specified namespace. It does also accept the data. You can fire the event:
```javascript
1.1) LWC: this.template.querySelector('.CLASS_NAME').fireWithNamespace('Fired All Events from LWC.');
1.2) Aura: component.find("AURA_ID").fireWithNamespace('Fired All Events from Aura Component.');
```

3. **subscribe()**: It will subscribe the pubsub event. You can subscribe the event:
```javascript
2.1) LWC: this.template.querySelector('.CLASS_NAME').subscribe();
2.2) Aura: component.find("AURA_ID").subscribe();
```

4. **unregister()**: It will unsubscribe the pubsub event. You can unsubscribe the event:
```javascript
3.1) LWC: this.template.querySelector('.CLASS_NAME').unsubscribe();
3.2) Aura: component.find("AURA_ID").unsubscribe();
```

**Want to contribute?** Fork the repo and create the pull request.

Code on  <a href="https://gist.github.com/TheVishnuKumar/2f7fb4c8dba46142e14342391c56661c">gist</a>

Release
-------------
v1.0: Initial Release

v1.1: 
1. Added register api
1. Added unregister api

v1.2: 
1. Added timeout event firing. Fire an event after a defined time.

v1.3
1. Renamed all the components to provide Aura Component alike syntax.
2. publishToNamespace method to fire all the events that are using the specified namespace.
3. Added Page Reference property to respect the current page reference while publishing and handling the events. 
