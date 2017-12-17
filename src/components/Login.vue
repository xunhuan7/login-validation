<template>
  <div>

    <div class="canvas">
      <canvas id="canvas"></canvas>
    </div>

    <div class="form">
      <form action="">
        <div class="username">
          <input type="text" v-model="username">
        </div>
        <div class="password">
          <input type="password" v-model="password">
        </div>
        <div class="submit" @click="status.login && login()"
             @mouseenter="style.isHover=!style.isHover"
             @mouseleave="style.isHover=!style.isHover"
             :class="{'hover':style.isHover}">
          <a>登录</a>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import drawCanvas from '../../static/javascripts/drawCanvas';

  export default {
    data() {
      return {
        username: '',
        password: '',
        status: {
          login: true
        },
        style: {
          isHover: false
        }
      }
    },
    methods: {
      login() {
        let username = this.$validate('username', this.username),
          password = this.$validate('password', this.password);
        this.status.login = false;
        if (!username.status) {
          this.$layer.open({
            content: username.info,
            kind: 'warning'
          });
          this.status.login = true;
          return;
        } else if (!password.status) {
          this.$layer.open({
            content: password.info,
            kind: 'warning'
          });
          this.status.login = true;
          return;
        } else {
          this.$axios.post('user/login.ajax', {
            'username': this.username,
            'password': this.password
          }).then((res) => {
            if (res.data.code === 200) {
//              TODO:登录成功路由跳转
            } else {
              this.$layer.open({
                kind: 'error',
                content: res.data.msg
              });
            }
            this.status.login = true;
          });
        }
      }
    },
    mounted() {
      drawCanvas();
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
    background: url("../../static/images/background.jpg");
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
    border: none;
    outline: none;
  }

  .username, .password {
    margin-bottom: 20px;
    padding: 10px;
    border: rgba(255, 255, 255, 0.2) solid 1px;
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
</style>
