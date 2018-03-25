<template>
    <div class="setWrap">
        <ul class="tabTitle clearfix">
            <li v-on:click="indexed=1" v-bind:class="indexed==1?'active':''">系统</li>
            <li v-on:click="indexed=2" v-bind:class="indexed==2?'active':''">用户</li>
            <li v-on:click="indexed=3" v-bind:class="indexed==3?'active':''">设备</li>
            <li v-on:click="indexed=4" v-bind:class="indexed==4?'active':''">客户端</li>
            <li v-on:click="indexed=5" v-bind:class="indexed==5?'active':''">设备授权</li>
            <li v-on:click="indexed=6" v-bind:class="indexed==6?'active':''">角色</li>
            <li v-on:click="indexed=7" v-bind:class="indexed==7?'active':''">监测设备配置</li>
            <li v-on:click="indexed=8" v-bind:class="indexed==8?'active':''">当前设备运行状态</li>
            <li v-on:click="indexed=9" v-bind:class="indexed==9?'active':''">运行时间管理</li>
            <li v-on:click="indexed=10" v-bind:class="indexed==10?'active':''">菜单管理</li>
        </ul>
        <div class="content">
            <v-system v-if="indexed==1"></v-system>
            <v-user v-if="indexed==2"></v-user>
            <v-equ v-if="indexed==3"></v-equ>
            <v-client v-if="indexed==4"></v-client>
            <v-authorize v-if="indexed==5"></v-authorize>
            <v-role v-if="indexed==6"></v-role>
            <v-check-equ v-if="indexed==7"></v-check-equ>
            <v-runni-state v-if="indexed==8"></v-runni-state>
            <v-time-management v-if="indexed==9"></v-time-management>
            <v-menu v-if="indexed==10"></v-menu>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                indexed: 1
            };
        },
        props: [''],
        created() {
        },
        methods: {
        }
    };
</script>
<style lang="less" scoped>
    .setWrap {
        padding: 0.22rem;
        margin: 0 0.12rem;
        background: #f6f6f6;
        border-top: 1px solid #7c858d;
        .tabTitle {
            padding-left: 0.2rem;
            li {
                float: left;
                font-size: 0.2rem;
                height: 0.39rem;
                line-height: 0.39rem;
                color: #fff;
                background: #7c8298;
                min-width: 1.38rem;
                padding: 0 0.16rem;
                margin-right: 0.06rem;
                border-radius: 10px 10px 0px 0px;
                text-align: center;
                cursor: pointer;
            }
            li.active {
                background: #ced6f3;
                color: #2f4554;
            }
        }
        .content {
            padding: 0.16rem 0.12rem;
            background: #ced6f3;
        }
    }
</style>
