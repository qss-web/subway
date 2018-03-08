<template>
    <button class="tag" :class="type" :style="{left: x + 'rem', top: y + 'rem'}">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: ['type', 'x', 'y']
    };
</script>

<style lang="less" scoped>
    .tag {
        height: 0.26rem;
        color: #fff;
        padding: 0 0.2rem;
        font-size: 0.12rem;
        position: absolute;
        border: 1px solid #000;
        &:before {
            content: '';
            display: block;
            position: absolute;
            border-left: 0.2rem solid transparent;
            border-right: 0.4rem solid transparent;
            border-top: 0.08rem solid #000;
            top: 100%;
            z-index: 2;
            transform: rotate(153deg);
            transform-origin: 0 0;
            left: 0.4rem;
            z-index: 1;
        }
        &:after {
            content: '';
            display: block;
            position: absolute;
            border-left: 0.12rem solid transparent;
            border-right: 0.39rem solid transparent;
            border-top: 0.1rem solid transparent;
            top: 100%;
            transform: rotate(153deg);
            transform-origin: 0 0;
            left: 0.4rem;
            z-index: 2;
        }
        &.error {
            background-color: #ff0000;
            &:after {
                border-top: 0.1rem solid #ff0000;
            }
        }
        &.normal {
            background-color: #009900;
            &:after {
                border-top: 0.1rem solid #009900;
            }
        }
    }
</style>
