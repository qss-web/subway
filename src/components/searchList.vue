<template>
    <div v-bind:class="'g-table-' + other.style">
        <ul class="title">
            <li style="width: 4%" v-if="other.isCheck" v-on:click="checkAllFn">
                <img v-if="!isAllCkeck" src="../assets/search/check.png" />
                <img v-if="isAllCkeck" src="../assets/search/checked.png" />
            </li>
            <li v-for="(item, index) in label" v-bind:style="{width:item.width+'%'}">{{item.label}}</li>
        </ul>
        <dl class="content">
            <dd v-for="(item, index) in listShow">
                <span style="width: 4%" v-if="other.isCheck" v-on:click="singleCheckFn(index)">
                    <img v-if="!item.isCheck" src="../assets/search/check.png"/>
                    <img v-if="item.isCheck" src="../assets/search/checked.png"/>
                </span>
                <span v-for="(item1, index) in label" v-bind:style="{width:item1.width+'%'}">{{item[item1.value]}}</span>
            </dd>
        </dl>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isAllCkeck: false,
                listShow: [],
                numLength: 0
            };
        },
        props: ['list', 'label', 'other'],
        created() {
            this.listShow = this.list;
            this.listShow.forEach(item => {
                item.isCheck = false;
            });
        },
        methods: {
            currentList(index) {
                this.indexed = index;
            },
            checkAllFn() {
                this.listShow.forEach(item => {
                    if(this.isAllCkeck != item.isCheck) {
                        item.isCheck = item.isCheck;
                    } else {
                        item.isCheck = !item.isCheck;
                    }
                });
                this.isAllCkeck = !this.isAllCkeck;
            },
            singleCheckFn(index) {
                this.listShow[index].isCheck = !this.listShow[index].isCheck;
                if(this.listShow[index].isCheck) {
                    this.numLength++;
                } else {
                    this.numLength--;
                }
                this.$set(this.listShow, index, this.listShow[index]);
                if(this.numLength == this.listShow.length) {
                    this.isAllCkeck = true;
                } else {
                    this.isAllCkeck = false;
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    .g-table-1 {
        width: 100%;
        border-top: 1px solid #343740;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.35);
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            border-bottom: 1px solid #abaeb5;
            color: #fff;
            background: url('../assets/search/sub_title_bg.png') repeat-x;
            font-size: 0.2rem;
            height: 0.39rem;
            line-height: 0.38rem;
            li {
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.05rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.165rem;
                }
                span {
                    width: 8%;
                    height: 0.56rem;
                    line-height: 0.56rem;
                    font-size: 0.18rem;
                    color: #fff;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #414455;
            }
            dd:nth-child(2n) {
                background: #4d505f;
            }
        }
    }
    .g-table-2 {
        width: 100%;
        border-top: 1px solid #caccce;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.35);
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #0e0e0e;
            background: #d7d9db;
            font-size: 0.2rem;
            height: 0.52rem;
            line-height: 0.52rem;
            li {
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.115rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.135rem;
                }
                span {
                    width: 8%;
                    height: 0.56rem;
                    line-height: 0.56rem;
                    font-size: 0.2rem;
                    color: #ffa600;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #3c3f46;
            }
            dd:nth-child(2n) {
                background: #45484f;
            }
        }
    }
    .g-table-3 {
        width: 100%;
        border-top: 1px solid #caccce;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.35);
        border-left: 1px solid #587386;
        border-right: 1px solid #587386;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #1c1e2a;
            background: #c5cbe3;
            font-size: 0.2rem;
            height: 0.52rem;
            line-height: 0.52rem;
            li {
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.115rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.115rem;
                }
                span {
                    width: 8%;
                    height: 0.52rem;
                    line-height: 0.52rem;
                    font-size: 0.2rem;
                    color: #ffa600;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #e5e8f7;
            }
            dd:nth-child(2n) {
                background: #c5cbe3;
            }
        }
    }
    .g-table-4 {
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #1c1e2a;
            background: #c5cbe3;
            font-size: 0.16rem;
            height: 0.4rem;
            line-height: 0.4rem;
            li {
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.055rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                background: #404455;
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.115rem;
                }
                span {
                    width: 8%;
                    height: 0.52rem;
                    line-height: 0.52rem;
                    font-size: 0.16rem;
                    color: #fff;
                }
                span:first-child {
                    width: 4%;
                }
            }
        }
    }
    .g-table-5 {
        padding: 0.2rem 0;
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            border: 1px solid #1d1c24;
            border-bottom: 1px solid rgba(255, 255, 255, 0.35);
            color: #fff;
            background: url('../assets/other/sub_title_bg.png') repeat-x;
            font-size: 0.16rem;
            height: 0.39rem;
            line-height: 0.38rem;
            margin: 0 0.04rem;
            li {
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.055rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                background: #404455;
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.115rem;
                }
                span {
                    width: 8%;
                    height: 0.52rem;
                    line-height: 0.52rem;
                    font-size: 0.16rem;
                    color: #fff;
                }
                span:first-child {
                    width: 4%;
                }
            }
        }
    }
    .g-table-6 {
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #1c1e2a;
            background: #c5cbe3;
            font-size: 0.2rem;
            height: 0.52rem;
            line-height: 0.52rem;
            li {
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.115rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.115rem;
                }
                span {
                    width: 8%;
                    height: 0.52rem;
                    line-height: 0.52rem;
                    font-size: 0.2rem;
                    color: #ffa600;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #e5e8f7;
            }
            dd:nth-child(2n) {
                background: #d4d9ed;
            }
        }
    }
    .g-table-7 {
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #1c1e2a;
            background: #e5e8f7;
            font-size: 0.2rem;
            height: 0.52rem;
            line-height: 0.52rem;
            li {
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.115rem;
                }
            }
        }
        .content {
            dd {
                display: flex;
                -webkit-flex-flow: row wrap;
                justify-content: space-around;
                text-align: center;
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.115rem;
                }
                span {
                    width: 8%;
                    height: 0.52rem;
                    line-height: 0.52rem;
                    font-size: 0.2rem;
                    color: #ffa600;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #dadff2;
            }
            dd:nth-child(2n) {
                background: #cfd5eb;
            }
        }
    }
</style>
