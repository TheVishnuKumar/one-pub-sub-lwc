/**
 * @author Vishnu Kumar
 * @email vishnukummarramawat@gmail.com
 * @desc This is part of One PubSub framework. This JS provide mechanism to fire the events.
*/
import { LightningElement,api } from 'lwc';
import pubsub from 'c/one_pubsub';

export default class One_register_event extends LightningElement {
    @api name = '';
    @api namespace = '';

    /**
     * @author Vishnu Kumar
     * @email vishnukummarramawat@gmail.com
     * @desc This is part of One PubSub framework. This method fire the events.
    */
    @api
    fire(data){
        if( this.name ){
            pubsub.fire(this.namespace +'__'+ this.name, data);
        }
        else{
            console.error('One PubSub: Name must be defined.');
        }
    }
}