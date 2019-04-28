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
        if( this.name ){
            pubsub.register(this.namespace +'__'+ this.name, this.eventFired.bind(this));
        }
        else{
            console.error('One PubSub: Name must be defined.');
        }
    }
}