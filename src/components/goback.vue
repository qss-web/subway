<template>
    <div class="footer flex">
        <img class="bg" src="../assets/other/footer-border.png" />
        <img @click.prevent="goBack" class="back" src="~assets/common/icon_goback.png" />
    </div>
</template>

<script>
    export default {
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="less" scoped>
    .footer {
        height: 0.95rem;
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: #474b5c;
        justify-content: center;
        .bg {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .back {
            width: 1rem;
            height: 0.62rem;
            cursor: pointer;
        }
    }
</style>

