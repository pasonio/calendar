import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        events: JSON.parse(localStorage.getItem('events'))
    },
    getters: {
        eventsList: state => {
            return state.events;
        }
    },
    mutations: {
        addEvent(state, event){
            let events = JSON.parse(localStorage.getItem('events'));
            if(events == null){
                events = [event];
            }else{
                events.push(event);
            }
            state.events = events;
            localStorage.setItem('events', JSON.stringify(events));
        },
        removeEvent(state, index){
            let events = JSON.parse(localStorage.getItem('events'));

            events.splice(index, 1);
            state.events = events;
            localStorage.setItem('events', JSON.stringify(events));

        }
    },
    actions: {
        addEvent(context, event){

            return new Promise((resolve, reject) => {
                if(event.start >= 535 || event.start < 0){
                    reject('The value should fit inside work day schedule(0 to 535)');
                } else {
                    context.commit('addEvent', event);
                    resolve();
                }
            });
        },
        deleteEvent(context, index){
            context.commit('removeEvent', index);
        }
    }
});