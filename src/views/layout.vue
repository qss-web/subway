<template>
    <div class="g-container" :style="styleObject">
        <div class="g-header">
            <v-header></v-header>
        </div>
        <div class="g-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                styleObject: {}
            };
        },
        created() {
            this.getStationsFn();
            this.getLinesFn();
            this.getDeviceTypeListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_setStations', '_setLines', '_setDeviceType']),
            //获取车站列表
            getStationsFn() {
                this._getList({
                    ops: {},
                    api: 'getStation',
                    callback: res => {
                        this._setStations(res);
                        // this.staionsList = res;
                    }
                });
            },
            //获取线路列表
            getLinesFn() {
                this._getList({
                    ops: {},
                    api: 'getLines',
                    callback: res => {
                        this._setLines(res);
                        // this.lineList = res;
                    }
                });
            },
            //获取设备类型
            getDeviceTypeListFn() {
                this._getList({
                    ops: {},
                    api: 'getDeviceTypeList',
                    callback: res => {
                        this._setDeviceType(res);
                        // this.sysList = res;
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .g-container {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #7c8298;
        .g-header {
            height: 0.75rem;
        }
        .g-content {
            height: 10.04rem;
            position: relative;
        }
    }
</style>

