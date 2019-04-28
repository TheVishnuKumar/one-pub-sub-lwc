<div align="center">
  <img alt="One Pub Sub"
       src="https://raw.githubusercontent.com/TheVishnuKumar/one-pub-sub-lwc/master/one%20pub%20sub.png">
</div>
<a href="https://githubsfdeploy.herokuapp.com?owner=TheVishnuKumar&repo=">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

**Demo:** 

Features
-------------
- Subscribe and handle pubsub events using declarativey.
- One framework that works in LWC and Aura Component.
- Reduces the code errors.
- Uniformaity across the LWC and Aura Components.
- Use namespace to define the bundle of events.
- *Future Release* More features are coming.


Documentation
-------------
One Library: This is pub sub library to register and handle events. It is single solution that can be used in LWC and Aura when it comes to PubSub. It allows you to send and recieve event from 
LWC to LWC
LWC to Aura
Aura to LWC
Aura to Aura

The uniformaty of using the one library allows you to code less error prone.

Register Event:

Registring event in Aura Component:
<c:one_register_event name="EVENT_NAME" namespace="astro" aura:id="first-event"></c:one_register_event>

Registring event in LWC Component:
<c-one_register_event name="EVENT_NAME" namespace="astro" class="first-event"></c-one_register_event>

Hnading Events:
Handling event in Aura Component:
<c:one_event_handler name="EVENT_NAME" namespace="astro" onaction="{!c.handleEvent}"></c:one_event_handler>

Handling event in LWC Component:
<c-one_event_handler name="EVENT_NAME" namespace="astro" onaction={handleEvent}></c-one_event_handler>


Attributes
----------
This component has three types of attributes.
1. **name**: This is required attribute. Define the name of the pubsub event to subscribe and fire.

2. **namespace**: This is an optional attribute. It does allow you to budle the events for particaular feature. Ex: If you have 6 components on the same screen and 3 - 3 components are related to some functionality. You can divide them using namespace. You can have 'refresh-list' event name in both the module.


Events
------
This component has one type of event.
1. **onaction**: This event fire when any subcribed event get fired. This return the data that is passed in the event firing.
You can get payload from this: 
1.1) LWC: event.detail.payload;
1.2) Aura: event.getParam('payload');


Methods
----------
This component one types of methods that you can use to re-subscribe, unsubscribe and check the status of the subscription.
1. **fire()**: It will fire the pubsub event. It does also accept the data. You can fire the event:
1.1) LWC: this.template.querySelector('.<Class Name>').fire('Fired Event from LWC.');
1.2) Aura: component.find("<Aura ID>").fire('Fired Event from Aura Component.');


Example
-------------
We are having four components here for demo. Two are LWC and Two are Aura Component. These components will be firing events and the handling event.

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

```html
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata" fqn="demo_component_1">
    <apiVersion>45.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>
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

```html
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata" fqn="demo_component_2">
    <apiVersion>45.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>
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

