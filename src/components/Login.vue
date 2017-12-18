<template>
  <div>

    <div class="canvas">
      <canvas id="canvas"></canvas>
    </div>

    <div class="form">
      <div class="username">
        <input type="text" v-model="username">
      </div>
      <div class="password">
        <input type="password" v-model="password">
      </div>
      <div class="submit" @click="status.login && validate()"
           @mouseenter="style.isHover=!style.isHover"
           @mouseleave="style.isHover=!style.isHover"
           :class="{'hover':style.isHover}">
        <a class="point-area">登录</a>
      </div>
      <div class="auth-code">
        <canvas></canvas>
      </div>
      <p class="tip">请点击图片中的""</p>
    </div>

  </div>
</template>

<script>
  import drawCanvas from '../../static/javascripts/drawCanvas';
  import identifyCode from '../../static/javascripts/identifyCode';
  import validate from '../../static/javascripts/validate';

  export default {

    data() {
      return {
        username: '',
        password: '',
        status: {
          identification: false,
          login: true
        },
        style: {
          isHover: false
        }
      }
    },

    methods: {
      /**
       * @validate 用户输入进行验证
       */
      validate() {
        // 未验证
        if (this.status.identification === false) {
          this.$layer.open({
            kind: 'warning',
            content: '未进行验证'
          });
          return;
        }
        // 用户名和密码验证
        let username = validate('username', this.username),
          password = validate('password', this.password);
        this.status.login = false;
        if (!username.status) {
          this.$layer.open({
            kind: 'warning',
            content: username.info
          });
          this.status.login = true;
        } else if (!password.status) {
          this.$layer.open({
            kind: 'warning',
            content: password.info
          });
          this.status.login = true;
        } else {
          this.login();
        }
      },
      /**
       * @login 验证成功发出Ajax请求
       */
      login() {
        this.$axios.post('user/login.ajax', {
          'username': this.username,
          'password': this.password
        }).then((res) => {
          if (res.data.code === 200) {
            // TODO:登录成功路由跳转
          } else {
            this.$layer.open({
              kind: 'error',
              content: res.data.msg
            });
            this.status.identification = false;
            setTimeout(() => {
              this.createAuthCode();
            }, 2000);
          }
          this.status.login = true;
        });
      },
      /**
       * @createAuthCode 初始化验证码模块
       */
      createAuthCode() {
        let parent = document.querySelector('.auth-code'),
          ctx = document.querySelector('.auth-code > canvas').getContext('2d');
        identifyCode(parent, ctx, this);
      }
    },

    mounted() {
      drawCanvas();
      setTimeout(() => {
        this.createAuthCode();
      }, 200)
    }

  }
</script>

<style scoped>
  * {
    background: transparent;
  }

  .canvas {
    position: fixed;
    z-index: -100;
    background: url("../../static/images/background.jpg") 0 0/cover;
  }

  .form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #FFF;
  }

  input {
    width: 280px;
    height: 20px;
    color: #FFF;
    font-weight: 500;
    border: none;
    outline: none;
  }

  .username, .password {
    margin-bottom: 20px;
    padding: 10px;
    border: rgba(0, 0, 0, 0.2) solid 1px;
    border-radius: 22px;
  }

  .submit {
    line-height: 40px;
    font-size: 30px;
    border: rgba(255, 255, 255, 0.2) solid 1px;
    border-radius: 22px;
    cursor: pointer;
  }

  .hover {
    background: rgba(0, 0, 0, 0.2);
  }

  .auth-code {
    position: relative;
    top: 30px;
    font: 18px regular;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .auth-code > canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .tip {
    margin-top: 30px;
  }

</style>
