<template>
    <div class="search">
        <div class="searchWidth">
            <div v-on:keyup.enter="fifterBtn">
                <input type="text" v-model="fifterValue" />
                <a href="javascript:;"><img src="../assets/search/delete_icon.png" /></a>
            </div>
            <span v-on:click="fifterBtn">查询</span>
            <span v-on:click="downloadBtn">下载</span>
            <!-- <span><img src="../assets/search/search_icon.png"/></span> -->
            <!-- <span><img src="../assets/search/download_icon.png"/></span> -->
        </div>
    </div>
</template>
<script>
    import { mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                fifterValue: ''
            };
        },
        computed: {
            ...mapState(['searchVal'])
        },
        created() {
            if(this.searchVal) {
                this.fifterValue = this.searchVal;
            }
        },
        methods: {
            ...mapMutations(['_setSearchVal']),
            fifterBtn() {
                // this.$emit('receive', this.fifterValue);
                this._setSearchVal(this.fifterValue);
            },
            downloadBtn() {
                this.$emit('download');
            }
        }
    };
</script>
<style lang="less" scoped>
    .search {
        padding-top: 0.28rem;
        .searchWidth {
            width: 15.74rem;
            margin: 0px auto;
            overflow: hidden;
            div,
            span {
                float: left;
                height: 0.68rem;
                line-height: 0.68rem;
                background: url('../assets/search/title_bg.png') repeat-x;
            }
            div {
                width: 87%;
                border-radius: 1.2rem;
                position: relative;
                padding: 0 0.4rem;
                input {
                    background: none;
                    width: 96%;
                    height: 0.66rem;
                    line-height: 0.66rem;
                    color: #fff;
                    font-size: 0.2rem;
                }
                a {
                    position: absolute;
                    width: 0.69rem;
                    height: 0.69rem;
                    right: 0;
                    top: -0.01rem;
                    z-index: 1;
                    img {
                        width: 100%;
                        height: 100%;
                        vertical-align: top;
                    }
                }
            }
            span {
                width: 5.7%;
                margin-left: 0.8%;
                text-align: center;
                cursor: pointer;
                border-radius: 4px;
                font-size: 0.24rem;
                color: #fff;
                // img {
                //     width: 0.35rem;
                //     vertical-align: middle;
                // }
            }
        }
    }
</style>
