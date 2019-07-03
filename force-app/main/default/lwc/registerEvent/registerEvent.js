/**
 * @author Vishnu Kumar
 * @email vishnukummarramawat@gmail.com
 * @desc This is part of One PubSub framework. This JS provide mechanism to fire the events.
*/
import { LightningElement,api,wire } from 'lwc';
import pubsub from 'c/one_pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class RegisterEvent extends LightningElement {
    @api name = '';
    @api namespace = '';
    @api timeout = 0;
    @api pagereference;
    currentPageReference = '';

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        if( this.pagereference ){
            this.currentPageReference = currentPageReference;
        }
    }

    /**
     * @author Vishnu Kumar
     * @email vishnukummarramawat@gmail.com
     * @desc This is part of One PubSub framework. This method fire the events.
    */
    @api
    publish(data){
        if( this.name ){
            pubsub.fire( pubsub.buildEventName(this.currentPageReference, this.namespace, this.name) , data, this.timeout);
        }
        else{
            console.error('One PubSub: Name must be defined.');
        }
    }

    /**
     * @author Vishnu Kumar
     * @email vishnukummarramawat@gmail.com
     * @desc This is part of One PubSub framework. This method fire the all events of specific namespace.
    */
    @api
    publishToNamespace(data){
        if( this.name ){
            pubsub.fireWithNamespace( pubsub.buildEventName(this.currentPageReference, this.namespace, '') , data, this.timeout);
        }
        else{
            console.error('One PubSub: Name must be defined.');
        }
    }
}