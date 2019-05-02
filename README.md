One PubSub: A Declarative PubSub Library for Lightning Web Component and Aura Component
-------------

<div align="center">
  <img alt="One Pub Sub"
       src="https://raw.githubusercontent.com/TheVishnuKumar/one-pub-sub-lwc/master/one%20pub%20sub.png">
</div>

<a href="https://githubsfdeploy.herokuapp.com?owner=TheVishnuKumar&repo=one-pub-sub-lwc">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

Blog: <a href="http://www.0to1code.com/one-pubsub-a-pubsub-library-for-lightning-web-component-and-aura-component/">http://www.0to1code.com/one-pubsub-a-pubsub-library-for-lightning-web-component-and-aura-component/</a>

Features
-------------
- Subscribe and handle PubSub events using **declaratively**.
- One framework for PubSub that works in both **LWC and Aura Component**.
- Reduces code errors.
- **Uniformity** across the LWC and Aura Components to use the PubSub events.
- Use **namespace** to define the group the events.
- The pattern of use is quite the same as the Aura Component events. Easy for the Aura Component Developers.
- Fire the event using **timeout**. This will allows your perform the action on after defined timeframe.
- **Future Release** More features will be here.


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
<c:one_register_event name="EVENT_NAME" namespace="astro" aura:id="first-event" timeout=1000></c:one_register_event>
```

B. Registering event in LWC:<br/>
```html
<c-one_register_event name="EVENT_NAME" namespace="astro" class="first-event" timeout=1000></c-one_register_event>
```

**Handling Events:**

A. Handling event in Aura Component:<br/>
```html
<c:one_event_handler name="EVENT_NAME" namespace="astro" onaction="{!c.handleEvent}"></c:one_event_handler>
```

B. Handling event in LWC:<br/>
```html
<c-one_event_handler name="EVENT_NAME" namespace="astro" onaction={handleEvent}></c-one_event_handler>
```

Attributes
----------
This component has three types of attributes.
1. **name**: This is the required attribute. Define the name of the PubSub event to subscribe and fire.

2. **namespace**: This is an optional attribute. It does allow you to bundle the events for a particular feature/module.<br/>
Ex: If you have 6 components on the same screen and 3 - 3 components are related to some functionality. You can separate them using the namespace. You can have 'refresh-list' event name in both the module.

3. **timeout**: This is an optional attribute. The supported type is number and it does take input of milliseconds. If this is defined then the event will be fired after the defined milliseconds in the timeout.
Ex:
```javascript
3.1)LWC: 
let pubsubCmp = this.template.querySelector('.CLASS_NAME');
pubsubCmp.timeout = 5000;
pubsubCmp.fire('Fired Event from LWC.')
```

```javascript
3.2) Aura: 
let pubsubCmp = component.find("AURA_ID");
pubsubCmp.timeout = 5000;
pubsubCmp.fire('Fired Event from Aura Component.');
```

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
1. **fire()**: It will fire the pubsub event. It does also accept the data. You can fire the event:
```javascript
1.1) LWC: this.template.querySelector('.CLASS_NAME').fire('Fired Event from LWC.');
1.2) Aura: component.find("AURA_ID").fire('Fired Event from Aura Component.');
```

2. **register()**: It will register the pubsub event. You can register the event:
```javascript
2.1) LWC: this.template.querySelector('.CLASS_NAME').register();
2.2) Aura: component.find("AURA_ID").register();
```

3. **unregister()**: It will unregister the pubsub event. You can unregister the event:
```javascript
3.1) LWC: this.template.querySelector('.CLASS_NAME').unregister();
3.2) Aura: component.find("AURA_ID").unregister();
```

One PubSub Flow
----------
<div align="center">
<img alt="One PubSub for Lightning Web Component and Lightning Component"
       src="https://raw.githubusercontent.com/TheVishnuKumar/one-pub-sub-lwc/master/One%20PubSub.jpg">
</div>

**Want to contribute?** Fork the repo and create the pull request.

Example
-------------
We are having four components here for the demo. Two are LWC and two are Aura Component. These components will be firing events and the handling event.

**Step 1.** Create demo_component_1 lightning web component. This component is firing the event.
```html
<template>
    <div style="padding: 20px;background: white;margin: 10px;border-radius: 4px;height: 120px;">
        <h1 style="font-size: 15px;">LWC Component: Firing Event</h1>
        
        <!--Registering the event-->
        <c-one_register_event name="testevent" namespace="astro" class="first-event"></c-one_register_event>
        
        <!--Firing the event in the fireEvent method-->
        <lightning-button label="Fire Event From LWC" onclick={fireEvent}></lightning-button>
    </div>
