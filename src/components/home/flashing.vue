<template>
    <img @click="goTosite" :style="{left: x + 'rem', top: y + 'rem'}" v-if="status == 3" src="~assets/home/icon_flashing_red.gif" />
    <img @click="goTosite" :style="{left: x + 'rem', top: y + 'rem'}" v-else-if="status == 2" src="~assets/home/icon_flashing_yellow.gif" />
    <img @click="goTosite" :style="{left: x + 'rem', top: y + 'rem'}" v-else src="~assets/home/icon_flashing_green.gif" />
</template>

<script>
    export default {
        props: ['status', 'x', 'y'],
        methods: {
            goTosite() {
                this.$router.push('siteInfo');
            }
        }
    };
</script>

<style lang="less" scoped>
    img {
        position: absolute;
        width: 0.71rem;
        height: 0.71rem;
        cursor: pointer;
        user-select: none;
    }
</style>
