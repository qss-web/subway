<template>
    <div class="header flex">
        <img class="logo" src="~assets/header/logo.png" />
        <span class="title flex-auto">机电设备故障监测与智能诊断系统</span>
        <div class="btn-group flex">
            <router-link v-if="home" tag="button" to="index"><img src="~assets/header/icon_home.png" /></router-link>
            <router-link v-if="mine" tag="button" to="mine"><img src="~assets/header/icon_mine.png" /></router-link>
            <button v-if="search" v-on:click="searchFn"><img src="~assets/header/icon_search.png" /></button>
            <button v-if="set" v-on:click="setupFn"><img src="~assets/header/icon_setting.png" /></button>
            <button v-on:click="logoutFn"><img src="~assets/header/icon_logout.png" /></button>
        </div>
    </div>
</template>
<script>
    import { mapMutations, mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                powerControl: [],
                home: true,
                mine: true,
                search: true,
                set: true
            };
        },
        computed: {
            ...mapState(['isPowerShow'])
        },
        created() {
            if(this.isPowerShow && this.isPowerShow.length > 3) {
                this.powerControl = eval(this.isPowerShow)[4];
                //首页
                if(!this.powerControl[0].flag) {
                    this.home = false;
                }
                //我的
                if(!this.powerControl[1].flag) {
                    this.mine = false;
                }
                //搜索
                if(!this.powerControl[2].flag) {
                    this.search = false;
                }
                //设置
                if(!this.powerControl[3].flag) {
                    this.set = false;
                }
            }
        },
        methods: {
            ...mapActions(['_getInfo']),
            ...mapMutations(['_menuList', '_setSearchVal', '_clearLogin']),
            setupFn() {
                this._getInfo({
                    ops: {},
                    api: 'getAlllist',
                    callback: res => {
                        this._menuList(res);
                        this.$router.push('setup');
                    }
                });
            },
            searchFn() {
                this._setSearchVal('');
                this.$router.push('/search');
            },
            logoutFn() {
                this.$confirm('确定要退出系统？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info',
                    closeOnClickModal: false
                }).then(() => {
                    this._clearLogin();
                    this.$router.push('/login');
                }).catch(() => {

                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .header {
        height: 100%;
        background: url('~assets/header/bg_header.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        .logo {
            padding-left: 0.75rem;
            height: 100%;
            height: 0.72rem;
        }
        .title {
            text-align: center;
            font-size: 0.4rem;
            text-align: center;
            text-shadow: 0rem 0.06rem #3c3332;
            color: #bbc7d7;
            padding-bottom: 0.06rem;
            letter-spacing: 0.01rem;
        }
        .btn-group {
            background: url('~assets/header/bg_btns.png') no-repeat;
            background-size: 100% 100%;
            height: 0.4rem;
            padding: 0 0.3rem;
            button {
                background-color: transparent;
                padding: 0.04rem;
                width: 0.36rem;
                height: 0.36rem;
                margin: 0 0.04rem;
                cursor: pointer;
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
    }
</style>
