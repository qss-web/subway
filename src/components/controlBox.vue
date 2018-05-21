<template>
    <dl class="notice">
        <dd v-if="isShow">提示：客户端初始化失败，请确认是否正确安装客户端插件
            <a :href="msg.url">下载</a>
            <span class="close" v-on:click="close"><img src="../assets/login/close_icon.png"/></span>
        </dd>
        <dd v-if="!isShow">提示：插件版本 {{msg.oldVersion}} 同当前服务器版本 {{msg.newVersion}} 不一致，使用中如有问题，请点击
            <a :href="msg.url">更新控件</a> 进行下载并重新安装。
            <span class="close" v-on:click="close"><img src="../assets/login/close_icon.png"/></span>
        </dd>
    </dl>
</template>

<script>
    export default {
        data() {
            return {
                isShow: false
            };
        },
        props: ['type', 'msg'],
        created() {
            if(this.type == "download") {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        },
        methods: {
            close() {
                this.$emit('receive', false);
            }
        }
    };
</script>


<style lang="less" scoped>
    .notice {
        position: fixed;
        right: 0;
        left: 0;
        top: 0rem;
        z-index: 1002;
        margin: 0 auto;
        width: 9.6rem;
        background: rgba(255, 255, 255, 0.94);
        color: #435370;
        border-radius: 0 0 0.05rem 0.05rem;
        overflow: hidden;
        box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.8);
        dd {
            text-indent: 2em;
            line-height: 0.4rem;
            position: relative;
            border-bottom: 3px solid #f9af00;
            a {
                color: #f9af00;
                cursor: pointer;
                text-indent: 0em;
            }
            span.close {
                position: absolute;
                top: 0;
                right: 0;
                width: 0.4rem;
                height: 0.4rem;
                text-align: center;
                text-indent: 0em;
                cursor: pointer;
            }
        }
    }
</style>
