<template>
    <!-- 1是二级 2是一级 3是正常 4是停机 5是断网 -->
    <img @click="goTosite(status.id)" :style="{left: x + 'rem', top: y + 'rem'}" v-if="status.status == 1" src="~assets/home/icon_flashing_red.gif" />
    <img @click="goTosite(status.id)" :style="{left: x + 'rem', top: y + 'rem'}" v-else-if="status.status == 2" src="~assets/home/icon_flashing_red.gif" />
    <img @click="goTosite(status.id)" :style="{left: x + 'rem', top: y + 'rem'}" v-else-if="status.status == 3" src="~assets/home/icon_flashing_green.gif" />
    <img @click="goTosite(status.id)" :style="{left: x + 'rem', top: y + 'rem'}" v-else-if="status.status == 4" src="~assets/home/icon_flashing_yellow.gif" />
    <img @click="goTosite(status.id)" :style="{left: x + 'rem', top: y + 'rem'}" v-else src="~assets/home/icon_flashing_gray.gif" />
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        props: ['status', 'x', 'y'],
        created() { },
        methods: {
            ...mapMutations(['_stationId']),
            goTosite(id) {
                this._stationId(id);
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
