<template>
    <div class="train-list flex">
        <div class="train-body flex">
            <span class="train-name">6号线<br />Line6</span>
            <span v-if="!select" style="cursor: pointer" class="el-dropdown-link" v-on:click="goStationFn">{{currentStation}}</span>
            <el-dropdown v-else class="station-select" placement="top-start" @command="tabCommand">
                <span class="el-dropdown-link">{{currentStation}}</span>
                <el-dropdown-menu class="station-list" slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in staionsList" :command="item"><img src="~assets/siteInfo/icon_subway_mini.png" /> {{item.label}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="train-header"></div>
    </div>
</template>


<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                staionsList: [],
                currentStation: '' //当前显示的站名字
            };
        },
        props: ['select'],
        computed: {
            ...mapState(['stationId'])
        },
        created() {
            this.getStationsFn();
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_stationId']),
            //获取车站列表
            getStationsFn() {
                this._getList({
                    ops: {},
                    api: 'getStation',
                    callback: res => {
                        this.staionsList = res;
                        res.filter(item => {
                            if(item.value == this.stationId) {
                                this.currentStation = item.label;
                            }
                        });
                    }
                });
            },
            tabCommand(item) {
                this.currentStation = item.label;
                this._stationId(item.value);
            },
            goStationFn() {
                this.$router.push('/siteInfo');
            }
        }
    };
</script>


<style lang="less" scoped>
    .train-list {
        position: absolute;
        overflow: hidden;
        height: 0.54rem;
        bottom: 0.95rem;
        left: 0;
        width: 4.21rem;
        .train-body {
            background: url('~assets/siteInfo/bg_train_body.png') no-repeat;
            background-size: 100% 100%;
            height: 100%;
            flex: auto;
            justify-content: flex-end;
            .train-name {
                color: #fff;
                font-size: 0.21rem;
            }
        }
        .train-header {
            background: url('~assets/siteInfo/icon_subway_header.png') no-repeat right top;
            width: 1.16rem;
            height: 100%;
            background-size: 100%;
        }
    }

    .el-dropdown-link {
        color: #fff;
        font-size: 0.24rem;
        padding: 0 0.3rem;
    }

    .station-list {
        border: 0;
        padding: 0;
        li {
            color: #fff;
            background-color: #6e7488;
            font-size: 0.21rem;
            padding: 0 0.2rem;
        }
    }
</style>