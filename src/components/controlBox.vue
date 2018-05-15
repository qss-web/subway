<template>
    <dl class="notice" v-if="isNotice">
        <dt>提示
            <span v-on:click="close"><img src="../assets/login/close_icon.png"/></span>
            <span v-on:click="close"><img src="../assets/login/minimize_icon.png"/></span>
        </dt>
        <dd v-if="isShow">客户端初始化失败，请确认是否正确安装客户端插件<br/>
            <a :href="msg.url">下载</a>
        </dd>
        <dd v-if="!isShow">插件版本{{msg.oldVersion}}</dd>
        <dd v-if="!isShow">同当前服务器版本（{{msg.newVersion}}）不一致，使用中如有问题，请点击
            <a :href="msg.url">更新控件</a> 进行下载并重新安装。
        </dd>
    </dl>
</template>

<script>
    export default {
        data() {
            return {
                isNotice: true,
                isShow: false
            };
        },
        props: ['type', 'msg'],
        created() {
            console.log(this.msg);
            if(this.type == "download") {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        },
        methods: {
            close() {
                this.isNotice = false;
            }
        }
    };
</script>


<style lang="less" scoped>
    .notice {
        position: fixed;
        right: 0.02rem;
        bottom: 0.02rem;
        z-index: 10000002;
        width: 4.26rem;
        background: #a7abbe;
        color: #435370;
        border-radius: 2px;
        overflow: hidden;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
        min-height: 1.2rem;
        dt,
        dd {
            padding: 0 0.18rem;
        }
        dd:nth-child(2) {
            margin-top: 0.1rem;
        }
        dd:nth-child(3) {
            margin-bottom: 0.2rem;
        }
        dt {
            height: 0.36rem;
            line-height: 0.36rem;
            text-align: left;
            background: #bec0ce;
            font-size: 0.18rem;
            span {
                float: right;
                cursor: pointer;
            }
            span:nth-child(1) {
                margin-left: 0.1rem;
            }
        }
        dd {
            line-height: 0.24rem;
            span {
                color: #402700;
                cursor: pointer;
            }
        }
    }
</style>
