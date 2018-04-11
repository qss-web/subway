<template>
    <button v-if="name == 'triangle'" class="tag triangle" :class="status" :style="{left: x + 'rem', top: y + 'rem'}" @click="goToDevice">
        <slot></slot>
    </button>
    <button v-else-if="name == 'line'" class="tag line" :class="status" :style="{left: x + 'rem', top: y + 'rem'}">
        <slot></slot>
        <img v-if="type == 1" class="line1" src="~assets/siteInfo/icon_join_line1.png" />
        <img v-if="type == 2" class="line2" src="~assets/siteInfo/icon_join_line2.png" />
        <img v-if="type == 3" class="line3" src="~assets/siteInfo/icon_join_line3.png" />
        <img v-if="type == 4" class="line4" src="~assets/siteInfo/icon_join_line4.png" />
        <img v-if="type == 5" class="line5" src="~assets/siteInfo/icon_join_line5.png" />
    </button>
    <button v-else-if="name == 'number'" class="tag number" :class="status" :style="{left: x + 'rem', top: y + 'rem'}">
        {{numbers[number - 1]}}
    </button>
    <button v-else-if="name == 'fan'" class="tag fan" :class="status" :style="{left: x + 'rem', top: y + 'rem'}">
        <slot></slot>
        <img v-if="type == 1" class="fan1" src="~assets/siteInfo/icon_join_fan2.png" />
        <img v-if="type == 2" class="fan2" src="~assets/siteInfo/icon_join_fan3.png" />
    </button>
</template>

<script>
    export default {
        props: ['name', 'type', 'status', 'x', 'y', 'number'],
        data() {
            return {
                numbers: '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿'
            };
        },
        methods: {
            goToDevice() {
                this.$emit('onclick');
            }
        }
    };
</script>

<style lang="less" scoped>
    .tag {
        height: 0.26rem;
        color: #fff;
        padding: 0 0.2rem;
        font-size: 0.13rem;
        position: absolute;
        &.triangle {
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
                transform: rotate(154deg);
                transform-origin: 0 0;
                left: 0.4rem;
                z-index: 2;
            }
        }
        &.line {
            border-radius: 0.08rem;
            box-shadow: 0 0.02rem 0.08rem 0.01rem #000;
            img {
                position: absolute;
                z-index: 1;
                &.line1 {
                    width: 1.28rem;
                    height: 0.56rem;
                    left: 50%;
                    margin-left: -0.1rem;
                }
                &.line2 {
                    width: 0.12rem;
                    height: 1.4rem;
                    bottom: 100%;
                    left: 50%;
                    margin-left: -0.06rem;
                }
                &.line3 {
                    width: 0.94rem;
                    height: 0.12rem;
                    right: 100%;
                    top: 50%;
                    margin-top: -0.06rem;
                }
                &.line4 {
                    width: 0.75rem;
                    height: 0.75rem;
                    right: 50%;
                    bottom: 100%;
                }
                &.line5 {
                    width: 0.62rem;
                    height: 1rem;
                    right: 50%;
                    bottom: 100%;
                }
            }
        }
        &.fan {
            border-radius: 0.08rem;
            box-shadow: 0 0.02rem 0.08rem 0.01rem #000;
            img {
                position: absolute;
                z-index: 1;
                &.fan1 {
                    width: 0.11rem;
                    height: 2.8rem;
                    top: 100%;
                    // left: 50%;
                }
                &.fan2 {
                    width: 1.9rem;
                    height: 0.12rem;
                    bottom: 30%;
                    right: 100%;
                    // bottom: 100%;
                    // left: 50%;
                }
            }
        }
        &.error {
            background-color: #ff0000;
            &:after {
                border-top: 0.1rem solid #ff0000;
            }
        }
        &.warn {
            background-color: #f9af00;
            &:after {
                border-top: 0.1rem solid #f9af00;
            }
        }
        &.normal {
            background-color: #009900;
            &:after {
                border-top: 0.1rem solid #009900;
            }
        }
        &.number {
            background-color: transparent;
            padding: 0;
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 50%;
            font-size: 0.18rem;
            line-height: 0.16rem;
            padding-left: 0.01rem;
            &.error {
                box-shadow: 0 0 0.2rem 0.2rem #d10b0b;
                background-color: rgba(255, 5, 5, 0.8);
            }
        }
    }
</style>
