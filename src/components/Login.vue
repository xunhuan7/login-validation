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
        <div class="submit" @click="login" @mouseenter="isHover=!isHover" @mouseleave="isHover=!isHover"
             :class="{'hover':isHover}">
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
        isHover: false
      }
    },
    methods: {
      login: function () {
//        this.$layer.open({
//          content: '登录'
//        })
//        this.$layer.open({
//          kind: 'success',
//          content: '登录'
//        })
//        this.$layer.open({
//          kind: 'warning',
//          content: '登录'
//        })
        this.$layer.open({
          kind: 'error',
          content: '登录'
        })
      }
    },
    mounted() {
      drawCanvas();
      this.login();
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
