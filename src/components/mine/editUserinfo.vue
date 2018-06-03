<template>
    <div class="userinfo">
        <div class="user-common flex">
            <el-upload style="height: 100%;" class="user-common-photo avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="userinfo.imageUrl" :src="userinfo.imageUrl" class="avatar">
                <i v-else class="avatar-uploader-icon"></i>
            </el-upload>
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
        </div>
        <ul class="user-detail">
            <li class="flex">
                <p class="label">个人邮箱：</p>
                <p class="value">
                    <input type="email" v-model="repairInfo.email" />
                </p>
            </li>
            <li class="flex">
                <p class="label">手机号码：</p>
                <p class="value">
                    <input type="tel" maxlength="11" v-model="repairInfo.phone" />
                </p>
            </li>
            <li class="flex">
                <p class="label">输入密码：</p>
                <p class="value">
                    <input type="password" v-model="repairInfo.password" />
                </p>
            </li>
            <li class="flex">
                <p class="label">确认密码：</p>
                <p class="value">
                    <input type="password" v-model="repairInfo.conPassword" />
                </p>
            </li>
        </ul>
        <div class="btns flex">
            <button @click="save">保存</button>
            <button @click="cancel">取消</button>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                userinfo: {},
                repairInfo: {
                    email: '',
                    phone: '',
                    password: '',
                    conPassword: '',
                    pic: ''
                },
                uploadUrl: ""
            };
        },
        created() {
            this.uploadUrl = 'http://' + window.location.host + '/bjdt/common/upload';
            // this.uploadUrl =  '/bjdt/common/upload';
            this.getUserInfo();
        },
        methods: {
            ...mapActions(['_getInfo']),
            handleAvatarSuccess(res, file) {
                this.userinfo.imageUrl = URL.createObjectURL(file.raw);
                this.repairInfo.pic = res.url;
            },
            beforeAvatarUpload(file) {
                const isPic = (file.type === 'image/jpeg' || file.type === 'image/png');
                // const isLt2M = file.size / 1024 / 1024 < 2;

                if(!isPic) {
                    this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
                }
                // if(!isLt2M) {
                //     this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                // return isPic && isLt2M;
                return isPic 
            },
            save() {
                if(!this.repairInfo.email) {
                    this.$message.error('请输入个人邮箱！');
                    return false;
                }
                if(!this.repairInfo.phone) {
                    this.$message.error('请输入手机号码！');
                    return false;
                }
                if(!this.repairInfo.password) {
                    this.$message.error('请输入密码！');
                    return false;
                }
                if(!this.repairInfo.conPassword) {
                    this.$message.error('请输入确认密码！');
                    return false;
                }
                if(this.repairInfo.password != this.repairInfo.conPassword) {
                    this.$message.error('两次密码不一致，请确认！');
                    return false;
                }
                this._getInfo({
                    ops: this.repairInfo,
                    api: 'mineUpdateuser',
                    callback: () => {
                        this.$message.success('修改成功！');
                        this.$emit('save');
                    }
                });
            },
            cancel() {
                this.$emit('save');
            },
            getUserInfo() {
                this._getInfo({
                    api: 'mineUserInfo',
                    callback: res => {
                        this.userinfo = res;
                        this.userinfo.imageUrl = 'http://' + window.location.host + res.imageUrl;
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
        padding: 0 0.1rem;
        font-weight: bold;
        font-size: 0.2rem;
        .user-common {
            height: 2rem;
            &-photo {
                width: 1.28rem;
                height: 1.62rem;
                margin-right: 0.2rem;
                overflow: hidden;
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
        .btns {
            height: 0.7rem;
            justify-content: center;
            button {
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
                &:last-child {
                    margin-left: 0.24rem;
                }
            }
        }
    }
</style>