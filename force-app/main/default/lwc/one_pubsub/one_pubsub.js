/*
Note: Initial code was taken from lwc-recipes and modified the code for the One PubSub.
https://github.com/trailheadapps/lwc-recipes/blob/master/force-app/main/default/lwc/pubsub/pubsub.js
*/
/* eslint-disable @lwc/lwc/no-async-operation */
const callbacks = {};

const register = (eventName, callback) => {
    if (!callbacks[eventName]) {
        callbacks[eventName] = new Set();
    }
    callbacks[eventName].add(callback);
};

const unregister = (eventName, callback) => {
    
    if (callbacks[eventName]) {
        callbacks[eventName].delete(callback);
    }
};

const fire = (eventName, payload, timeout) => {
    //Fire with timeout
    if( timeout !== 0 ){
        setTimeout(function(){ 
            if (callbacks[eventName]) {
                callbacks[eventName].forEach(callback => {
                    try {
                        callback(payload);
                    } catch (error) {
                        // fail silently
                    }
                });
            }

        }, timeout);
    }
    else{
        if (callbacks[eventName]) {
            callbacks[eventName].forEach(callback => {
                try {
                    callback(payload);
                } catch (error) {
                    // fail silently
                }
            });
        }
    }
};

/**
 * Fires an event to listeners.
 * @param {string} eventName - Name of the event to fire.
 * @param {*} payload - Payload of the event to fire.
 */
const fireWithNamespace = (eventName, payload, timeout) => {
    //Fire with timeout
    let keysStartingWithNamespace =
    Object.keys(callbacks).filter(function (key) {
      return key.startsWith(eventName);
    });

    keysStartingWithNamespace.forEach(eName=>{
        fire(eName, payload, timeout);
    });
};

const buildEventName = (pRef, namespace, name) => {
    namespace = 'ONE_' + namespace + '_ONE';
    return namespace + '__' + pRef + '__' + name;
}

export default {
    register,
    unregister,
    fire,
    fireWithNamespace,
    buildEventName
};
