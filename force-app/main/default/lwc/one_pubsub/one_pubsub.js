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
    // let reg = new RegExp(eventName);
    // console.log('--eventName--'+eventName);

    // for (let property in callbacks) {
    //     if( property.match(reg) ){
    //         console.log('--property inside--'+property);
    //     }
    // }
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

export default {
    register,
    unregister,
    fire
};
