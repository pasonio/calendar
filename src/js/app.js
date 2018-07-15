import Vue from 'vue';
import store from './storage/storage.js';
import './../css/app.scss';
import Calendar from './components/CalendarComponent.vue';

Vue.component('calendar', Calendar);


new Vue({
    el: '#app',
    store,
});
