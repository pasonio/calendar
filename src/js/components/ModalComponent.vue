<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal"
                 role="dialog"
                 aria-labelledby="modalTitle"
                 aria-describedby="modalDescription"
            >
                <header class="modal-header" id="modalTitle">
                    Add event to day schedule
                    <slot name="header">
                        <button
                                type="button"
                                class="btn-close close-icon"
                                @click="close"
                                aria-label="Close modal"
                        >
                            x
                        </button>
                    </slot>
                </header>

                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        <input type="number" v-model="formData.start" name="start" max="535" placeholder="start" />
                        <input type="number" v-model="formData.duration" name="duration" placeholder="duration" />
                        <input type="text" v-model="formData.title" name="title" placeholder="title" />
                    </slot>
                </section>

                <footer class="modal-footer">
                    <slot name="footer">
                        <button
                                type="button"
                                class="btn-green"
                                @click="createEvent"
                                aria-label="Close modal"
                        >
                            Add Event
                        </button>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "modal-component",
        props: [
            'action'
        ],
        data(){
            return {
                formData: {}
            }
        },
        methods: {
            ...mapActions({
              addEvent: 'addEvent'
            }),
            close() {
                this.clearForm();
                this.$emit('close');
            },
            createEvent() {
                let vm = this;
                let eventData = {
                    start: this.formData.start,
                    duration: this.formData.duration,
                    title: this.formData.title
                };
                this.addEvent(eventData)
                .then(response => {
                    vm.close();
                })
                .catch(error=>{
                    alert(error)
                })
            },
            clearForm(){
                this.formData.start = '';
                this.formData.duration = '';
                this.formData.title = '';
            }
        }
    }
</script>

<style scoped>
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }

    .modal {
        background: #FFFFFF;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
    }

    .modal-header,
    .modal-footer {
        padding: 15px;
        display: flex;
    }

    .modal-header {
        border-bottom: 1px solid #eeeeee;
        color: #4AAE9B;
        justify-content: space-between;
    }

    .close-icon {
        float: right;
    }

    .modal-footer {
        border-top: 1px solid #eeeeee;
        justify-content: flex-end;
    }

    .modal-body {
        position: relative;
        padding: 20px 10px;
    }

    .btn-close {
        border: none;
        font-size: 20px;
        padding: 20px;
        cursor: pointer;
        font-weight: bold;
        color: #4AAE9B;
        background: transparent;
    }

    .btn-green {
        color: white;
        background: #4AAE9B;
        border: 1px solid #4AAE9B;
        border-radius: 2px;
    }

    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .5s ease
    }
</style>