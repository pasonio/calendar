<template>
    <div class="operations-section">
        <div class="buttons">
            <button type="button" class="btn" @click="showModal">Add Event</button>
            <button type="button" class="btn" @click="exportEvents">Export Events</button>
        </div>
        <modal
                v-show="isModalVisible"
                @close="closeModal"
        ></modal>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import modal from './ModalComponent.vue';
    export default {
        name: "actions-buttons-component",
        components:{
          modal
        },
        data() {
            return {
                isModalVisible: false,
            }
        },
        computed: {
            ...mapGetters({
                events: 'eventsList'
            }),
        },
        methods: {
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            exportEvents() {
                let events = JSON.stringify(this.events);
                let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(events);
                let exportFileDefaultName = 'events.json';

                let linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click();
            }
        }
    }
</script>

<style scoped>

</style>