</template>
```

```javascript
import { LightningElement } from 'lwc';
export default class Demo_component_1 extends LightningElement {
    
    fireEvent(){
        //Getting the component using querySelector then firing the event using fire() method.
        this.template.querySelector('.first-event').fire('Fired Event from LWC.');
        
        /*
        You can use this way as well.
        let firstEvent = this.template.querySelector('.first-event');
        firstEvent.fire('Fired Event from LWC.');
        */
    }
}
```

**Step 2.** Create demo_component_2 lightning web component. This component is handling the event.
```html
<template>
    <div style="padding: 20px;background: white;margin: 10px;border-radius: 4px;height: 120px;">
        <h1 style="font-size: 15px;">LWC Component: Handling Event</h1>
        
        <!--Handling the event using onaction event-->
        <c-one_event_handler name="testevent" namespace="astro" onaction={handleEvent}></c-one_event_handler>

        <br/>
        <!--Property to show the data from event-->
        {data}
    </div>
</template>
```

```javascript
import { LightningElement,track } from 'lwc';

export default class Demo_component_2 extends LightningElement {
    @track data;

    handleEvent(event){
        //The data of event will be in the event.detail.payload
        this.data = event.detail.payload;
    }
}
```

**Step 3.** Create aura_component_1 Aura Component. This component is handling the event.
```html
<aura:component implements="flexipage:availableForAllPageTypes" access="global">
    <div style="padding: 20px;background: white;margin: 10px;border-radius: 4px;height: 120px;">
        <h1 style="font-size: 15px;">Aura Component: Firing Event</h1>
        
        <!--Registering the event-->
        <c:one_register_event name="testevent" namespace="astro" aura:id="first-event"></c:one_register_event>
        
        <!--Firing the event in the fireEvent method-->
        <lightning:button label="Fire Event From Aura" onclick="{!c.fireEvent}"></lightning:button>
    </div>
</aura:component>
```

```javascript
({
    fireEvent : function(component, event, helper) {
        //Getting the component using querySelector then firing the event using fire() method.
        component.find("first-event").fire('Fired Event from Aura Component.');
        
        /*
        You can use this way as well.
        var firstEvent = component.find("first-event");
        firstEvent.fire('Fired Event from Aura Component.');
        */
        
    }
})
```

**Step 4.** Create aura_component_2 Aura Component. This component is handling the event.
```html
<aura:component implements="flexipage:availableForAllPageTypes" access="global">
    <aura:attribute name="data" type="String" />
    <div style="padding: 20px;background: white;margin: 10px;border-radius: 4px;height: 120px;height: 120px;">
        <h1 style="font-size: 15px;">Aura Component: Handling Event</h1>
      
        <!--Handling the event using onaction event-->
        <c:one_event_handler name="testevent" namespace="astro" onaction="{!c.handleEvent}"></c:one_event_handler>

        <br />
        
        <!--Property to show the data from event-->
        {!v.data}
    </div>
</aura:component>
```

```javascript
({
    //The data of event will be in the payload param
    handleEvent : function(component, event, helper) {
        component.set("v.data", event.getParam('payload') );
    }
})
```


Code on  <a href="https://gist.github.com/TheVishnuKumar/2f7fb4c8dba46142e14342391c56661c">gist</a>

Release
-------------
v1.0: Initial Release

v1.1: 
1. Added register api
1. Added unregister api

v1.2: 
1. Added timeout event firing. Fire an event after defined time.
