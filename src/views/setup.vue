<template>
    <div class="setup">
        <ul class="tabTitle">
            <li v-for="(item,index) in tabName" v-if="item.isLimitShow==1" v-on:click="currentList(index+1)" v-bind:class="{active:(index+1) == tabShow}">{{item.name}}</li>
            <!-- <li v-on:click=" currentList(1) " v-bind:class="tabShow==1? 'active': '' ">设备信息</li>
            <li v-on:click="currentList(2) " v-bind:class="tabShow==2? 'active': '' ">故障库</li>
            <li v-on:click="currentList(3) " v-if="userInfo.isLimitShow==1 " v-bind:class="tabShow==3? 'active': '' ">系统设置</li>
            <li v-on:click="currentList(4) " v-bind:class="tabShow==4? 'active': '' ">人员情况统计</li> -->
        </ul>
        <v-equ-msg v-if="tabShow==1 "></v-equ-msg>
        <v-fault-library v-if="tabShow==2 "></v-fault-library>

        <div class="equWrap " v-if="tabShow==3 && userInfo.isLimitShow==1 ">
            <v-system-set></v-system-set>
        </div>
        <v-statisticians v-if="tabShow==4 "></v-statisticians>
        <v-check-equ v-if="tabShow==5"></v-check-equ>
        <v-runni-state v-if="tabShow==6"></v-runni-state>
        <v-time-management v-if="tabShow==7"></v-time-management>
        <v-wifi-list v-if="tabShow==8"></v-wifi-list>
        <v-goback></v-goback>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                tabShow: 1,
                tabName: [{ code: 'deviceInfo', name: '', isLimitShow: 1 },
                { code: 'faultData', name: '', isLimitShow: 1 },
                { code: 'sysSet', name: '', isLimitShow: 0 },
                { code: 'userInfo', name: '', isLimitShow: 1 },
                { code: 'systemDeviceSet', name: '', isLimitShow: 1 },
                { code: 'systemRunStatus', name: '', isLimitShow: 1 },
                { code: 'systemRunTime', name: '', isLimitShow: 1 },
                { code: 'systemWifi', name: '', isLimitShow: 1 }]
            };
        },
        computed: {
            ...mapState(['userInfo', 'menuList'])
        },
        watch: {
            menuList() {
                this.getAlllistFn();
            }
        },
        created() {
            this.tabName[2].isLimitShow = this.userInfo.isLimitShow;
            this.getAlllistFn();
        },
        methods: {
            currentList(index) {
                this.tabShow = index;
            },
            getAlllistFn() {
                this.menuList.forEach(item => {
                    this.tabName.filter(item1 => {
                        if(item.menuCode == item1.code) {
                            item1.name = item.menuName;
                        }
                    });
                });
            }
        }
    };
</script>


<style scoped lang="less">
    .tempPic {
        display: block;
        width: 98.5%;
        margin: 0 auto;
    }
    .tabTitle {
        padding-top: 0.16rem;
        overflow: hidden;
        padding-left: 0.22rem;
        position: relative;
        li {
            width: 2rem;
            height: 0.39rem;
            line-height: 0.39rem;
            font-size: 0.2rem;
            float: left;
            text-align: center;
            background: #2f4554;
            color: #ffffff;
            border-radius: 8px 8px 0px 0px;
            margin-left: 0.05rem;
            cursor: pointer;
        }
        li.active {
            background: #d7dbde;
            color: #2f4554;
        }
        .notice {
            position: absolute;
            right: 1rem;
            top: 0;
            dd {
                flex: auto;
                font-size: 0.2rem;
                margin-left: 0.26rem;
                height: 0.48rem;
                line-height: 0.5rem;
            }
        }
    }

    .add-btn {
        position: absolute;
        top: 1.5rem;
        left: 10.04rem;
        color: transparent;
        background-color: transparent;
        width: 1.1rem;
        height: 0.5rem;
    }

    .el-select {
        width: 6rem;
        background-color: #fff;
        color: #000;
        border: 1px solid #999;
        font-size: 0.4rem;
        .el-option {
            font-size: 0.4rem;
        }
    }
</style>

<style lang="less">
    .unit-account {
        background-color: #ced6f3;
        width: 18.56rem;
        height: 7.68rem;
        .el-dialog__header {
            padding: 0;
        }
        .el-dialog__body {
            padding: 0;
        }
        .el-dialog__footer {
            padding-top: 0.5rem;
        }
        &-dialog-header {
            background-color: #2f4554;
            height: 0.93rem;
            font-size: 0.32rem;
            color: #fff;
            padding: 0;
            line-height: 0.93rem;
            padding-left: 0.3rem;
        }
        &-dialog-body {
            padding-top: 1rem;
            .el-form-item {
                margin-bottom: 0.32rem;
                .el-form-item__label {
                    font-size: 0.32rem;
                    margin-left: 0.8rem;
                    padding-right: 0.12rem;
                }
                .el-input__inner {
                    padding: 0 0.15rem !important;
                    font-size: 0.38rem !important;
                    text-align: center;
                    color: #000 !important;
                }
            }
        }
        &-dialog-footer {
            text-align: center;
            button {
                width: 2.6rem;
                height: 0.88rem;
                font-size: 0.4rem;
                background-color: #2f4554;
                color: #fff;
                padding: 0;
                &:last-child {
                    margin-left: 1.6rem;
                }
                &:hover,
                &:focus,
                &:active {
                    background-color: #2f4554;
                    color: #fff;
                }
            }
        }
    }

    .unit-account-select {
        &-option {
            font-size: 0.38rem !important;
            height: auto !important;
            padding: 0.1rem 0.4rem;
            font-weight: normal;
        }
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #606266;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #7c8298;
        border-color: #7c8298;
    }
    .el-checkbox__inner:hover {
        border-color: #7c8298;
    }
</style>