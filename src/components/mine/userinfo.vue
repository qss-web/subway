<template>
    <div class="userinfo">
        <div class="user-common">
            <div class="user-common-photo">
                <img v-bind:src="userinfo.imageUrl" />
            </div>
            <ul class="user-common-info">
                <li class="flex">
                    <p class="label">用户帐号：</p>
                    <p class="value">{{userinfo.account}}</p>
                </li>
                <li class="flex">
                    <p class="label">用户名称：</p>
                    <p class="value">{{userinfo.name}}</p>
                </li>
                <li class="flex">
                    <p class="label">单位名称：</p>
                    <p class="value">{{userinfo.company}}</p>
                </li>
                <li class="flex">
                    <p class="label">所属部门：</p>
                    <p class="value">{{userinfo.deptment}}</p>
                </li>
                <li class="flex">
                    <p class="label">使用角色：</p>
                    <p class="value">{{userinfo.role}}</p>
                </li>
            </ul>
            <button class="btn" @click="edit">修改</button>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                userinfo: {}
            };
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            ...mapActions(['_getInfo']),
            edit() {
                this.$emit('edit');
            },
            getUserInfo() {
                this._getInfo({
                    api: 'mineUserInfo',
                    callback: res => {
                        this.userinfo = res;
                        if(res.imageUrl && res.imageUrl != 'null' && res.imageUrl != null) {
                            this.userinfo.imageUrl = 'http://' + window.location.host + res.imageUrl;
                        }
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .userinfo {
        box-shadow: 0 0.02rem 0.1rem 0.02rem #828282;
        border-top: 1px solid #aaa;
        position: absolute;
        top: 0;
        left: 0.1rem;
        right: 0.1rem;
        bottom: 0.1rem;
        border-radius: 0.05rem;
        padding: 0.1rem;
        font-weight: bold;
        font-size: 0.2rem;
        .user-common {
            height: 2rem;
            &-photo {
                width: 1.48rem;
                height: 1.92rem;
                margin: 0 auto;
                img,
                i {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
                .avatar-uploader-icon {
                    width: 1.28rem;
                    height: 1.62rem;
                    background: url('~assets/mine/bg_photo.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
            &-info {
                padding: 0.2rem 0.3rem;
                li {
                    padding: 0.06rem 0;
                }
            }
        }
        .user-detail {
            height: 1.62rem;
            background-color: #d6d7e0;
            padding: 0.05rem 0.2rem;
            input {
                background-color: #ced0d6;
                height: 0.28rem;
                width: 1.68rem;
            }
            li {
                padding: 0.05rem 0;
            }
        }
        .btn {
            height: 0.7rem;
            width: 1.08rem;
            height: 0.32rem;
            font-size: 0.22rem;
            width: 1.08rem;
            height: 0.32rem;
            font-size: 0.21rem;
            border-radius: 0.1rem;
            color: #2c2c2c;
            box-shadow: 0 0.03rem 0.1rem 0.02rem #868080 inset;
            font-weight: bold;
            right: 0.2rem;
            bottom: 0.2rem;
            position: absolute;
        }
    }
</style>
