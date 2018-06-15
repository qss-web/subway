<template>
    <div class="wrap">
        <v-login-header></v-login-header>
        <div class="main">
            <img class="showPic" src="../assets/login/img_bg.png" />
            <div class="login">
                <dl class="loginBox" v-on:keyup.enter="loginFn">
                    <dt>用户登录</dt>
                    <dd class="account"><input type="text" placeholder="Username" autofocus="autofocus" v-model="req.username" /><img src="../assets/login/account_icon.png" /></dd>
                    <dd class="password"><input ref="password" type="password" placeholder="Password" v-model="req.password" /><img src="../assets/login/password_icon.png" /></dd>
                    <dd class="btn">
                        <button type="button" v-on:click="loginFn">登录</button>
                    </dd>
                </dl>
            </div>
        </div>
        <v-login-footer></v-login-footer>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                req: {
                    username: '',
                    password: ''
                }
            };
        },
        methods: {
            ...mapActions(['_login']),
            loginFn() {
                if(!this.req.username) {
                    this.$message.error('请输入用户名！');
                    return false;
                }
                if(!this.req.password) {
                    this.$refs['password'].focus();
                    this.$message.error('请输入密码！');
                    return false;
                }
                this._login({
                    ops: this.req,
                    api: 'login',
                    callback: () => {
                        this.$router.push('/');
                    }
                });
            }
        }
    };
</script>

<style scoped="scoped" lang="less">
    .wrap {
        width: 100%;
        height: 100%;
    }
    .main {
        width: 100%;
        background: linear-gradient(to bottom, #464b5f 0%, #a3a7bb 100%);
        height: 100%;
        position: relative;
        .showPic {
            width: 10.85rem;
            margin-top: 1.56rem;
        }
        .login {
            position: absolute;
            width: 6.66rem;
            background: #9195a5;
            right: 1.06rem;
            top: 2.4rem;
            border-radius: 2px;
            z-index: 3;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
            .loginBox {
                width: 4.74rem;
                margin: 0.3rem auto 0.5rem auto;
                dt {
                    text-align: center;
                    height: 0.74rem;
                    line-height: 0.74rem;
                    font-size: 0.24rem;
                    color: #fff;
                }
                dd.account,
                dd.password {
                    width: 100%;
                    border-radius: 3px;
                    height: 0.5rem;
                    background: #fff;
                    text-align: center;
                    margin-bottom: 0.4rem;
                    input {
                        width: 3.8rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        font-size: 0.16rem;
                        position: relative;
                    }
                }
                dd.account img {
                    width: 0.15rem;
                    height: 0.15rem;
                }
                dd.password img {
                    width: 0.19rem;
                    height: 0.19rem;
                }
                dd.btn {
                    text-align: center;
                    margin-top: 0.14rem;
                    margin-bottom: 0.14rem;
                }
                dd.btn button {
                    width: 1.34rem;
                    height: 0.53rem;
                    line-height: 0.53rem;
                    background: #445370;
                    color: #fff;
                    font-size: 0.2rem;
                    border-radius: 2px;
                    text-shadow: 0.008rem 0.008rem rgba(0, 252, 225, 0.4);
                    cursor: pointer;
                }
            }
        }
    }
</style>


