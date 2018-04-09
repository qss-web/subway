<template>
    <div class="wholeWrap">
        <div>我是展示的内容</div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {};
        },
        created() {

        },
        methods: {
            ...mapActions(['_getList'])
            //改变当前页数

        }
    };
</script>

<style scoped lang="less">

</style>