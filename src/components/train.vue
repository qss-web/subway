<template>
    <div class="train-list flex">
        <div class="train-body flex">
            <span class="train-name">6号线<br />Line6</span>
            <span v-if="!select" class="el-dropdown-link">田村站</span>
            <el-dropdown v-else class="station-select" placement="top-start">
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
</template>


<script>
    export default {
        props: ['select']
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