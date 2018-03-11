<template>
    <div class="userinfo">
        <div class="user-common flex">
            <el-upload class="user-common-photo avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
                    <input type="email" v-model="userinfo.email" />
                </p>
            </li>
            <li class="flex">
                <p class="label">手机号码：</p>
                <p class="value">
                    <input type="tel" maxlength="11" v-model="userinfo.phone" />
                </p>
            </li>
            <li class="flex">
                <p class="label">输入密码：</p>
                <p class="value">
                    <input type="password" v-model="userinfo.password" />
                </p>
            </li>
            <li class="flex">
                <p class="label">确认密码：</p>
                <p class="value">
                    <input type="password" v-model="userinfo.conPassword" />
                </p>
            </li>
        </ul>
        <div class="btns flex">
            <button>保存</button>
            <button>取消</button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userinfo: {
                    account: 'LINTAO',
                    name: '林涛',
                    company: '机电公司',
                    deptment: '项目二部 设备维修部',
                    role: '维修部主任',
                    email: '',
                    phone: '',
                    password: '',
                    conPassword: ''
                },
                imageUrl: ''
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isPic = (file.type === 'image/jpeg' || file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if(!isPic) {
                    this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
                }
                if(!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isPic && isLt2M;
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
