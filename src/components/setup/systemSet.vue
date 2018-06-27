<template>
    <div class="setWrap">
        <ul class="tabTitle clearfix">
            <li v-for="(item,index) in tabName" v-on:click="indexed=(index+1)" v-bind:class="{active:(index+1) == indexed}">{{item.name}}</li>
        </ul>
        <div class="content">
            <v-system v-if="indexed==1"></v-system>
            <v-user v-if="indexed==2"></v-user>
            <v-role v-if="indexed==3"></v-role>
            <v-authorize v-if="indexed==4"></v-authorize>
            <v-client v-if="indexed==5"></v-client>
            <v-mobile v-if="indexed==6"></v-mobile>
            <v-wifi-list v-if="indexed==7"></v-wifi-list>
            <v-menu v-if="indexed==8"></v-menu>
            <!-- <v-monitor-log v-if="indexed==8"></v-monitor-log> -->
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                indexed: 1,
                tabName: [{ code: 'system', name: '' },
                { code: 'systemUser', name: '' },
                { code: 'systemRole', name: '' },
                { code: 'systemAuth', name: '' },
                { code: 'systemClent', name: '' },
                { code: 'systemMobile', name: '' },
                { code: 'systemWifi', name: '' },
                { code: 'systemMenu', name: '' }
                    // { code: 'systemLog', name: '' }
                ]
            };
        },
        computed: {
            ...mapState(['menuList'])
        },
        watch: {
            menuList() {
                this.getAlllistFn();
            }
        },
        created() {
            this.getAlllistFn();
        },
        methods: {
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
