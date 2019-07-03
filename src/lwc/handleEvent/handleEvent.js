/**
 * @author Vishnu Kumar
 * @email vishnukummarramawat@gmail.com
 * @desc This is part of One PubSub framework. This JS provide mechanism to handle the events.
*/
import { LightningElement,api,wire } from 'lwc';
import pubsub from 'c/one_pubsub';
import { CurrentPageReference } from 'lightning/navigation';


export default class HandleEvent extends LightningElement {
    @api name = '';
    @api namespace = '';
    @api pagereference;
    currentPageReference = '';
    eventFiredCallback;

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        if( this.pagereference ){
            this.currentPageReference = currentPageReference;
        }
        this.eventFiredCallback = this.eventFired.bind(this);
        this.subscribe();
    }
    /**
     * @author Vishnu Kumar
     * @email vishnukummarramawat@gmail.com
     * @desc This is part of One PubSub framework. Handle the event and send custom event to parent component.
    */
    eventFired(data){
        this.dispatchEvent( new CustomEvent('action', {detail:{payload: data}} ) );  
    }

    /**
     * @author Vishnu Kumar
     * @email vishnukummarramawat@gmail.com
     * @desc This is part of One PubSub framework. Unregister the pubsub event when component is removed from DOM.
    */
    disconnectedCallback(){
        this.unsubscribe();
    }

    /**
     * @author Vishnu Kumar
     * @email vishnukummarramawat@gmail.com
     * @desc This is part of One PubSub framework. Register the pubsub event.
    */
    @api
    subscribe(){
        if( this.name ){
            pubsub.register( pubsub.buildEventName(this.currentPageReference, this.namespace, this.name) , this.eventFiredCallback );
        }
        else{
            console.error('One PubSub: Name must be defined.');
        }
    }

    /**
     * @author Vishnu Kumar
     * @email vishnukummarramawat@gmail.com
     * @desc This is part of One PubSub framework. Unregister the pubsub event.
    */
    @api
    unsubscribe(){
        if( this.name ){
            pubsub.unregister( pubsub.buildEventName(this.currentPageReference, this.namespace, this.name) , this.eventFiredCallback );
        }
        else{
            console.error('One PubSub: Name must be defined.');
        }
    }
}