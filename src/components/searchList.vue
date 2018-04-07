<template>
    <div v-bind:class="'g-table-' + other.style">
        <ul class="title">
            <li style="width: 4%; cursor: pointer" v-if="other.isCheck" v-on:click="checkAllFn">
                <img v-if="!isAllCkeck" src="../assets/search/check.png" />
                <img v-if="isAllCkeck" src="../assets/search/checked.png" />
            </li>
            <li v-for="(item, index) in label" v-bind:style="{width:item.width+'%'}">{{item.label}}</li>
        </ul>
        <dl class="content" v-if="other.isSubShowColor">
            <dd v-for="(item, index) in listShow">
                <span style="width: 4%!important; cursor: pointer" v-if="other.isCheck" v-on:click="singleCheckFn(index)">
                    <img v-if="!item.isCheck" src="../assets/search/check.png"/>
                    <img v-if="item.isCheck" src="../assets/search/checked.png"/>
                </span>
                <div v-for="(item1, index1) in label" v-bind:style="{width:item1.width+'%'}">
                    <span v-if="item1.value == 'index'" v-on:click="goToNextPage(other.goToNextFn,item)">
                        {{index+1}}
                    </span>
                    <span v-else-if="item1.btn" class="btn">
                        <a v-for="(subItem,index) in item1.btn" v-on:click="goToNextPage(subItem.fn,item)" href="javascript:;">{{subItem.name}}</a>
                    </span>
                    <span v-else v-bind:class="item1.status == 'status' ?'font-color-' + item.status:''" v-on:click="goToNextPage(other.goToNextFn,item)">
                        {{item[item1.value]}}
                    </span>
                </div>
            </dd>
        </dl>
        <dl class="content" v-else>
            <dd v-for="(item, index) in listShow" v-bind:class="{activeHand:other.isClick == true}">
                <span style="width: 4%!important; cursor: pointer" v-if="other.isCheck" v-on:click="singleCheckFn(index)">
                    <img v-if="!item.isCheck" src="../assets/search/check.png"/>
                    <img v-if="item.isCheck" src="../assets/search/checked.png"/>
                </span>
                <div v-for="(item1, index1) in label" v-bind:style="{width:item1.width+'%'}">
                    <span v-if="item1.value == 'index'" v-on:click="goToNextPage(other.goToNextFn,item)">
                        {{index+1}}
                    </span>
                    <span v-else-if="item1.btn" class="btn">
                        <a v-for="(subItem,index) in item1.btn" v-on:click="goToNextPage(subItem.fn,item)" href="javascript:;">{{subItem.name}}</a>
                    </span>
                    <span v-else v-bind:class="item.status?'font-color-' + item.status:''" v-on:click="goToNextPage(other.goToNextFn,item)">
                        {{item[item1.value]}}
                        <i class="redDot" v-if="item1.isShowRed && item.type==0"></i>
                    </span>
                </div>
            </dd>
        </dl>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    export default {
        data() {
            return {
                isAllCkeck: false,
                numLength: 0,
                listCheck: [],
                checkedValue: ''
            };
        },
        props: ['list', 'label', 'other'],
        computed: {
            listShow() {
                return this.list;
            }
        },
        created() {
        },
        methods: {
            ...mapMutations(['_itemObj']),
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
                    if(item.isCheck) {
                        this.numLength = this.listShow.length;
                    } else {
                        this.numLength = 0;
                    }
                });
                this.isAllCkeck = !this.isAllCkeck;
                this.checkedValue = '';
                this.listShow.forEach(item => {
                    if(item.isCheck) {
                        this.checkedValue += item.id + ',';
                    }
                });
                this.$emit('ids', this.checkedValue);
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
                this.checkedValue = '';
                this.listShow.forEach(item => {
                    if(item.isCheck) {
                        this.checkedValue += item.id + ',';
                    }
                });
                this.$emit('ids', this.checkedValue);
            },
            // goToNext() {
            //     if(this.other.isSheet) {
            //         this.$emit('isPop', true);
            //     }
            // },
            goToNextPage(fn, item) {
                this._itemObj(item);
                this.$emit('receive', fn);
            }
        }
    };
</script>
<style lang="less" scoped>
    // .font-color-default {
    //     color: #1c1e2a !important;
    // }
    div span {
        display: block;
        width: 100% !important;
    }
    .redDot {
        display: inline-block;
        width: 0.08rem;
        height: 0.08rem;
        background: red;
        border-radius: 100%;
        box-shadow: 0px 0px 8px 2px red;
        margin-left: 0.1rem;
    }
    .btn {
        a {
            color: #fff;
            text-decoration: underline;
            margin-right: 0.2rem;
        }
        a:last-child {
            margin-right: 0;
        }
    }
    .activeHand {
        cursor: pointer;
    }
    .font-color-1 {
        color: #cc0000 !important;
    }
    .font-color-2 {
        color: #f9af00 !important;
    }
    .font-color-3 {
        color: #adadad !important;
    }
    .font-color-4 {
        color: #027b03 !important;
    }
    .font-color-5 {
        color: #6e381f !important;
    }
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
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.075rem;
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
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.16rem;
                }
                span {
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
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
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
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.16rem;
                }
                span {
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
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
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
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
                span {
                    height: 0.52rem;
                    line-height: 0.52rem;
                    font-size: 0.2rem;
                    color: #2f4554;
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
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.08rem;
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
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
                span {
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
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.075rem;
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
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
                span {
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
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
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
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
                span {
                    height: 0.52rem;
                    line-height: 0.52rem;
                    font-size: 0.2rem;
                    color: #2f4554;
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
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
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
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.14rem;
                }
                span {
                    height: 0.52rem;
                    line-height: 0.52rem;
                    font-size: 0.2rem;
                    color: #2f4554;
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
    .g-table-8 {
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #2f4554;
            background: #e4e8f7;
            font-size: 0.18rem;
            height: 0.36rem;
            line-height: 0.36rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.06rem;
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
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.06rem;
                }
                span {
                    font-size: 0.18rem;
                    height: 0.36rem;
                    line-height: 0.36rem;
                    color: #2f4554;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #d7dae9;
            }
            dd:nth-child(2n) {
                background: #e4e8f7;
            }
        }
    }
    .g-table-9 {
        width: 100%;
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            color: #2f4554;
            background: #bcc2da;
            font-size: 0.16rem;
            height: 0.36rem;
            line-height: 0.36rem;
            font-weight: bold;
            li {
                img {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.06rem;
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
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: top;
                    margin-top: 0.06rem;
                }
                span {
                    font-size: 0.16rem;
                    height: 0.36rem;
                    line-height: 0.36rem;
                    color: #2f4554;
                }
                span:first-child {
                    width: 4%;
                }
            }
            dd:nth-child(2n-1) {
                background: #d7dae9;
            }
            dd:nth-child(2n) {
                background: #e4e8f7;
            }
        }
    }
</style>
