<template>
    <div class="calendar">
        <action-buttons></action-buttons>
        <div class="schedule">
            <div class="events">
                <slot>
                    <div v-for="(event, index) in events"
                         class="event-item"
                         v-bind:style="{top: event.start+'px', height: event.duration+'px'}"
                         @mouseover="showRemove"
                         @mouseleave="hideRemove"
                    >
                        <i @click="deleteEvent(index)" v-show="eventHover" class="fa fa-trash"></i>
                        <p>{{event.title}}</p>
                    </div>
                </slot>
            </div>
            <ul>
                <li v-for="hour in schedule">
                    <p v-bind:class="{capital:hour.hour}">{{hour.time}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import ActionButtons from './ActionsButtonsComponent.vue';
    export default {
        name: "calendar",
        components:{
            ActionButtons
        },
        data() {
            return {
                schedule: [
                    {time: '8:00', hour: true},
                    {time: '8:30'},
                    {time: '9:00', hour: true},
                    {time: '9:30'},
                    {time: '10:00', hour: true},
                    {time: '10:30'},
                    {time: '11:00', hour: true},
                    {time: '11:30'},
                    {time: '12:00', hour: true},
                    {time: '12:30'},
                    {time: '01:00', hour: true},
                    {time: '01:30'},
                    {time: '02:00', hour: true},
                    {time: '02:30'},
                    {time: '03:00', hour: true},
                    {time: '03:30'},
                    {time: '04:00', hour: true},
                    {time: '04:30'},
                    {time: '05:00', hour: true}
                ],
                eventHover: false
            }
        },
        computed: {
            ...mapGetters({
                events: 'eventsList'
            }),
        },
        methods: {
            ...mapActions([
                'deleteEvent'
            ]),
            showRemove: function(){
                this.eventHover = true;
            },
            hideRemove: function(){
                this.eventHover = false;
            }
        }
    }
</script>

<style scoped>

</style>