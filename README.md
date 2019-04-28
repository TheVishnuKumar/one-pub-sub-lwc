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
**Step 1.** Create a push topic using the Developer Console. Copy the following code and execute in the developer console.
What will it do? It will create a push topic name NewContactCreated. Whenever a contact record gets created. It will send the payload to the onmessage event.
```
PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'NewContactCreated';
pushTopic.Query = 'select Id,Name from Contact';
pushTopic.ApiVersion = 45.0;
pushTopic.NotifyForOperationCreate = true;
pushTopic.NotifyForOperationUpdate = false;
pushTopic.NotifyForOperationUndelete = false;
pushTopic.NotifyForOperationDelete = false;
pushTopic.NotifyForFields = 'All';
insert pushTopic;
```

**Step 2.** Create a Lightning Web Component name as lwc_streaming_demo.
Copy and paste the following code to the files.
**Note**: Add the target configuration in the meta XML file. so you can add your demo component to the using the app builder. In my case, I have added the component to the home page.

**lwc_streaming_demo.js**
```javascript
import { LightningElement,track } from 'lwc';

export default class Lwc_streaming_demo extends LightningElement {

    @track error = '';
    @track payload = '';
    @track isConnectionOn;

    //Handles the error
    handleError(event){
        //Error is coming in the event.detail.error
        this.error = JSON.stringify(event.detail.error);
    }

    //Handles the message/payload from streaming api
    handleMessage(event){
        //Message is coming in event.detail.payload
        this.payload = this.payload + JSON.stringify(event.detail.payload);
    }

    //This method is subscribing the channel
    restart(){
        this.template.querySelector('.lwc_streaming_api-1').subscribe();
    }

    //This method is unsubscribing the channel
    destroy(){
        this.template.querySelector('.lwc_streaming_api-1').unsubscribe();

        this.payload = '';
        this.error = '';
    }

    //This method is checking if the channel is subscribed or not
    checkConnection(){
        this.isConnectionOn = this.template.querySelector('.lwc_streaming_api-1').checkConnection();
    }
}
```

**lwc_streaming_demo.html**
```html
<template>
    <c-lwc_streaming_api 
        channel="/topic/NewContactCreated" 
        api-version="45.0" 
        debug=true
        onmessage={handleMessage} 
        onerror={handleError} 
        class="lwc_streaming_api-1">
    </c-lwc_streaming_api>

    <lightning-button label="Destroy Connection"  onclick={destroy}></lightning-button>

    <lightning-button label="Restart Connection"  onclick={restart}></lightning-button>

    <lightning-button label="Check Connection"  onclick={checkConnection}></lightning-button>

    <div style="background: white;padding: 50px;">
        <div style="margin:20px;">
            Payload
            <br/>
            {payload}
        </div>
        
        <div style="margin:20px;">
            Error:
            <br/>
            {error}
        </div>

        <div style="margin:20px;">
            Is Connection On:
            <br/>
            {isConnectionOn}
        </div>
    </div>
</template>
```

**lwc_streaming_demo.js-meta.xml**
```html
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata" fqn="lwc_streaming_demo">
    <apiVersion>45.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>
```

**Step 3.** Open your demo component. Now create some contact records and you will see the message/payload on the screen.

**Step 4 (Optional)**: If you want to try it with platform events. Create a platform event object. Subscribe it using below code.
```
<c-lwc_streaming_api 
        channel="/event/Test_Event__e" 
        api-version="45.0" 
        debug=true
        onmessage={handleMessage} 
        onerror={handleError} 
        class="lwc_streaming_api-1">
    </c-lwc_streaming_api>
```
Here Test_Event__e is my platform event object name.

Now create platform event records using below code:
```
Test_Event__e te = new Test_Event__e ();
te.Test_Field__c  = 'test data';
Database.SaveResult sr = EventBus.publish(te);
```
I have used a custom text field (Test_Field__c) in the platform event.

Code on  <a href="https://gist.github.com/TheVishnuKumar/c692e4a2c908e95b990966f36804ca14">gist</a>

