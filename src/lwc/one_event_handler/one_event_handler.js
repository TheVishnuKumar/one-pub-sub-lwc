/**
 * @author Vishnu Kumar
 * @email vishnukummarramawat@gmail.com
 * @desc This is part of One PubSub framework. This JS provide mechanism to handle the events.
*/
import { LightningElement,api } from 'lwc';
import pubsub from 'c/one_pubsub';

export default class One_event_handler extends LightningElement {
    @api name = '';
    @api namespace = '';

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
     * @desc This is part of One PubSub framework. Register the pubsub event.
    */
    connectedCallback(){
        this.register();
    }

    /**
     * @author Vishnu Kumar
     * @email vishnukummarramawat@gmail.com
     * @desc This is part of One PubSub framework. Register the pubsub event.
    */
    register(){
        if( this.name ){
            pubsub.register(this.namespace +'__'+ this.name, this.eventFired.bind(this));
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
    unregister(){
        if( this.name ){
            pubsub.unregister(this.namespace +'__'+ this.name, this.eventFired.bind(this));
        }
        else{
            console.error('One PubSub: Name must be defined.');
        }
    }
}