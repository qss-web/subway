<template>
    <div class="">
        <div>
            <div class="station-3d"></div>
            <div class="station-healthy"></div>
            <div class="fans flex">
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name error">F01风机</button>
                </div>
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name warn">F02风机</button>
                </div>
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name normal">F03风机</button>
                </div>
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name error">F04风机</button>
                </div>
            </div>
            <div class="train-list flex">
                <div class="train-body flex">
                    <span class="train-name">6号线<br />Line6</span>
                    <el-dropdown class="station-select" placement="top-start" trigger="click">
                        <span class="el-dropdown-link">田村站</span>
                        <el-dropdown-menu class="station-list" slot="dropdown">
                            <el-dropdown-item><img src="~assets/siteInfo/icon_subway_mini.png" /> 站名一</el-dropdown-item>
                            <el-dropdown-item><img src="~assets/siteInfo/icon_subway_mini.png" /> 站名二</el-dropdown-item>
                            <el-dropdown-item><img src="~assets/siteInfo/icon_subway_mini.png" /> 站名三</el-dropdown-item>
                            <el-dropdown-item><img src="~assets/siteInfo/icon_subway_mini.png" /> 站名四</el-dropdown-item>
                            <el-dropdown-item><img src="~assets/siteInfo/icon_subway_mini.png" /> 站名五</el-dropdown-item>
                            <el-dropdown-item><img src="~assets/siteInfo/icon_subway_mini.png" /> 站名六</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="train-header"></div>
            </div>
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: [],
        created() { },
        computed: {},
        methods: {}
    };
</script>

<style lang="less" scoped>
    .station-3d {
        position: absolute;
        left: -0.1rem;
        top: 0.75rem;
        width: 10.88rem;
        height: 7.08rem;
        background: url('~assets/siteInfo/bg_station.png') no-repeat;
        background-size: 100% 100%;
    }
    .station-healthy {
        position: absolute;
        top: 0.26rem;
        right: 0.26rem;
        width: 8.9rem;
        height: 8.95rem;
        background: url('~assets/siteInfo/bg_healthy.png') no-repeat;
        background-size: 100% 100%;
    }
    .fans {
        position: absolute;
        flex-wrap: wrap;
        width: 6rem;
        height: 2rem;
        bottom: 1.6rem;
        left: 4.8rem;
        .fan {
            padding: 0 0.4rem;
            &-icon {
                width: 0.52rem;
                height: 0.52rem;
                margin-right: 0.2rem;
            }
            &-name {
                color: #fff;
                font-size: 0.16rem;
                box-shadow: 0 0 0.1rem 0.01rem #000;
                width: 0.94rem;
                height: 0.45rem;
                &.error {
                    background-color: #ff0000;
                }
                &.warn {
                    background-color: #deff00;
                }
                &.normal {
                    background-color: #36ff00;
                }
            }
        }
    }
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
            .station-select {
                padding: 0 0.3rem;
            }
        }
        .train-header {
            background: url('~assets/siteInfo/icon_subway_header.png') no-repeat right top;
            width: 1.16rem;
            height: 100%;
        }
    }

    .el-dropdown-link {
        color: #fff;
        font-size: 0.24rem;
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