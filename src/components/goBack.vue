<template>
    <div class="g-bottom" v-bind:style="setHeight" v-on:click="goBackFn">
        <img class="border" src="../assets/other/footer-border.png" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                setHeight: {
                    height: this.setH + 'rem'
                }
            };
        },
        props: ['setH'],
        methods: {
            goBackFn() {
                window.history.go(-1);
            }
        }
    };
</script>
