<template>
    <div class="g-table">
        <ul class="title">
            <li v-on:click="checkAllFn" v-if="other.isCheck">
                <img v-if="!isAllCkeck" src="../assets/search/check.png" />
                <img v-if="isAllCkeck" src="../assets/search/checked.png" />
            </li>
            <li v-for="(item, index) in label" v-bind:style="{width:item.width+'%'}">{{item.label}}</li>
        </ul>
        <dl class="content">
            <dd v-for="(item, index) in listShow">
                <span class="isChecked" v-on:click="singleCheckFn(index)" v-if="other.isCheck">
                    <img v-if="!item.isCheck" src="../assets/search/check.png"/>
                    <img v-if="item.isCheck" src="../assets/search/checked.png"/>
                </span>
                <div v-for="(item1, index1) in label" v-bind:style="{width:item1.width+'%'}">
                    <span v-if="item1.value">{{item[item1.value]}}</span>
                    <span v-if="item1.value == 'index'">{{index+1}}</span>
                    <span v-if="item1.btn">
                        <a v-for="(subItem,index) in item1.btn" class="btn" v-on:click="goToNextPage(subItem.fn,item.id,item)" href="javascript:;">{{subItem.name}}</a>
                    </span>
                </div>
            </dd>
        </dl>
    </div>
</template>
<script>
    // import { mapMutations } from 'vuex';
    export default {
        data() {
            return {
                isAllCkeck: false,
                numLength: 0,
                value: '',
                receiveValue: {}
            };
        },
        props: ['list', 'label', 'other'],
        computed: {
            listShow() {
                return this.list;
            }
        },
        created() { },
        methods: {
            goToNextPage(fn, id, item) {
                this.receiveValue = {
                    'fn': fn,
                    'id': id,
                    'item': item
                };
                this.$emit('receive', this.receiveValue);
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
                    if(item.isCheck && item.deviceId) {
                        this.checkedValue += item.deviceId + ',';
                    } else if(item.isCheck && item.rowid) {
                        this.checkedValue += item.rowid + ',';
                    } else if(item.isCheck) {
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
                    if(item.isCheck && item.deviceId) {
                        this.checkedValue += item.deviceId + ',';
                    } else if(item.isCheck && item.rowid) {
                        debugger;
                        this.checkedValue += item.rowid + ',';
                    } else if(item.isCheck) {
                        this.checkedValue += item.id + ',';
                    }
                });
                this.$emit('ids', this.checkedValue);
            }
        }
    };
</script>
<style lang="less" scoped>
    .g-table {
        width: 100%;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.35);
        ul {
            display: flex;
            -webkit-flex-flow: row wrap;
            justify-content: space-around;
            text-align: center;
            background: #d8dbe9;
            li {
                color: #fff;
                font-size: 0.18rem;
                height: 0.58rem;
                line-height: 0.58rem;
                color: #2f4554;
                border-right: 1px solid #bbbfcc;
                font-weight: bold;
                img {
                    width: 0.29rem;
                    height: 0.29rem;
                    vertical-align: top;
                    margin-top: 0.165rem;
                }
            }
            li:first-child {
                width: 4%;
                cursor: pointer;
            }
            li:last-child {
                border-right: none;
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
                div {
                    height: 0.56rem;
                    line-height: 0.56rem;
                    font-size: 0.18rem;
                    color: #2f4554;
                    border-right: 1px solid #bbbfcc;
                }
                span.isChecked {
                    border-right: 1px solid #bbbfcc;
                    width: 4% !important;
                    cursor: pointer;
                }
                div:last-child {
                    border-right: none;
                    text-align: center;
                    .btn {
                        min-width: 0.28rem;
                        height: 0.28rem;
                        line-height: 0.28rem;
                        display: inline-block;
                        background: #7c8298;
                        color: #fff;
                        font-size: 0.16rem;
                        margin-right: 0.1rem;
                        padding: 0 0.2rem;
                    }
                    .btn:hover {
                        text-decoration: none;
                    }
                    .btn:last-child {
                        margin-right: 0;
                    }
                }
            }
            dd:nth-child(2n-1) {
                background: #e5e8f7;
            }
            dd:nth-child(2n) {
                background: #d8dbea;
            }
        }
    }
</style>
