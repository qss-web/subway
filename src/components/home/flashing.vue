<template>
    <img :style="{left: x + 'rem', top: y + 'rem'}" v-if="status == 3" src="~assets/home/icon_flashing_red.gif" />
    <img :style="{left: x + 'rem', top: y + 'rem'}" v-else-if="status == 2" src="~assets/home/icon_flashing_yellow.gif" />
    <img :style="{left: x + 'rem', top: y + 'rem'}" v-else src="~assets/home/icon_flashing_green.gif" />
</template>

<script>
    export default {
        props: ['status', 'x', 'y']
    };
</script>

<style lang="less" scoped>
    img {
        position: absolute;
        width: 0.71rem;
        height: 0.71rem;
    }
</style>
